import type { TimerTask, TimerTaskPreset, AvailabilityWindow } from "./timer";
import { TASK_INPUT_LIMITS } from "./timerInput";

export const DAILY_DESCRIPTION_LIMIT = TASK_INPUT_LIMITS.description;
export const MAX_DAILY_TASKS = 10;

export interface DailyTaskDefinition extends TimerTaskPreset {
  availabilityWindow: AvailabilityWindow | null;
}

export const DEFAULT_DAILY_TASKS: DailyTaskDefinition[] = [
  {
    id: "daily:x",
    activity: "X",
    description: "",
    duration: 1800,
    availabilityWindow: { from: 1080, until: 1380 },
  },
  {
    id: "daily:youtube",
    activity: "YouTube",
    description: "",
    duration: 7200,
    availabilityWindow: { from: 1080, until: 1380 },
  },
  {
    id: "daily:housekeeping",
    activity: "Housekeeping",
    description: "Shower, plants, floors, dishes.",
    duration: 3600,
    availabilityWindow: null,
  },
  {
    id: "daily:meditation-morning",
    activity: "Morning Meditation",
    description: "",
    duration: 1800,
    availabilityWindow: { from: 360, until: 600 },
  },
  {
    id: "daily:meditation-evening",
    activity: "Evening Meditation",
    description: "",
    duration: 1800,
    availabilityWindow: { from: 1080, until: 1260 },
  },
  {
    id: "daily:exercise",
    activity: "Exercise",
    description: "",
    duration: 1200,
    availabilityWindow: null,
  },
  {
    id: "daily:working-1",
    activity: "Working #1",
    description: "",
    duration: 5400,
    availabilityWindow: null,
  },
  {
    id: "daily:working-2",
    activity: "Working #2",
    description: "",
    duration: 5400,
    availabilityWindow: null,
  },
  {
    id: "daily:working-3",
    activity: "Working #3",
    description: "",
    duration: 5400,
    availabilityWindow: null,
  },
  {
    id: "daily:working-4",
    activity: "Working #4",
    description: "",
    duration: 5400,
    availabilityWindow: null,
  },
];

export function isDailyTask(task: Pick<TimerTask, "id">) {
  return task.id.startsWith("daily:");
}

export function createDailyTasks(
  definitions: DailyTaskDefinition[]
): TimerTask[] {
  return definitions.map((definition) => ({
    ...definition,
    availabilityWindow:
      definition.availabilityWindow === null
        ? null
        : { ...definition.availabilityWindow },
    spent: 0,
    startedAt: null,
    reachedAt: null,
    notifiedAt: null,
  }));
}

function windowTime(minutes: number) {
  const hour = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return `${hour}${remainder === 0 ? "" : `:${String(remainder).padStart(2, "0")}`}`;
}

export function formatAvailabilityWindow(
  window: AvailabilityWindow | null | undefined
) {
  return window === null || window === undefined
    ? undefined
    : `${windowTime(window.from)}/${windowTime(window.until)}`;
}
