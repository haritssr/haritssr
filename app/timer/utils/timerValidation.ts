import { z } from "zod";

import {
  DEFAULT_DURATION_PRESETS,
  DEFAULT_TASK_PRESETS,
  TIMER_SPEEDS,
  validTimerDate,
} from "@/app/timer/utils/timer";
import { TASK_INPUT_LIMITS } from "@/app/timer/utils/timerInput";

const dateSchema = z.string().refine(validTimerDate);
const instant = z.iso.datetime({ offset: true });
const taskDetails = {
  activity: z.string().trim().min(1).max(TASK_INPUT_LIMITS.activity),
  description: z.string().trim().max(TASK_INPUT_LIMITS.description),
  duration: z
    .number()
    .int()
    .min(TASK_INPUT_LIMITS.minimumDuration)
    .max(TASK_INPUT_LIMITS.maximumDuration),
};
const taskSchema = z
  .object({
    id: z.string().min(1).max(100),
    activity: z.string().trim().min(1).max(120),
    description: z.string().max(2000),
    duration: z
      .number()
      .int()
      .min(TASK_INPUT_LIMITS.minimumDuration)
      .max(TASK_INPUT_LIMITS.maximumDuration),
    spent: z.number().min(0),
    startedAt: instant.nullable(),
    lastStartedAt: instant.optional(),
    speed: z.literal(TIMER_SPEEDS).optional(),
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
    action: z.literal("speed"),
    date: dateSchema,
    taskId: z.string().min(1).max(100),
    speed: z.literal(TIMER_SPEEDS),
  }),
  z.object({
    action: z.literal("single-task"),
    date: dateSchema,
  }),
  z.object({
    action: z.literal("start"),
    date: dateSchema,
    taskId: z.string().min(1).max(100),
    multitask: z.boolean().optional(),
  }),
  z.object({
    action: z.literal("edit"),
    date: dateSchema,
    taskId: z.string().min(1).max(100),
    ...taskDetails,
  }),
  z.object({
    action: z.literal("add"),
    taskId: z.uuid().optional(),
    date: dateSchema,
    ...taskDetails,
  }),
  ...(["pause", "done", "acknowledge", "delete"] as const).map((action) =>
    z.object({
      action: z.literal(action),
      autoplay: z.boolean().optional(),
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
export const durationPresetsSchema = z
  .array(
    z
      .number()
      .int()
      .min(TASK_INPUT_LIMITS.minimumDuration)
      .max(TASK_INPUT_LIMITS.maximumDuration)
  )
  .min(1)
  .max(5);
export const taskPresetsSchema = z
  .array(
    z.object({
      id: z.string().min(1).max(100),
      ...taskDetails,
    })
  )
  .min(1)
  .max(10)
  .refine(
    (presets) =>
      new Set(presets.map((preset) => preset.id)).size === presets.length
  );

export const preferencesSchema = z.object({
  revision: z.number().int().nonnegative(),
  autoplay: z.boolean(),
  multitask: z.boolean(),
  notificationsEnabled: z.boolean(),
  durationPresets: durationPresetsSchema.default(() => [
    ...DEFAULT_DURATION_PRESETS,
  ]),
  taskPresets: taskPresetsSchema.default(() =>
    DEFAULT_TASK_PRESETS.map((preset) => ({ ...preset }))
  ),
});

export const preferencesPatchSchema = preferencesSchema
  .omit({ revision: true, durationPresets: true, taskPresets: true })
  .extend({
    durationPresets: durationPresetsSchema,
    taskPresets: taskPresetsSchema,
  })
  .partial()
  .strict();

export const snapshotSchema = z.object({
  day: daySchema,
  today: dateSchema,
  now: instant,
  mode: z.enum(["turso", "demo"]),
  notifications: z.array(noticeSchema),
  preferences: preferencesSchema.optional(),
});
export const changeSchema = z.object({
  snapshot: snapshotSchema,
  notification: noticeSchema.nullable(),
});
export const historySchema = z.object({
  day: daySchema,
  today: dateSchema,
  mode: z.enum(["turso", "demo"]),
  totals: z
    .array(z.object({ date: dateSchema, spent: z.number().nonnegative() }))
    .length(30),
});
