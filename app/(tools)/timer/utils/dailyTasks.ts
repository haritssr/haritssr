import type { TimerTask, TimerTaskPreset, AvailabilityWindow } from "./timer";

export const DAILY_DESCRIPTION_LIMIT = 2000;

export interface DailyTaskDefinition extends TimerTaskPreset {
  availabilityWindow: AvailabilityWindow | null;
}

export const DEFAULT_DAILY_TASKS: DailyTaskDefinition[] = [
  {
    id: "daily:x",
    activity: "X",
    description: "",
    duration: 1800,
    availabilityWindow: { from: 1080, until: 1440 },
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
    availabilityWindow: { from: 1080, until: 1320 },
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
    speed: 1,
    startedAt: null,
    reachedAt: null,
    notifiedAt: null,
  }));
}

function windowTime(minutes: number, end: boolean) {
  const hour = Math.floor(minutes / 60) % 24;
  // Preserve the approved compact 23pm label for an 11 PM closing time.
  const displayHour = end && hour === 23 ? 23 : hour % 12 || 12;
  const remainder = minutes % 60;
  const clock = `${displayHour}${remainder === 0 ? "" : `:${String(remainder).padStart(2, "0")}`}`;
  return end ? `${clock}${hour < 12 ? "am" : "pm"}` : clock;
}

export function formatAvailabilityWindow(
  window: AvailabilityWindow | null | undefined
) {
  return window === null || window === undefined
    ? undefined
    : `${windowTime(window.from, false)}-${windowTime(window.until, true)}`;
}
