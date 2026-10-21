import "server-only";
import type { Transaction } from "@libsql/client";

import {
  createEmptyTimerDay,
  shiftTimerDate,
  taskSpent,
  timerDate,
  timerMidnight,
  validTimerDate,
} from "@/utils/timer";
import type { TimerAction, TimerSnapshot } from "@/utils/timer";
import {
  createTimerBackup,
  mergeTimerBackup,
  parseTimerBackup,
} from "@/utils/timerBackup";
import {
  readTimerDays,
  readTimerState,
  updateTimerDays,
  timerDatabaseTransaction,
  writeTimerDays,
} from "@/utils/timerDatabase";
import {
  applyTimerAction,
  settleTimerDay,
  timerNotices,
  TimerStoreError,
} from "@/utils/timerEngine";
import { actionSchema, preferencesSchema } from "@/utils/timerValidation";

export { TimerStoreError } from "@/utils/timerEngine";

async function state(tx: Transaction, all = false) {
  const now = Date.now();
  const today = timerDate(now);
  const { days, preferences } = await readTimerState(
    tx,
    all ? undefined : today
  );
  const previous = structuredClone(days);
  for (const day of days) {
    const due = day.tasks.some(
      (task) =>
        task.startedAt !== null &&
        (now >= timerMidnight(day.date) ||
          taskSpent(task, day.date, now) >= task.duration)
    );
    if (due) {
      settleTimerDay(day, now);
    }
  }
  let day = days.find((entry) => entry.date === today);
  if (!day) {
    day = createEmptyTimerDay(today);
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

export async function getTimerSnapshot() {
  const result = await timerDatabaseTransaction(async (tx) => {
    const value = await state(tx);
    await updateTimerDays(tx, value.days, value.previous);
    return snapshot(value);
  });
  return { ...result, now: new Date().toISOString() };
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
    let command: TimerAction = parsed.data;
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
    settleTimerDay(day, value.now);
    if (command.action === "start") {
      command = { ...command, multitask: value.preferences.multitask };
    } else if (command.action === "done" || command.action === "acknowledge") {
      command = { ...command, autoplay: value.preferences.autoplay };
    }
    const notification = applyTimerAction(day, command, value.now);
    await updateTimerDays(tx, value.days, value.previous);
    return { snapshot: snapshot(value), notification };
  });
  return {
    ...result,
    snapshot: { ...result.snapshot, now: new Date().toISOString() },
  };
}

export async function changeTimerPreferences(payload: unknown) {
  const patch = preferencesSchema
    .omit({ revision: true })
    .partial()
    .strict()
    .parse(payload);
  const result = await timerDatabaseTransaction(async (tx) => {
    const value = await state(tx);
    if (patch.multitask === false) {
      settleTimerDay(value.day, value.now);
      applyTimerAction(
        value.day,
        { action: "single-task", date: value.today },
        value.now
      );
    }
    value.preferences = {
      ...value.preferences,
      ...patch,
      revision: value.preferences.revision + 1,
    };
    await updateTimerDays(tx, value.days, value.previous);
    const prefs = value.preferences;
    await tx.execute({
      sql: "UPDATE timer_preferences SET revision = ?, autoplay = ?, multitask = ?, notifications_enabled = ? WHERE id = 1",
      args: [
        prefs.revision,
        Number(prefs.autoplay),
        Number(prefs.multitask),
        Number(prefs.notificationsEnabled),
      ],
    });
    return snapshot(value);
  });
  return { ...result, now: new Date().toISOString() };
}

export async function getTimerHistory(date: string) {
  if (!validTimerDate(date) || date > timerDate()) {
    throw new TimerStoreError("Choose today or an earlier valid date.");
  }
  return await timerDatabaseTransaction(async (tx) => {
    const value = await state(tx, true);
    await updateTimerDays(tx, value.days, value.previous);
    const day = structuredClone(
      value.days.find((entry) => entry.date === date) ??
        createEmptyTimerDay(date)
    );
    settleTimerDay(day, value.now);
    return {
      day,
      today: value.today,
      mode: "turso" as const,
      totals: Array.from({ length: 30 }, (_, index) => {
        const key = shiftTimerDate(date, index - 29);
        return {
          date: key,
          spent: (
            value.days.find((entry) => entry.date === key)?.tasks ?? []
          ).reduce((total, task) => total + taskSpent(task, key, value.now), 0),
        };
      }),
    };
  });
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
