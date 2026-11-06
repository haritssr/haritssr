import { z } from "zod";

import {
  DEFAULT_DURATION_PRESETS,
  DEFAULT_TASK_PRESETS,
  MAX_TIMER_TASKS,
  TIMER_HISTORY_RANGES,
  allDayPeriod,
  isAllDay,
  validTimerDate,
  timerMilliseconds,
} from "@/app/(tools)/timer/utils/timer";
import {
  TASK_FORM_INPUT_LIMITS,
  TASK_INPUT_LIMITS,
} from "@/app/(tools)/timer/utils/timerInput";

import {
  DEFAULT_DAILY_TASKS,
  DAILY_DESCRIPTION_LIMIT,
  MAX_DAILY_TASKS,
} from "./dailyTasks";
import { monthDates, validTimerMonth } from "./timerCalendar";

export const periodSchema = z
  .object({
    from: z.number().int().min(0).max(1439),
    until: z.number().int().min(1).max(1440),
  })
  .refine(({ from, until }) => from < until);

export const scheduledWindowSchema = periodSchema.refine(
  ({ from, until }) =>
    until - from >= 15 && from % 15 === 0 && until % 15 === 0,
  "Choose times in 15-minute increments, at least 15 minutes apart."
);

const taskKindSchema = z.enum(["work", "leisure"]);

/** Stored periods; a missing or null value (older data) reads as all day. */
const storedPeriodSchema = periodSchema
  .nullish()
  .transform((period) => period ?? allDayPeriod());

const storedDailyTasksSchema = z
  .array(
    z.object({
      id: z.string().startsWith("daily:").min(7).max(100),
      activity: z.string().trim().min(1).max(TASK_INPUT_LIMITS.activity),
      description: z.string().trim().max(2000),
      duration: z.number().int().min(1).max(86_400),
      period: storedPeriodSchema,
      kind: taskKindSchema.optional(),
    })
  )
  .max(MAX_TIMER_TASKS)
  .refine(
    (tasks) => new Set(tasks.map((task) => task.id)).size === tasks.length
  );
export const dailyTasksSchema = storedDailyTasksSchema.superRefine(
  (tasks, context) => {
    if (tasks.length > MAX_DAILY_TASKS) {
      context.addIssue({
        code: "custom",
        message: `Use at most ${MAX_DAILY_TASKS} daily tasks.`,
      });
    }
    for (const [index, task] of tasks.entries()) {
      if (
        !isAllDay(task.period) &&
        (task.period.until - task.period.from < 15 ||
          task.period.from % 15 !== 0 ||
          task.period.until % 15 !== 0)
      ) {
        context.addIssue({
          code: "custom",
          path: [index, "period"],
          message:
            "Choose times in 15-minute increments, at least 15 minutes apart.",
        });
      }
      if (task.description.length === 0) {
        context.addIssue({
          code: "custom",
          path: [index, "description"],
          message: "Enter a description.",
        });
      } else if (task.description.length > DAILY_DESCRIPTION_LIMIT) {
        context.addIssue({
          code: "custom",
          path: [index, "description"],
          message: `Use ${DAILY_DESCRIPTION_LIMIT} characters or fewer for the description.`,
        });
      }
    }
  }
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
  kind: taskKindSchema.optional(),
};
/** Reads the legacy `availabilityWindow` key from old backups as `period`. */
function renameLegacyPeriod(value: unknown) {
  if (
    typeof value !== "object" ||
    value === null ||
    !("availabilityWindow" in value) ||
    "period" in value
  ) {
    return value;
  }
  const { availabilityWindow: period, ...rest } = value;
  return { ...rest, period };
}

// Object parsing strips retired fields such as speed from legacy backups.
const taskSchema = z.preprocess(
  renameLegacyPeriod,
  z
    .object({
      id: z.string().min(1).max(100),
      activity: z.string().trim().min(1).max(120),
      description: z.string().max(2000),
      duration: z
        .number()
        .int()
        .min(TASK_INPUT_LIMITS.minimumDuration)
        .max(TASK_INPUT_LIMITS.maximumDuration),
      spent: z
        .number()
        .min(0)
        .transform((value) => timerMilliseconds(value) / 1000),
      startedAt: instant.nullable(),
      lastStartedAt: instant.optional(),
      reachedAt: instant.nullable(),
      notifiedAt: instant.nullable(),
      deadlineReminderAt: instant.nullable().optional(),
      period: storedPeriodSchema,
      kind: taskKindSchema.optional(),
    })
    .refine((task) => task.spent <= task.duration)
);
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
    action: z.literal("start-scheduled"),
    date: dateSchema,
    taskIds: z.array(z.string().min(1).max(100)).min(1).max(MAX_TIMER_TASKS),
  }),
  z.object({
    action: z.literal("claim-deadline-reminder"),
    date: dateSchema,
    taskId: z.string().min(1).max(100),
  }),
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
    action: z.literal("resize-scheduled"),
    date: dateSchema,
    taskId: z.string().min(1).max(100),
    period: scheduledWindowSchema,
  }),
  z
    .object({
      action: z.literal("edit"),
      period: scheduledWindowSchema.optional(),
      date: dateSchema,
      taskId: z.string().min(1).max(100),
      ...taskDetails,
      activity: z.string().trim().min(1).max(TASK_FORM_INPUT_LIMITS.activity),
      description: z.string().trim().max(TASK_FORM_INPUT_LIMITS.description),
    })
    .refine(
      ({ description, period }) => description.length > 0 || !isAllDay(period),
      { path: ["description"], message: "Enter a description." }
    ),
  z
    .object({
      action: z.literal("add"),
      period: scheduledWindowSchema.optional(),
      taskId: z.uuid().optional(),
      date: dateSchema,
      ...taskDetails,
      activity: z.string().trim().min(1).max(TASK_FORM_INPUT_LIMITS.activity),
      description: z.string().trim().max(TASK_FORM_INPUT_LIMITS.description),
    })
    .refine(
      ({ description, period }) => description.length > 0 || !isAllDay(period),
      { path: ["description"], message: "Enter a description." }
    ),
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
const storedTaskPresetsSchema = z
  .array(
    z.object({
      id: z.string().min(1).max(100),
      ...taskDetails,
      description: z.string().trim().max(TASK_INPUT_LIMITS.description),
    })
  )
  .min(1)
  .max(10)
  .refine(
    (presets) =>
      new Set(presets.map((preset) => preset.id)).size === presets.length
  );
export const taskPresetsSchema = storedTaskPresetsSchema.refine((presets) =>
  presets.every(
    (preset) =>
      preset.description.length > 0 &&
      preset.description.length <= TASK_INPUT_LIMITS.description
  )
);

export const preferencesSchema = z.object({
  revision: z.number().int().nonnegative(),
  autoplay: z.boolean(),
  multitask: z.boolean(),
  desktopListView: z.boolean().default(false),
  pagedTimeline: z.boolean().default(false),
  followNowTimeline: z.boolean().default(false),
  notificationsEnabled: z.boolean(),
  durationPresets: durationPresetsSchema.default(() => [
    ...DEFAULT_DURATION_PRESETS,
  ]),
  taskPresets: storedTaskPresetsSchema.default(() =>
    DEFAULT_TASK_PRESETS.map((preset) => ({ ...preset }))
  ),
  dailyTasks: storedDailyTasksSchema.default(() =>
    structuredClone(DEFAULT_DAILY_TASKS)
  ),
});

export const preferencesPatchSchema = preferencesSchema
  .omit({
    revision: true,
    desktopListView: true,
    pagedTimeline: true,
    followNowTimeline: true,
    durationPresets: true,
    taskPresets: true,
    dailyTasks: true,
  })
  .extend({
    desktopListView: z.boolean(),
    pagedTimeline: z.boolean(),
    followNowTimeline: z.boolean(),
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
  deadlineReminder: noticeSchema.nullable().default(null),
});
export const historySchema = z.object({
  day: daySchema,
  today: dateSchema,
  mode: z.enum(["turso", "demo"]),
  totals: z
    .array(
      z.object({
        date: dateSchema,
        spent: z.number().nonnegative(),
        budget: z.number().nonnegative(),
        work: z.number().nonnegative(),
        leisure: z.number().nonnegative(),
      })
    )
    .refine((totals) => TIMER_HISTORY_RANGES.some((n) => n === totals.length)),
});

export const calendarSchema = z
  .object({
    month: z.string().refine(validTimerMonth),
    today: dateSchema,
    mode: z.enum(["turso", "demo"]),
    days: z.array(daySchema).min(28).max(31),
  })
  .refine(({ month, days }) => {
    if (!validTimerMonth(month)) {
      return false;
    }
    const dates = monthDates(month);
    return (
      days.length === dates.length &&
      days.every((day, index) => day.date === dates[index])
    );
  });
