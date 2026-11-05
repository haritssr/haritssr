import {
  allDayPeriod,
  isAllDay,
  scheduledPeriod,
  taskCompletionTime,
  MAX_TIMER_TASKS,
  taskSpent,
  timerDate,
  taskAvailable,
  taskWindowEnd,
  timerDayBounds,
} from "@/app/(tools)/timer/utils/timer";
import type {
  TimerAction,
  TimerDay,
  TimerNotice,
  TimerPreferences,
  TimerTask,
} from "@/app/(tools)/timer/utils/timer";

import { isDailyTask } from "./dailyTasks";
import { taskDeadline } from "./timerDeadline";
import { formatPeriod } from "./timerTime";

const SCHEDULED_START_GRACE = 60_000;

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
  if (command.kind !== undefined) {
    task.kind = command.kind;
  }
  if (command.period !== undefined) {
    task.period = { ...command.period };
  }
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
      `Available ${formatPeriod(scheduledPeriod(task)) ?? "on its scheduled day"} WIB.`,
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

function resizeScheduledTask(
  day: TimerDay,
  task: TimerTask,
  command: Extract<TimerAction, { action: "resize-scheduled" }>,
  now: number
) {
  const { start } = timerDayBounds(day.date);
  if (
    task.period === null ||
    task.period === undefined ||
    task.startedAt !== null ||
    start + task.period.from * 60_000 <= now ||
    start + command.period.from * 60_000 <= now
  ) {
    throw new TimerStoreError(
      "Only upcoming tasks can be resized into future time.",
      409
    );
  }
  editTaskDetails(task, {
    action: "edit",
    date: command.date,
    taskId: task.id,
    activity: task.activity,
    description: task.description,
    period: command.period,
    duration: (command.period.until - command.period.from) * 60,
  });
}

function changeTask(
  day: TimerDay,
  command: Exclude<
    TimerAction,
    {
      action:
        | "add"
        | "single-task"
        | "claim-deadline-reminder"
        | "start-scheduled";
    }
  >,
  now: number
): TimerNotice | null {
  let notification: TimerNotice | null = null;
  const task = day.tasks.find((entry) => entry.id === command.taskId);
  if (task === undefined) {
    throw new TimerStoreError("Task not found.", 404);
  }
  if (isDailyTask(task) && command.action === "delete") {
    throw new TimerStoreError(
      "Change Daily Tasks in Settings for future days.",
      409
    );
  }
  if (command.action === "delete") {
    day.tasks = day.tasks.filter((entry) => entry.id !== task.id);
  } else if (command.action === "resize-scheduled") {
    resizeScheduledTask(day, task, command, now);
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
  command: Exclude<TimerAction, { action: "start-scheduled" }>,
  now: number
): TimerNotice | null {
  let notification: TimerNotice | null = null;
  if (command.action === "claim-deadline-reminder") {
    const task = day.tasks.find((entry) => entry.id === command.taskId);
    if (
      task === undefined ||
      (task.deadlineReminderAt ?? null) !== null ||
      taskDeadline(task, timerDayBounds(day.date), now).warning === null
    ) {
      return null;
    }
    task.deadlineReminderAt = new Date(now).toISOString();
    day.revision += 1;
    return { date: day.date, taskId: task.id, activity: task.activity };
  }
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
    if (
      !isAllDay(command.period) &&
      timerDayBounds(day.date).start + (command.period?.from ?? 0) * 60_000 <=
        now
    ) {
      throw new TimerStoreError("Choose a future availability window.", 409);
    }
    day.tasks.push({
      id: command.taskId ?? crypto.randomUUID(),
      activity: command.activity,
      description: command.description,
      duration: command.duration,
      ...(command.kind === undefined ? {} : { kind: command.kind }),
      period: { ...(command.period ?? allDayPeriod()) },
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
  if (action.action === "start-scheduled") {
    startScheduledTasks(
      day,
      action.taskIds,
      preferences?.multitask === true,
      now
    );
    return null;
  }
  settleTimerDay(day, now);
  let command = action;
  if (command.action === "start") {
    command = { ...command, multitask: preferences?.multitask };
  } else if (command.action === "done") {
    command = { ...command, autoplay: preferences?.autoplay };
  }
  return applyTimerAction(day, command, now);
}

// Auto-starts that arrive shortly after a window opens count from the opening,
// absorbing timer, throttling, and network delay. Later arrivals use `now`.
function scheduledStartTime(
  day: TimerDay,
  task: TimerTask,
  now: number,
  notBefore: number
) {
  const opensAt = timerDayBounds(day.date).start + task.period.from * 60_000;
  return now - opensAt <= SCHEDULED_START_GRACE
    ? Math.min(now, Math.max(opensAt, notBefore))
    : now;
}

function startScheduledTasks(
  day: TimerDay,
  taskIds: string[],
  multitask: boolean,
  now: number
) {
  const requested = new Set(taskIds);
  // Rank every open scheduled window before checking start history. A
  // duplicate request must not fall through to an older overlap after its
  // winner has already started (or was manually paused in another tab).
  const open = day.tasks
    .filter(
      (task) =>
        scheduledPeriod(task) !== null && taskAvailable(task, day.date, now)
    )
    .toSorted((first, second) => second.period.from - first.period.from);
  const due = open.filter((task) => requested.has(task.id));
  // A single-task handoff settles the paused task at the backdated start, and
  // never before its last settlement, so no time is counted twice.
  const latestRunningStart = Math.max(
    -Infinity,
    ...day.tasks
      .filter((task) => task.startedAt !== null)
      .map((task) => Date.parse(task.startedAt ?? ""))
  );
  const handoffAt =
    multitask || due[0] === undefined
      ? now
      : scheduledStartTime(day, due[0], now, latestRunningStart);
  settleTimerDay(day, handoffAt);
  let started = false;
  for (const task of multitask ? due : due.slice(0, 1)) {
    if (
      task.startedAt !== null ||
      task.lastStartedAt !== undefined ||
      task.spent !== 0 ||
      task.reachedAt !== null
    ) {
      continue;
    }
    if (
      !multitask &&
      open
        .slice(0, open.indexOf(task))
        .some(
          (entry) =>
            entry.lastStartedAt !== undefined || entry.startedAt !== null
        )
    ) {
      continue;
    }
    startTask(
      day,
      task,
      multitask ? scheduledStartTime(day, task, now, -Infinity) : handoffAt,
      multitask
    );
    day.revision += 1;
    started = true;
  }
  if (!started && handoffAt < now) {
    settleTimerDay(day, now);
  }
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
