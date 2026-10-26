import { z } from "zod";

import type { TimerDay } from "@/app/(tools)/timer/utils/timer";
import {
  settleTimerDay,
  TimerStoreError,
} from "@/app/(tools)/timer/utils/timerEngine";
import { daySchema } from "@/app/(tools)/timer/utils/timerValidation";

const backupSchema = z
  .object({
    format: z.literal("haritssr-timer"),
    version: z.literal(1),
    timeZone: z.literal("Asia/Jakarta"),
    exportedAt: z.iso.datetime({ offset: true }),
    days: z.array(daySchema),
  })
  .refine(
    (backup) =>
      new Set(backup.days.map((day) => day.date)).size === backup.days.length
  );

export function createTimerBackup(days: TimerDay[], now: number) {
  return {
    format: "haritssr-timer" as const,
    version: 1 as const,
    timeZone: "Asia/Jakarta" as const,
    exportedAt: new Date(now).toISOString(),
    days: days.map((original) => {
      const day = structuredClone(original);
      settleTimerDay(day, now);
      for (const task of day.tasks) {
        task.startedAt = null;
      }
      return day;
    }),
  };
}

export function parseTimerBackup(text: string) {
  let value: unknown;
  try {
    value = JSON.parse(text) as unknown;
  } catch {
    throw new TimerStoreError("Choose a valid JSON Timer backup.");
  }
  const result = backupSchema.safeParse(value);
  if (!result.success) {
    throw new TimerStoreError(
      "Choose a valid Timer backup with a supported version, Jakarta dates, and valid activities."
    );
  }
  return result.data.days.map((original) => {
    const day = structuredClone(original);
    settleTimerDay(day, Date.parse(result.data.exportedAt));
    for (const task of day.tasks) {
      task.startedAt = null;
      if (task.reachedAt !== null) {
        task.notifiedAt ??= result.data.exportedAt;
      }
    }
    return day;
  });
}

function canonicalDay(day: TimerDay) {
  return daySchema.parse({
    ...day,
    revision: 0,
    tasks: day.tasks.map((task) => ({ ...task, speed: task.speed ?? 1 })),
  });
}
function sameDay(first: TimerDay, second: TimerDay) {
  return (
    JSON.stringify(canonicalDay(first)) === JSON.stringify(canonicalDay(second))
  );
}

export function mergeTimerBackup(existing: TimerDay[], incoming: TimerDay[]) {
  const stored = new Map(existing.map((day) => [day.date, day]));
  const conflicts: string[] = [];
  const additions: TimerDay[] = [];
  let skipped = 0;
  for (const day of incoming) {
    const current = stored.get(day.date);
    if (current !== undefined && sameDay(current, day)) {
      skipped += 1;
    } else if (current === undefined || current.tasks.length === 0) {
      additions.push({
        ...day,
        revision: Math.max(current?.revision ?? 0, day.revision) + 1,
      });
    } else {
      conflicts.push(day.date);
    }
  }
  if (conflicts.length > 0) {
    throw new TimerStoreError(
      `Nothing was imported. These dates contain different activities: ${conflicts.join(", ")}. Your existing data was kept.`
    );
  }
  return { additions, skipped };
}
