import "server-only";
import {
  mkdir,
  readFile,
  readdir,
  rename,
  unlink,
  writeFile,
} from "node:fs/promises";
import path from "node:path";

import {
  createSampleTimerDay,
  createTimerDay,
  shiftTimerDate,
  taskSpent,
  timerDate,
  timerMidnight,
  validTimerDate,
} from "@/utils/timer";
import type {
  TimerAction,
  TimerDay,
  TimerHistory,
  TimerNotice,
  TimerTask,
  TimerSnapshot,
} from "@/utils/timer";
import { actionSchema, daySchema } from "@/utils/timerValidation";

const DIRECTORY = path.join(process.cwd(), "data", "timer");
export class TimerStoreError extends Error {
  readonly status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.name = "TimerStoreError";
    this.status = status;
  }
}

// One local Node process owns the store. All reads and read-modify-writes share this queue.
let queue: Promise<unknown> = Promise.resolve();
async function serialized<T>(operation: () => Promise<T>): Promise<T> {
  const next = queue.then(operation);
  queue = next.catch(() => {
    /* A failed request must not block subsequent writes. */
  });
  return await next;
}

function filename(date: string) {
  if (!validTimerDate(date)) {
    throw new TimerStoreError("Choose a valid date.");
  }
  return path.join(DIRECTORY, `${date}.json`);
}

async function loadDay(date: string): Promise<TimerDay | null> {
  try {
    const day = daySchema.parse(
      JSON.parse(await readFile(filename(date), "utf-8"))
    );
    if (day.date !== date) {
      throw new Error("Timer file date does not match its filename.");
    }
    return day;
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

async function saveDay(day: TimerDay) {
  await mkdir(DIRECTORY, { recursive: true });
  const target = filename(day.date);
  const temporary = `${target}.${crypto.randomUUID()}.tmp`;
  try {
    await writeFile(temporary, `${JSON.stringify(day, null, 2)}\n`, {
      mode: 0o600,
    });
    await rename(temporary, target);
  } finally {
    await unlink(temporary).catch(() => {
      /* A successful rename already removed the temporary path. */
    });
  }
}

function settle(day: TimerDay, now: number) {
  let changed = false;
  for (const task of day.tasks) {
    if (task.startedAt === null) {
      continue;
    }
    const startedAt = Date.parse(task.startedAt);
    // Preserve the original start before settlement advances the elapsed-time baseline.
    task.lastStartedAt ??= task.startedAt;
    const end = Math.min(now, timerMidnight(day.date));
    const previous = task.spent;
    task.spent = taskSpent(task, day.date, now);
    if (task.spent >= task.duration) {
      task.reachedAt ??= new Date(
        startedAt + ((task.duration - previous) / (task.speed ?? 1)) * 1000
      ).toISOString();
      task.startedAt = null;
    } else {
      task.startedAt =
        end >= timerMidnight(day.date)
          ? null
          : new Date(Math.max(startedAt, end)).toISOString();
    }
    changed = true;
  }
  if (changed) {
    day.revision += 1;
  }
  return changed;
}

function finishTask(task: TimerTask, now: number) {
  task.startedAt = null;
  task.reachedAt ??= new Date(now).toISOString();
  task.notifiedAt ??= new Date(now).toISOString();
}

function notices(day: TimerDay): TimerNotice[] {
  return day.tasks
    .filter((task) => task.reachedAt !== null && task.notifiedAt === null)
    .map((task) => ({
      date: day.date,
      taskId: task.id,
      activity: task.activity,
    }));
}

async function previousDay(today: string) {
  let names: string[];
  try {
    names = await readdir(DIRECTORY);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
  const date = names
    .filter((name) => /^\d{4}-\d{2}-\d{2}\.json$/u.test(name))
    .map((name) => name.slice(0, 10))
    .filter((value) => value < today)
    .toSorted()
    .at(-1);
  return date === undefined ? null : await loadDay(date);
}

async function localSnapshot(now: number): Promise<TimerSnapshot> {
  const today = timerDate(now);
  const old = await previousDay(today);
  if (old !== null && settle(old, now)) {
    await saveDay(old);
  }
  const existing = await loadDay(today);
  const day = existing ?? createTimerDay(today);
  const changed = settle(day, now) || existing === null;
  if (changed) {
    await saveDay(day);
  }
  return {
    day,
    today,
    now: new Date(now).toISOString(),
    mode: "local",
    notifications: [...(old === null ? [] : notices(old)), ...notices(day)],
  };
}

export async function getTimerSnapshot(): Promise<TimerSnapshot> {
  if (process.env.NODE_ENV === "production") {
    const now = Date.now();
    const today = timerDate(now);
    return {
      day: createSampleTimerDay(today),
      today,
      now: new Date(now).toISOString(),
      mode: "demo",
      notifications: [],
    };
  }
  return await serialized(async () => await localSnapshot(Date.now()));
}

function autoplayNextTask(
  day: TimerDay,
  enabled: boolean | undefined,
  now: number
) {
  if (
    enabled !== true ||
    day.date !== timerDate(now) ||
    day.tasks.some((task) => task.startedAt !== null)
  ) {
    return;
  }
  const unfinished = day.tasks.filter(
    (task) => task.reachedAt === null && task.spent < task.duration
  );
  const next = unfinished.find((task) => task.spent > 0) ?? unfinished[0];
  if (next !== undefined) {
    next.startedAt = new Date(now).toISOString();
    next.lastStartedAt = next.startedAt;
  }
}

function keepLatestRunning(day: TimerDay) {
  let latest: TimerTask | undefined;
  let latestStart = -Infinity;
  for (const task of day.tasks) {
    if (task.startedAt === null) {
      continue;
    }
    const started = Date.parse(task.lastStartedAt ?? task.startedAt);
    if (started > latestStart) {
      latest = task;
      latestStart = started;
    }
  }
  for (const task of day.tasks) {
    if (task !== latest) {
      task.startedAt = null;
    }
  }
}

function editTaskDetails(
  task: TimerTask,
  command: Extract<TimerAction, { action: "edit" }>
) {
  if (task.reachedAt !== null || task.spent >= task.duration) {
    throw new TimerStoreError("Finished activities cannot be edited.", 409);
  }
  if (command.duration <= task.spent) {
    throw new TimerStoreError(
      "Choose a duration longer than the time already spent.",
      409
    );
  }
  task.activity = command.activity;
  task.description = command.description;
  task.duration = command.duration;
}

function changeTask(
  day: TimerDay,
  command: Exclude<TimerAction, { action: "add" | "single-task" }>,
  now: number
): TimerNotice | null {
  let notification: TimerNotice | null = null;
  const task = day.tasks.find((entry) => entry.id === command.taskId);
  if (task === undefined) {
    throw new TimerStoreError("Task not found.", 404);
  }
  if (command.action === "delete") {
    day.tasks = day.tasks.filter((entry) => entry.id !== task.id);
  } else if (command.action === "edit") {
    editTaskDetails(task, command);
  } else if (command.action === "speed") {
    if (task.reachedAt !== null || task.spent >= task.duration) {
      throw new TimerStoreError(
        "Finished activities cannot change speed.",
        409
      );
    }
    // localSnapshot settled elapsed time at the previous speed before this change.
    task.speed = command.speed;
  } else if (command.action === "start") {
    if (task.reachedAt !== null || task.spent >= task.duration) {
      throw new TimerStoreError("This activity has reached its duration.", 409);
    }
    if (command.multitask !== true) {
      for (const entry of day.tasks) {
        entry.startedAt = null;
      }
    }
    task.startedAt = new Date(now).toISOString();
    task.lastStartedAt = task.startedAt;
  } else if (command.action === "done") {
    if (task.reachedAt === null) {
      finishTask(task, now);
      autoplayNextTask(day, command.autoplay, now);
    }
  } else if (command.action === "pause") {
    task.startedAt = null;
  } else if (task.reachedAt !== null && task.notifiedAt === null) {
    task.notifiedAt = new Date(now).toISOString();
    autoplayNextTask(day, command.autoplay, now);
    notification = {
      date: day.date,
      taskId: task.id,
      activity: task.activity,
    };
  }
  return notification;
}

export async function changeTimer(payload: unknown) {
  if (process.env.NODE_ENV === "production") {
    throw new TimerStoreError("Not found", 404);
  }
  const parsed = actionSchema.safeParse(payload);
  if (!parsed.success) {
    throw new TimerStoreError(
      "Use an activity name, description, and a duration from one second to 24 hours."
    );
  }
  const command: TimerAction = parsed.data;
  return await serialized(async () => {
    const now = Date.now();
    const snapshot = await localSnapshot(now);
    let { day } = snapshot;
    if (command.date !== snapshot.today) {
      if (command.action !== "acknowledge" || command.date > snapshot.today) {
        throw new TimerStoreError(
          "The day has changed. Refresh to see today's tasks.",
          409
        );
      }
      const old = await loadDay(command.date);
      if (old === null) {
        throw new TimerStoreError("Task not found.", 404);
      }
      day = old;
    }
    let notification: TimerNotice | null = null;
    if (command.action === "add") {
      if (day.tasks.length >= 100) {
        throw new TimerStoreError("Today already has 100 activities.");
      }
      day.tasks.push({
        id: crypto.randomUUID(),
        activity: command.activity,
        description: command.description,
        duration: command.duration,
        spent: 0,
        startedAt: null,
        reachedAt: null,
        notifiedAt: null,
      });
    } else if (command.action === "single-task") {
      keepLatestRunning(day);
    } else {
      notification = changeTask(day, command, now);
    }
    day.revision += 1;
    await saveDay(day);
    return { snapshot: await localSnapshot(now), notification };
  });
}

export async function getTimerHistory(date: string): Promise<TimerHistory> {
  if (!validTimerDate(date) || date > timerDate()) {
    throw new TimerStoreError("Choose today or an earlier valid date.");
  }
  const demo = process.env.NODE_ENV === "production";
  return await serialized(async () => {
    const now = Date.now();
    if (!demo) {
      await localSnapshot(now);
    }
    const days = await Promise.all(
      Array.from({ length: 30 }, async (_, index) => {
        const value = shiftTimerDate(date, index - 29);
        const day = demo ? createSampleTimerDay(value) : await loadDay(value);
        return (
          day ?? {
            schemaVersion: 1 as const,
            date: value,
            revision: 0,
            tasks: [],
          }
        );
      })
    );
    const [day] = days.slice(29);
    return {
      day,
      today: timerDate(now),
      mode: demo ? "demo" : "local",
      totals: days.map((entry) => ({
        date: entry.date,
        spent: entry.tasks.reduce(
          (total, task) => total + taskSpent(task, entry.date, now),
          0
        ),
      })),
    };
  });
}
