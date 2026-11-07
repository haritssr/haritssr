// Builders shared by the Timer tests. Times are written in Jakarta (+07:00)
// so results do not depend on the machine's time zone.
import { DEFAULT_DAILY_TASKS } from "./dailyTasks";
import {
  DEFAULT_DURATION_PRESETS,
  DEFAULT_TASK_PRESETS,
  allDayPeriod,
} from "./timer";
import type { TimerDay, TimerPreferences, TimerTask } from "./timer";

export const DATE = "2026-03-10";

/** Epoch milliseconds for a Jakarta wall-clock time such as `09:30`. */
export function at(time: string, date: string = DATE) {
  const clock = time.length === 5 ? `${time}:00` : time;
  return Date.parse(`${date}T${clock}+07:00`);
}

let counter = 0;

export function task(overrides: Partial<TimerTask> = {}): TimerTask {
  counter += 1;
  return {
    id: `task-${counter}`,
    activity: "Task",
    description: "",
    duration: 3600,
    spent: 0,
    startedAt: null,
    reachedAt: null,
    notifiedAt: null,
    period: allDayPeriod(),
    ...overrides,
  };
}

export function day(tasks: TimerTask[], date: string = DATE): TimerDay {
  return { schemaVersion: 1, date, revision: 0, tasks };
}

export function preferences(
  overrides: Partial<TimerPreferences> = {}
): TimerPreferences {
  return {
    revision: 0,
    autoplay: false,
    multitask: false,
    desktopListView: false,
    followNowTimeline: false,
    notificationsEnabled: true,
    durationPresets: [...DEFAULT_DURATION_PRESETS],
    taskPresets: DEFAULT_TASK_PRESETS.map((preset) => ({ ...preset })),
    dailyTasks: structuredClone(DEFAULT_DAILY_TASKS),
    ...overrides,
  };
}
