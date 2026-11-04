import type { DailyTaskDefinition } from "../utils/dailyTasks";
import { taskKind } from "../utils/timer";
import type { TaskKind } from "../utils/timer";
import { TASK_INPUT_LIMITS } from "../utils/timerInput";
import { inputTime, inputWindow } from "../utils/timerTime";
import { dailyTasksSchema } from "../utils/timerValidation";
import { durationSeconds, durationValue } from "./durationValue";
import type { DurationValue } from "./durationValue";

export interface DailyDraft {
  id: string;
  activity: string;
  description: string;
  duration: DurationValue;
  kind: TaskKind;
  window: { from: string; until: string } | null;
}

export interface DailyDraftError {
  taskId?: string;
  field?: "activity" | "description" | "duration" | "window";
  message: string;
}

export function dailyTaskDrafts(tasks: DailyTaskDefinition[]): DailyDraft[] {
  return tasks.map((task) => ({
    id: task.id,
    activity: task.activity,
    description: task.description,
    duration: durationValue(task.duration),
    kind: taskKind(task),
    window:
      task.period === null
        ? null
        : {
            from: inputTime(task.period.from),
            until: inputTime(task.period.until),
          },
  }));
}

export function newDailyTaskDraft(): DailyDraft {
  return {
    id: `daily:${crypto.randomUUID()}`,
    activity: "",
    description: "",
    duration: durationValue(1800),
    kind: "work",
    window: null,
  };
}

export function moveDailyDraft(
  entries: DailyDraft[],
  id: string,
  step: -1 | 1
) {
  const index = entries.findIndex((entry) => entry.id === id);
  const target = index + step;
  if (index === -1 || target < 0 || target >= entries.length) {
    return entries;
  }
  const next = [...entries];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

export function parseDailyDrafts(
  entries: DailyDraft[]
):
  | { success: true; data: DailyTaskDefinition[] }
  | { success: false; error: DailyDraftError } {
  const invalidUnits = entries.find(
    (entry) =>
      !Object.values(entry.duration).every(
        (unit) =>
          unit !== "" && Number.isInteger(Number(unit)) && Number(unit) >= 0
      ) ||
      Number(entry.duration.minutes) > 59 ||
      Number(entry.duration.seconds) > 59
  );
  if (invalidUnits) {
    return {
      success: false,
      error: {
        taskId: invalidUnits.id,
        field: "duration",
        message:
          "Use whole, nonnegative duration values, with minutes and seconds from 0 to 59.",
      },
    };
  }
  const result = dailyTasksSchema.safeParse(
    entries.map((entry) => {
      let period = null;
      if (entry.window !== null) {
        period = inputWindow(entry.window.from, entry.window.until);
      }
      return {
        id: entry.id,
        activity: entry.activity,
        description: entry.description,
        duration: durationSeconds(entry.duration),
        kind: entry.kind,
        period,
      };
    })
  );
  if (result.success) {
    return { success: true, data: result.data };
  }
  const [issue] = result.error.issues;
  const [index, field] = issue.path;
  const entry = typeof index === "number" ? entries[index] : undefined;
  let { message } = issue;
  if (field === "activity") {
    message =
      (entry?.activity.trim().length ?? 0) > 0
        ? `Use ${TASK_INPUT_LIMITS.activity} characters or fewer for the name.`
        : "Enter a name.";
  } else if (field === "description") {
    const length = entry?.description.trim().length ?? 0;
    message =
      length > 0
        ? `Description has ${length} characters; use ${TASK_INPUT_LIMITS.description} or fewer.`
        : "Enter a description.";
  } else if (field === "duration") {
    message = "Choose a duration from one second to 24 hours.";
  } else if (field === "period") {
    message =
      "Choose From and Until in 15-minute increments, at least 15 minutes apart. Use 00:00 to end at midnight.";
  }
  let errorField: DailyDraftError["field"];
  if (field === "period") {
    errorField = "window";
  } else if (
    field === "activity" ||
    field === "description" ||
    field === "duration"
  ) {
    errorField = field;
  }
  return {
    success: false,
    error: {
      taskId: entry?.id,
      field: errorField,
      message,
    },
  };
}
