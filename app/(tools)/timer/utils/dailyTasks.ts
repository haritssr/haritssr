import type { TimerTask, TimerTaskPreset, AvailabilityWindow } from "./timer";

export const DAILY_DESCRIPTION_LIMIT = 2000;
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
    description: "Shower, watering plants, floor cleaning, wash dishes.",
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
    duration: 1800,
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
