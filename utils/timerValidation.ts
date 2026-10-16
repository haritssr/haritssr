import { z } from "zod";

import { validTimerDate } from "@/utils/timer";

const dateSchema = z.string().refine(validTimerDate);
const instant = z.iso.datetime({ offset: true });
const taskSchema = z
  .object({
    id: z.string().min(1).max(100),
    activity: z.string().trim().min(1).max(120),
    description: z.string().max(2000),
    duration: z.number().int().min(1).max(86_400),
    spent: z.number().min(0),
    startedAt: instant.nullable(),
    reachedAt: instant.nullable(),
    notifiedAt: instant.nullable(),
  })
  .refine((task) => task.spent <= task.duration);
export const daySchema = z
  .object({
    schemaVersion: z.literal(1),
    date: dateSchema,
    revision: z.number().int().nonnegative(),
    tasks: z.array(taskSchema).max(100),
  })
  .refine(
    (day) => new Set(day.tasks.map((task) => task.id)).size === day.tasks.length
  );

export const actionSchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("add"),
    date: dateSchema,
    activity: z.string().trim().min(1).max(120),
    description: z.string().trim().max(2000),
    duration: z.number().int().min(1).max(86_400),
  }),
  ...(["start", "pause", "acknowledge"] as const).map((action) =>
    z.object({
      action: z.literal(action),
      date: dateSchema,
      taskId: z.string().min(1).max(100),
    })
  ),
]);

const noticeSchema = z.object({
  date: dateSchema,
  taskId: z.string(),
  activity: z.string(),
});
export const snapshotSchema = z.object({
  day: daySchema,
  today: dateSchema,
  now: instant,
  mode: z.enum(["local", "demo"]),
  notifications: z.array(noticeSchema),
});
export const changeSchema = z.object({
  snapshot: snapshotSchema,
  notification: noticeSchema.nullable(),
});
export const historySchema = z.object({
  day: daySchema,
  today: dateSchema,
  mode: z.enum(["local", "demo"]),
  totals: z
    .array(z.object({ date: dateSchema, spent: z.number().nonnegative() }))
    .length(30),
});
