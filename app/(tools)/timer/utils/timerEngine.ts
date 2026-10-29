import {
  taskCompletionTime,
  MAX_TIMER_TASKS,
  taskSpent,
  timerDate,
  taskAvailable,
  taskWindowEnd,
} from "@/app/(tools)/timer/utils/timer";
import type {
  TimerAction,
  TimerDay,
  TimerNotice,
  TimerPreferences,
  TimerTask,
} from "@/app/(tools)/timer/utils/timer";

import { isDailyTask, formatAvailabilityWindow } from "./dailyTasks";

export class TimerStoreError extends Error {
  readonly status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.name = "TimerStoreError";
    this.status = status;
  }
}

export function settleTimerDay(day: TimerDay, now: number) {
  let changed = false;
  for (const task of day.tasks) {
    if (task.startedAt === null) {
      continue;
    }
    const startedAt = Date.parse(task.startedAt);
    // Preserve the original start before settlement advances the elapsed-time baseline.
    task.lastStartedAt ??= task.startedAt;
    const cutoff = taskWindowEnd(task, day.date);
    const end = Math.min(now, cutoff);
    const completionTime = taskCompletionTime(task);
    task.spent = taskSpent(task, day.date, now);
    if (task.spent >= task.duration) {
      task.reachedAt ??= new Date(completionTime).toISOString();
      task.startedAt = null;
    } else {
      task.startedAt =
        end >= cutoff ? null : new Date(Math.max(startedAt, end)).toISOString();
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

export function timerNotices(day: TimerDay): TimerNotice[] {
  return day.tasks
    .filter((task) => task.reachedAt !== null && task.notifiedAt === null)
    .map((task) => ({
      date: day.date,
      taskId: task.id,
      activity: task.activity,
    }));
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
    (task) =>
      !isDailyTask(task) &&
      taskAvailable(task, day.date, now) &&
      task.reachedAt === null &&
      task.spent < task.duration
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

function startTask(
  day: TimerDay,
  task: TimerTask,
  now: number,
  multitask: boolean
) {
  if (task.reachedAt !== null || task.spent >= task.duration) {
    throw new TimerStoreError("This activity has reached its duration.", 409);
  }
  if (!taskAvailable(task, day.date, now)) {
    throw new TimerStoreError(
      `Available ${formatAvailabilityWindow(task.availabilityWindow) ?? "on its scheduled day"} WIB.`,
      409
    );
  }
  if (!multitask) {
    for (const entry of day.tasks) {
      entry.startedAt = null;
    }
  }
  task.startedAt = new Date(now).toISOString();
  task.lastStartedAt = task.startedAt;
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
  if (isDailyTask(task) && ["edit", "delete"].includes(command.action)) {
    throw new TimerStoreError(
      "Change Daily Tasks in Settings for future days.",
      409
    );
  }
  if (command.action === "delete") {
    day.tasks = day.tasks.filter((entry) => entry.id !== task.id);
  } else if (command.action === "edit") {
    editTaskDetails(task, command);
  } else if (command.action === "start") {
    startTask(day, task, now, command.multitask === true);
  } else if (command.action === "done") {
    if (task.reachedAt === null) {
      finishTask(task, now);
      autoplayNextTask(day, command.autoplay, now);
    }
  } else if (command.action === "restore") {
    if (task.reachedAt === null || task.spent >= task.duration) {
      throw new TimerStoreError(
        "Only early finished activities can be restored.",
        409
      );
    }
    task.startedAt = null;
    task.reachedAt = null;
    task.notifiedAt = null;
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

function applyTimerAction(
  day: TimerDay,
  command: TimerAction,
  now: number
): TimerNotice | null {
  let notification: TimerNotice | null = null;
  if (command.action === "add") {
    if (
      command.taskId !== undefined &&
      day.tasks.some((task) => task.id === command.taskId)
    ) {
      return null;
    }
    if (day.tasks.length >= MAX_TIMER_TASKS) {
      throw new TimerStoreError(
        `Today already has ${MAX_TIMER_TASKS} activities.`
      );
    }
    day.tasks.push({
      id: command.taskId ?? crypto.randomUUID(),
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
  return notification;
}

// Callers own date eligibility, authorization, transactions, and snapshot revisions.
export function applyTimerCommand(
  day: TimerDay,
  action: TimerAction,
  preferences: TimerPreferences | undefined,
  now: number
) {
  settleTimerDay(day, now);
  let command = action;
  if (command.action === "start") {
    command = { ...command, multitask: preferences?.multitask };
  } else if (command.action === "done") {
    command = { ...command, autoplay: preferences?.autoplay };
  }
  return applyTimerAction(day, command, now);
}

export function applyTimerPreferencePatch(
  day: TimerDay,
  preferences: TimerPreferences,
  patch: Partial<Omit<TimerPreferences, "revision">>,
  now: number
): TimerPreferences {
  if (patch.multitask === false) {
    settleTimerDay(day, now);
    applyTimerAction(day, { action: "single-task", date: day.date }, now);
  }
  return { ...preferences, ...patch };
}
