import { z } from "zod";

import {
  DEFAULT_DURATION_PRESETS,
  DEFAULT_TASK_PRESETS,
  MAX_TIMER_TASKS,
  validTimerDate,
} from "@/app/(tools)/timer/utils/timer";
import { TASK_INPUT_LIMITS } from "@/app/(tools)/timer/utils/timerInput";

import { DEFAULT_DAILY_TASKS, DAILY_DESCRIPTION_LIMIT } from "./dailyTasks";

export const availabilityWindowSchema = z
  .object({
    from: z.number().int().min(0).max(1439),
    until: z.number().int().min(1).max(1440),
  })
  .refine(({ from, until }) => from < until);

export const dailyTasksSchema = z
  .array(
    z.object({
      id: z.string().startsWith("daily:").min(7).max(100),
      activity: z.string().trim().min(1).max(TASK_INPUT_LIMITS.activity),
      description: z.string().trim().max(DAILY_DESCRIPTION_LIMIT),
      duration: z.number().int().min(1).max(86_400),
      availabilityWindow: availabilityWindowSchema.nullable(),
    })
  )
  .max(MAX_TIMER_TASKS)
  .refine(
    (tasks) => new Set(tasks.map((task) => task.id)).size === tasks.length
  );

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
// Object parsing strips retired fields such as speed from legacy backups.
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
    reachedAt: instant.nullable(),
    notifiedAt: instant.nullable(),
    availabilityWindow: availabilityWindowSchema.nullable().optional(),
  })
  .refine((task) => task.spent <= task.duration);
export const daySchema = z
  .object({
    schemaVersion: z.literal(1),
    date: dateSchema,
    revision: z.number().int().nonnegative(),
    tasks: z.array(taskSchema).max(MAX_TIMER_TASKS),
  })
  .refine(
    (day) => new Set(day.tasks.map((task) => task.id)).size === day.tasks.length
  );

export const actionSchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("restore"),
    date: dateSchema,
    taskId: z.string().min(1).max(100),
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
  dailyTasks: dailyTasksSchema.default(() =>
    structuredClone(DEFAULT_DAILY_TASKS)
  ),
});

export const preferencesPatchSchema = preferencesSchema
  .omit({
    revision: true,
    durationPresets: true,
    taskPresets: true,
    dailyTasks: true,
  })
  .extend({
    durationPresets: durationPresetsSchema,
    taskPresets: taskPresetsSchema,
    dailyTasks: dailyTasksSchema,
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
