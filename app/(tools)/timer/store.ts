import "server-only";
import type { Transaction } from "@libsql/client";

import {
  readTimerDays,
  readTimerHistoryState,
  writeTimerPreferences,
  readTimerState,
  readTimerSnapshotVersion,
  timerSnapshotVersion,
  updateTimerDays,
  timerDatabaseTransaction,
  writeTimerDays,
} from "@/app/(tools)/timer/server/timerDatabase";
import { createDailyTasks } from "@/app/(tools)/timer/utils/dailyTasks";
import {
  createEmptyTimerDay,
  shiftTimerDate,
  taskSpent,
  taskTransitionTime,
  timerDate,
  validTimerDate,
} from "@/app/(tools)/timer/utils/timer";
import type {
  TimerAction,
  TimerSnapshot,
} from "@/app/(tools)/timer/utils/timer";
import {
  createTimerBackup,
  mergeTimerBackup,
  parseTimerBackup,
} from "@/app/(tools)/timer/utils/timerBackup";
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
      notification,
      version: snapshotVersion(value),
    };
  });
  return {
    ...result,
    snapshot: { ...result.snapshot, now: new Date().toISOString() },
  };
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

export async function getTimerHistory(date: string) {
  if (!validTimerDate(date) || date > timerDate()) {
    throw new TimerStoreError("Choose today or an earlier valid date.");
  }
  return await timerDatabaseTransaction(async (tx) => {
    const now = Date.now();
    const { day, runningDays, totals } = await readTimerHistoryState(
      tx,
      shiftTimerDate(date, -29),
      date
    );
    for (const running of runningDays) {
      const elapsed = running.tasks.reduce(
        (sum, task) => sum + taskSpent(task, running.date, now) - task.spent,
        0
      );
      totals.set(running.date, (totals.get(running.date) ?? 0) + elapsed);
    }
    settleTimerDay(day, now);
    return {
      day,
      today: timerDate(now),
      mode: "turso" as const,
      totals: Array.from({ length: 30 }, (_, index) => {
        const key = shiftTimerDate(date, index - 29);
        return {
          date: key,
          spent: totals.get(key) ?? 0,
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

export async function importTimer(text: string) {
  const incoming = parseTimerBackup(text);
  return await timerDatabaseTransaction(async (tx) => {
    const { additions, skipped } = mergeTimerBackup(
      await readTimerDays(tx),
      incoming
    );
    await writeTimerDays(tx, additions);
    return { imported: additions.length, skipped };
  });
}
