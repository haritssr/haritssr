/* oxlint-disable no-await-in-loop -- Commands must save in order; recovery must finish before the next write. */
import { canUseTimer } from "@/app/(tools)/timer/utils/timer";
import type {
  TimerAction,
  TimerPreferences,
} from "@/app/(tools)/timer/utils/timer";
import type { ReceivedTimerSnapshot } from "@/app/(tools)/timer/utils/timerClient";
import {
  applyTimerCommand,
  applyTimerPreferencePatch,
} from "@/app/(tools)/timer/utils/timerEngine";

type PreferencePatch = Partial<Omit<TimerPreferences, "revision">>;
type Mutation = { action: TimerAction } | { preferences: PreferencePatch };
interface TaskDraft {
  activity: string;
  description: string;
  duration: number;
}
interface PendingChange {
  id: number;
  mutation: Mutation;
  now: number;
  resolve: (saved: boolean) => void;
}
interface MutationState {
  confirmed: ReceivedTimerSnapshot | undefined;
  snapshot: ReceivedTimerSnapshot | undefined;
  pendingCount: number;
  error: string | null;
  loadError: string | null;
  drafts: Record<string, TaskDraft>;
}
interface Transport {
  action: (action: TimerAction) => Promise<ReceivedTimerSnapshot>;
  preferences: (patch: PreferencePatch) => Promise<ReceivedTimerSnapshot>;
  refresh: () => Promise<ReceivedTimerSnapshot>;
}

function draftKey(mutation: Mutation) {
  if (!("action" in mutation)) {
    return null;
  }
  const { action } = mutation;
  if (action.action === "add") {
    return "add";
  }
  if (action.action === "edit") {
    return action.taskId;
  }
  return null;
}

function project(snapshot: ReceivedTimerSnapshot, change: PendingChange) {
  if (!canUseTimer(snapshot)) {
    throw new Error("Sign in to change personal Timer data.");
  }
  const next = structuredClone(snapshot);
  const now = Math.max(change.now, Date.parse(snapshot.now));
  if ("action" in change.mutation) {
    const command = change.mutation.action;
    if (command.date !== next.today) {
      throw new Error("The day has changed. Refresh to see today's tasks.");
    }
    applyTimerCommand(next.day, command, next.preferences, now);
  } else if (next.preferences !== undefined) {
    next.preferences = applyTimerPreferencePatch(
      next.day,
      next.preferences,
      change.mutation.preferences,
      now
    );
  }
  return next;
}

function reconcile(
  current: ReceivedTimerSnapshot | undefined,
  next: ReceivedTimerSnapshot
) {
  // A public preview after logout must also discard the private snapshot.
  if (
    current === undefined ||
    current.mode !== next.mode ||
    next.mode === "demo"
  ) {
    return next;
  }
  const newerDay =
    current.today > next.today ||
    (current.today === next.today &&
      (current.day.revision > next.day.revision ||
        (current.day.revision === next.day.revision &&
          Date.parse(current.now) > Date.parse(next.now))));
  const base = newerDay ? current : next;
  const preferences =
    (current.preferences?.revision ?? -1) > (next.preferences?.revision ?? -1)
      ? current.preferences
      : next.preferences;
  return { ...base, preferences };
}

// Transient optimistic state only. Turso remains the sole persistent store.
export class TimerMutations {
  private readonly listeners = new Set<() => void>();
  private readonly latestDraft = new Map<string, number>();
  private readonly queue: PendingChange[] = [];
  private processing = false;
  private sequence = 0;
  private state: MutationState = {
    confirmed: undefined,
    snapshot: undefined,
    pendingCount: 0,
    error: null,
    loadError: null,
    drafts: {},
  };
  private readonly transport: Transport;
  constructor(transport: Transport) {
    this.transport = transport;
  }

  getSnapshot = () => this.state;
  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  receive = (next: ReceivedTimerSnapshot) => {
    this.state = {
      ...this.state,
      confirmed: reconcile(this.state.confirmed, next),
      loadError: null,
    };
    this.publish();
  };

  loadFailed = (error: Error) => {
    this.state = { ...this.state, loadError: error.message };
    this.publish();
  };

  refresh = async () => {
    try {
      const next = await this.transport.refresh();
      this.state = { ...this.state, error: null };
      this.receive(next);
      return next;
    } catch (error) {
      this.state = {
        ...this.state,
        error:
          error instanceof Error
            ? error.message
            : "Timer could not be refreshed.",
      };
      this.publish();
      return null;
    }
  };

  act = async (action: TimerAction) =>
    await this.enqueue({
      action:
        action.action === "add"
          ? { ...action, taskId: action.taskId ?? crypto.randomUUID() }
          : action,
    });
  preferences = async (preferences: PreferencePatch) =>
    await this.enqueue({ preferences });

  private publish() {
    let snapshot = this.state.confirmed;
    for (const change of this.queue) {
      if (snapshot === undefined) {
        break;
      }
      try {
        snapshot = project(snapshot, change);
      } catch {
        // Failed dependencies are rejected by the writer, not sent to the API.
      }
    }
    this.state = { ...this.state, snapshot, pendingCount: this.queue.length };
    for (const listener of this.listeners) {
      listener();
    }
  }

  private async enqueue(mutation: Mutation): Promise<boolean> {
    const { snapshot } = this.state;
    this.sequence += 1;
    const completion = Promise.withResolvers<boolean>();
    const change: PendingChange = {
      id: this.sequence,
      mutation,
      now: Date.now() + (snapshot?.clockOffset ?? 0),
      resolve: completion.resolve,
    };
    try {
      if (snapshot === undefined) {
        throw new Error("Timer is still loading.");
      }
      project(snapshot, change);
    } catch (error) {
      this.reject(change, error);
      this.publish();
      return false;
    }
    const key = draftKey(mutation);
    if (key !== null) {
      this.latestDraft.set(key, change.id);
      const drafts = Object.fromEntries(
        Object.entries(this.state.drafts).filter(([entry]) => entry !== key)
      );
      this.state = { ...this.state, drafts };
    }
    this.queue.push(change);
    this.state = { ...this.state, error: null };
    this.publish();
    void this.drain();
    return await completion.promise;
  }

  private reject(change: PendingChange, error: unknown) {
    const key = draftKey(change.mutation);
    const action =
      "action" in change.mutation ? change.mutation.action : undefined;
    const drafts = { ...this.state.drafts };
    if (
      key !== null &&
      (this.latestDraft.get(key) ?? 0) <= change.id &&
      action !== undefined &&
      (action.action === "add" || action.action === "edit")
    ) {
      this.latestDraft.set(key, change.id);
      drafts[key] = {
        activity: action.activity,
        description: action.description,
        duration: action.duration,
      };
    }
    this.state = {
      ...this.state,
      drafts,
      error:
        error instanceof Error
          ? error.message
          : "The change could not be saved.",
    };
    change.resolve(false);
  }

  private async drain() {
    if (this.processing) {
      return;
    }
    this.processing = true;
    while (this.queue.length > 0) {
      const [change] = this.queue;
      if (change === undefined) {
        break;
      }
      try {
        if (this.state.confirmed === undefined) {
          throw new Error("Timer is unavailable.");
        }
        project(this.state.confirmed, change);
        const next =
          "action" in change.mutation
            ? await this.transport.action(change.mutation.action)
            : await this.transport.preferences(change.mutation.preferences);
        this.queue.shift();
        this.receive(next);
        change.resolve(true);
      } catch (error) {
        this.queue.shift();
        this.reject(change, error);
        this.publish();
        // A lost response may still have committed. Refresh before any later write.
        try {
          const next = await this.transport.refresh();
          const { mutation } = change;
          const action = "action" in mutation ? mutation.action : undefined;
          if (
            action?.action === "add" &&
            next.day.tasks.some((task) => task.id === action.taskId) &&
            this.latestDraft.get("add") === change.id
          ) {
            const drafts = { ...this.state.drafts };
            delete drafts.add;
            this.state = { ...this.state, drafts };
          }
          this.receive(next);
        } catch {
          for (const pending of this.queue.splice(0)) {
            this.reject(
              pending,
              new Error(
                "Saving is unavailable. Reconnect and try again. Your form entries were kept."
              )
            );
          }
        }
        this.publish();
      }
    }
    this.processing = false;
  }
}
