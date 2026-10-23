import type {
  TimerAction,
  TimerPreferences,
  TimerSnapshot,
} from "@/app/timer/utils/timer";

export const TIMER_SNAPSHOT_KEY = "/api/timer";
export function timerHistoryKey(date: string) {
  return `/api/timer?date=${date}`;
}

export interface ReceivedTimerSnapshot extends TimerSnapshot {
  clockOffset: number;
}

async function fetchTimer(
  url: string,
  options?: RequestInit
): Promise<unknown> {
  const response = await fetch(url, {
    ...options,
    cache: "no-store",
    signal: options?.signal ?? AbortSignal.timeout(15_000),
  });
  const result: unknown = await response.json();
  if (!response.ok) {
    const message =
      typeof result === "object" &&
      result !== null &&
      "error" in result &&
      typeof result.error === "string"
        ? result.error
        : "Timer data could not be loaded.";
    throw new Error(message);
  }
  return result;
}

async function loadTimer<T>(
  load: (signal: AbortSignal) => Promise<T>
): Promise<T> {
  const controller = new AbortController();
  const deadline = Promise.withResolvers<never>();
  const timeout = setTimeout(() => {
    deadline.reject(new Error("Timer is taking too long to load. Try again."));
    controller.abort();
  }, 10_000);
  try {
    return await Promise.race([load(controller.signal), deadline.promise]);
  } finally {
    clearTimeout(timeout);
  }
}

function received(
  snapshot: TimerSnapshot,
  receivedAt = Date.now()
): ReceivedTimerSnapshot {
  return {
    ...snapshot,
    clockOffset: Date.parse(snapshot.now) - receivedAt,
  };
}

let snapshotRequest: Promise<ReceivedTimerSnapshot> | undefined;

export async function fetchTimerSnapshot() {
  snapshotRequest ??= loadTimer(async (signal) => {
    const [{ snapshotSchema }, result] = await Promise.all([
      import("@/app/timer/utils/timerValidation"),
      fetchTimer("/api/timer", { signal }),
    ]);
    const snapshot = snapshotSchema.parse(result);
    notifyTimerChanges(snapshot);
    return received(snapshot);
  });
  const request = snapshotRequest;
  try {
    return await request;
  } finally {
    if (snapshotRequest === request) {
      snapshotRequest = undefined;
    }
  }
}

export async function fetchTimerHistory(date: string) {
  return await loadTimer(async (signal) => {
    const [{ historySchema }, result] = await Promise.all([
      import("@/app/timer/utils/timerValidation"),
      fetchTimer(`/api/timer?date=${date}`, { signal }),
    ]);
    return historySchema.parse(result);
  });
}

export async function sendTimerAction(action: TimerAction) {
  const { changeSchema } = await import("@/app/timer/utils/timerValidation");
  const result = changeSchema.parse(
    await fetchTimer("/api/timer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(action),
    })
  );
  notifyTimerChanges(result.snapshot);
  return { ...result, snapshot: received(result.snapshot) };
}

export async function saveTimerPreferences(
  patch: Partial<Omit<TimerPreferences, "revision">>
) {
  const { snapshotSchema } = await import("@/app/timer/utils/timerValidation");
  const result = received(
    snapshotSchema.parse(
      await fetchTimer("/api/timer", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      })
    )
  );
  notifyTimerChanges(result);
  return result;
}

let changeSource: string | undefined;
function timerChangeSource() {
  changeSource ??= crypto.randomUUID();
  return changeSource;
}

function notifyTimerChanges(snapshot: TimerSnapshot) {
  try {
    if (!("BroadcastChannel" in window)) {
      return;
    }
    const channel = new BroadcastChannel("haritssr-timer");
    const message = {
      source: timerChangeSource(),
      snapshot,
      sentAt: Date.now(),
    };
    // oxlint-disable-next-line unicorn/require-post-message-target-origin -- BroadcastChannel has no targetOrigin parameter.
    channel.postMessage(message);
    channel.close();
  } catch {
    // A blocked messaging API must not turn a committed save into an error.
  }
}

export function subscribeTimerChanges(
  listener: (snapshot?: ReceivedTimerSnapshot) => void
) {
  if (!("BroadcastChannel" in window)) {
    return () => {
      /* Focus and polling remain available. */
    };
  }
  const channel = new BroadcastChannel("haritssr-timer");
  let disposed = false;
  async function receive(data: unknown) {
    if (
      typeof data !== "object" ||
      data === null ||
      !("source" in data) ||
      data.source === timerChangeSource()
    ) {
      return;
    }
    try {
      const { snapshotSchema } =
        await import("@/app/timer/utils/timerValidation");
      const result = snapshotSchema.safeParse(
        "snapshot" in data ? data.snapshot : undefined
      );
      // Background tabs may receive a message much later. Preserve the sender's
      // clock calibration instead of treating the delayed snapshot as current.
      const receivedAt =
        "sentAt" in data &&
        typeof data.sentAt === "number" &&
        Number.isFinite(data.sentAt)
          ? data.sentAt
          : Date.now();
      if (!disposed) {
        listener(
          result.success ? received(result.data, receivedAt) : undefined
        );
      }
    } catch {
      if (!disposed) {
        listener();
      }
    }
  }
  channel.addEventListener("message", (event: MessageEvent<unknown>) => {
    void receive(event.data);
  });
  return () => {
    disposed = true;
    channel.close();
  };
}
