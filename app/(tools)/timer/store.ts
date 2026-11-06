import "server-only";
import type { Transaction } from "@libsql/client";

import {
  readTimerDays,
  readTimerCalendarState,
  readTimerHistoryState,
  writeTimerPreferences,
  readTimerState,
  readTimerSnapshotVersion,
  timerSnapshotVersion,
  updateTimerDays,
  timerDatabaseTransaction,
} from "@/app/(tools)/timer/server/timerDatabase";
import { createDailyTasks } from "@/app/(tools)/timer/utils/dailyTasks";
import {
  createEmptyTimerDay,
  isTimerPlanningAction,
  shiftTimerDate,
  taskKind,
  taskSpent,
  taskTransitionTime,
  timerDate,
  validTimerDate,
} from "@/app/(tools)/timer/utils/timer";
import type {
  TimerAction,
  TimerSnapshot,
} from "@/app/(tools)/timer/utils/timer";
import { createTimerBackup } from "@/app/(tools)/timer/utils/timerBackup";
import {
  applyTimerCommand,
  applyTimerPreferencePatch,
  settleTimerDay,
  timerNotices,
  TimerStoreError,
} from "@/app/(tools)/timer/utils/timerEngine";
import {
  actionSchema,
  preferencesPatchSchema,
} from "@/app/(tools)/timer/utils/timerValidation";

import {
  monthDates,
  resolveCalendarDays,
  validTimerMonth,
} from "./utils/timerCalendar";

export { TimerStoreError } from "@/app/(tools)/timer/utils/timerEngine";

async function state(tx: Transaction) {
  const now = Date.now();
  const today = timerDate(now);
  const { days, preferences } = await readTimerState(tx, today);
  const previous = structuredClone(days);
  for (const day of days) {
    const due = day.tasks.some(
      (task) =>
        task.startedAt !== null &&
        (now >= taskTransitionTime(task, day.date) ||
          taskSpent(task, day.date, now) >= task.duration)
    );
    if (due) {
      settleTimerDay(day, now);
    }
  }
  let day = days.find((entry) => entry.date === today);
  if (!day) {
    day = createEmptyTimerDay(today);
    day.tasks = createDailyTasks(preferences.dailyTasks);
    if (day.tasks.length > 0) {
      day.revision += 1;
    }
    days.push(day);
  }
  return { now, today, days, previous, day, preferences };
}

function snapshot(value: Awaited<ReturnType<typeof state>>): TimerSnapshot {
  return {
    day: value.day,
    today: value.today,
    now: new Date(value.now).toISOString(),
    mode: "turso",
    preferences: value.preferences,
    notifications: value.days.flatMap(timerNotices),
  };
}

function snapshotVersion(value: Awaited<ReturnType<typeof state>>) {
  const activeDays = value.days.filter(
    (day) =>
      day.date === value.today ||
      day.tasks.some(
        (task) =>
          task.startedAt !== null ||
          (task.reachedAt !== null && task.notifiedAt === null)
      )
  );
  return timerSnapshotVersion(
    value.today,
    activeDays,
    value.preferences.revision
  );
}

export async function getTimerSnapshot(ifNoneMatch: string | null = null) {
  const result = await timerDatabaseTransaction(async (tx) => {
    if (ifNoneMatch !== null) {
      const current = await readTimerSnapshotVersion(tx, timerDate());
      const matches =
        ifNoneMatch === "*" ||
        ifNoneMatch.split(",").some((tag) => tag.trim() === current.version);
      if (
        matches &&
        current.hasToday &&
        Date.now() < current.nextTransitionAt
      ) {
        return { snapshot: null, version: current.version };
      }
    }
    const value = await state(tx);
    await updateTimerDays(tx, value.days, value.previous);
    return {
      snapshot: snapshot(value),
      version: snapshotVersion(value),
    };
  });
  const now = new Date().toISOString();
  return {
    version: result.version,
    now,
    snapshot: result.snapshot === null ? null : { ...result.snapshot, now },
  };
}

export async function changeTimer(payload: unknown) {
  const parsed = actionSchema.safeParse(payload);
  if (!parsed.success) {
    throw new TimerStoreError(
      "Use valid activity details and a duration from one second to 24 hours."
    );
  }
  const result = await timerDatabaseTransaction(async (tx) => {
    const value = await state(tx);
    const command: TimerAction = parsed.data;
    if (
      command.date !== value.today &&
      (command.action !== "acknowledge" || command.date > value.today)
    ) {
      throw new TimerStoreError(
        "The day has changed. Refresh to see today's tasks.",
        409
      );
    }
    const day = value.days.find((entry) => entry.date === command.date);
    if (!day) {
      throw new TimerStoreError("Task not found.", 404);
    }
    const notification = applyTimerCommand(
      day,
      command.action === "acknowledge"
        ? { ...command, autoplay: value.preferences.autoplay }
        : command,
      value.preferences,
      value.now
    );
    await updateTimerDays(tx, value.days, value.previous);
    return {
      snapshot: snapshot(value),
      notification:
        command.action === "claim-deadline-reminder" ? null : notification,
      deadlineReminder:
        command.action === "claim-deadline-reminder" ? notification : null,
      version: snapshotVersion(value),
    };
  });
  return {
    ...result,
    snapshot: { ...result.snapshot, now: new Date().toISOString() },
  };
}

export async function changeTimerPlan(payload: unknown) {
  const parsed = actionSchema.safeParse(payload);
  if (!parsed.success || !isTimerPlanningAction(parsed.data)) {
    throw new TimerStoreError(
      "Only task planning changes are allowed for future days."
    );
  }
  const command = parsed.data;
  const result = await timerDatabaseTransaction(async (tx) => {
    const now = Date.now();
    const today = timerDate(now);
    if (command.date <= today) {
      throw new TimerStoreError(
        "This is no longer a future day. Return to Day to edit today's tasks.",
        409
      );
    }
    const { days, preferences } = await readTimerCalendarState(
      tx,
      command.date,
      command.date
    );
    const previous = structuredClone(days);
    const day = days[0] ?? {
      ...createEmptyTimerDay(command.date),
      tasks: createDailyTasks(preferences.dailyTasks),
    };
    applyTimerCommand(day, command, preferences, now);
    await updateTimerDays(tx, [day], previous);
    return {
      day,
      today,
      now: new Date(now).toISOString(),
      mode: "turso" as const,
      preferences,
      notifications: [],
    };
  });
  return { ...result, now: new Date().toISOString() };
}

export async function changeTimerPreferences(payload: unknown) {
  const patch = preferencesPatchSchema.parse(payload);
  const result = await timerDatabaseTransaction(async (tx) => {
    const value = await state(tx);
    value.preferences = applyTimerPreferencePatch(
      value.day,
      value.preferences,
      patch,
      value.now
    );
    value.preferences.revision += 1;
    await updateTimerDays(tx, value.days, value.previous);
    await writeTimerPreferences(tx, value.preferences);
    return { ...snapshot(value), version: snapshotVersion(value) };
  });
  return { ...result, now: new Date().toISOString() };
}

export async function getTimerCalendar(month: string) {
  if (!validTimerMonth(month)) {
    throw new TimerStoreError("Choose a valid month.");
  }
  return await timerDatabaseTransaction(async (tx) => {
    const dates = monthDates(month);
    const { days, preferences } = await readTimerCalendarState(
      tx,
      `${month}-01`,
      dates.at(-1) ?? `${month}-01`
    );
    const now = Date.now();
    const today = timerDate(now);
    for (const day of days) {
      settleTimerDay(day, now);
    }
    return {
      month,
      today,
      mode: "turso" as const,
      days: resolveCalendarDays(month, today, days, preferences.dailyTasks),
    };
  }, "read");
}

export async function getTimerHistory(date: string, days: number) {
  if (!validTimerDate(date) || date > timerDate()) {
    throw new TimerStoreError("Choose today or an earlier valid date.");
  }
  return await timerDatabaseTransaction(async (tx) => {
    const now = Date.now();
    const { day, runningDays, totals } = await readTimerHistoryState(
      tx,
      shiftTimerDate(date, -(days - 1)),
      date
    );
    for (const running of runningDays) {
      const total = totals.get(running.date);
      if (total === undefined) {
        continue;
      }
      for (const task of running.tasks) {
        const elapsed = taskSpent(task, running.date, now) - task.spent;
        total.spent += elapsed;
        total[taskKind(task)] += elapsed;
      }
    }
    settleTimerDay(day, now);
    return {
      day,
      today: timerDate(now),
      mode: "turso" as const,
      totals: Array.from({ length: days }, (_, index) => {
        const key = shiftTimerDate(date, index - (days - 1));
        return {
          date: key,
          ...(totals.get(key) ?? { spent: 0, budget: 0, work: 0, leisure: 0 }),
        };
      }),
    };
  }, "read");
}

export async function exportTimer() {
  return await timerDatabaseTransaction(
    async (tx) => createTimerBackup(await readTimerDays(tx), Date.now()),
    "read"
  );
}
