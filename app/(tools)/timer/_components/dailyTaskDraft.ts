import type { DailyTaskDefinition } from "../utils/dailyTasks";
import { dailyTasksSchema } from "../utils/timerValidation";
import { durationSeconds, durationValue } from "./durationValue";
import type { DurationValue } from "./durationValue";

export interface DailyDraft {
  id: string;
  activity: string;
  description: string;
  duration: DurationValue;
  window: { from: string; until: string } | null;
}

function timeValue(minutes: number) {
  return `${String(Math.floor(minutes / 60) % 24).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

function timeMinutes(time: string) {
  if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time)) {
    return Number.NaN;
  }
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function dailyTaskDrafts(tasks: DailyTaskDefinition[]): DailyDraft[] {
  return tasks.map((task) => ({
    id: task.id,
    activity: task.activity,
    description: task.description,
    duration: durationValue(task.duration),
    window:
      task.availabilityWindow === null
        ? null
        : {
            from: timeValue(task.availabilityWindow.from),
            until: timeValue(task.availabilityWindow.until),
          },
  }));
}

export function newDailyTaskDraft(): DailyDraft {
  return {
    id: `daily:${crypto.randomUUID()}`,
    activity: "",
    description: "",
    duration: durationValue(1800),
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
): DailyTaskDefinition[] | null {
  const validUnits = entries.every(
    (entry) =>
      Object.values(entry.duration).every(
        (unit) =>
          unit !== "" && Number.isInteger(Number(unit)) && Number(unit) >= 0
      ) &&
      Number(entry.duration.minutes) <= 59 &&
      Number(entry.duration.seconds) <= 59
  );
  if (!validUnits) {
    return null;
  }
  const result = dailyTasksSchema.safeParse(
    entries.map((entry) => {
      let availabilityWindow = null;
      if (entry.window !== null) {
        const until = timeMinutes(entry.window.until);
        availabilityWindow = {
          from: timeMinutes(entry.window.from),
          until: until === 0 ? 1440 : until,
        };
      }
      return {
        id: entry.id,
        activity: entry.activity,
        description: entry.description,
        duration: durationSeconds(entry.duration),
        availabilityWindow,
      };
    })
  );
  return result.success ? result.data : null;
}
