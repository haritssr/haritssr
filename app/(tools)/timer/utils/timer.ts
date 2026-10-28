import type { DailyTaskDefinition } from "./dailyTasks";

export interface AvailabilityWindow {
  from: number;
  until: number;
}

export const MAX_TIMER_TASKS = 100;

export const TIMER_SPEEDS = [1, 1.5, 2, 2.5, 3] as const;
type TimerSpeed = (typeof TIMER_SPEEDS)[number];

export interface TimerTask {
  id: string;
  activity: string;
  description: string;
  duration: number;
  spent: number;
  startedAt: string | null;
  lastStartedAt?: string;
  speed?: TimerSpeed;
  reachedAt: string | null;
  notifiedAt: string | null;
  availabilityWindow?: AvailabilityWindow | null;
}

export interface TimerDay {
  schemaVersion: 1;
  date: string;
  revision: number;
  tasks: TimerTask[];
}

export interface TimerNotice {
  date: string;
  taskId: string;
  activity: string;
}

export interface TimerTaskPreset {
  id: string;
  activity: string;
  description: string;
  duration: number;
}

export const DEFAULT_DURATION_PRESETS = [300, 900, 1800, 3600];
export const DEFAULT_TASK_PRESETS: TimerTaskPreset[] = [
  {
    id: "x-traversal",
    activity: "X Traversal",
    description: "bookmarks, for you tab",
    duration: 3600,
  },
  {
    id: "youtube",
    activity: "YouTube",
    description: "watch later",
    duration: 7200,
  },
  {
    id: "house-keeping",
    activity: "House Keeping",
    description: "sapu, pel, tanaman, cleaning",
    duration: 3600,
  },
  {
    id: "short-break",
    activity: "Short Break",
    description: "",
    duration: 600,
  },
  {
    id: "long-break",
    activity: "Long Break",
    description: "",
    duration: 1800,
  },
  {
    id: "orientation",
    activity: "Orientation",
    description: "",
    duration: 1800,
  },
  {
    id: "working-session",
    activity: "Working",
    description: "focus",
    duration: 5400,
  },
  {
    id: "thinking",
    activity: "Thinking",
    description: "do not disturb",
    duration: 1800,
  },
];

export interface TimerPreferences {
  revision: number;
  autoplay: boolean;
  multitask: boolean;
  notificationsEnabled: boolean;
  durationPresets: number[];
  taskPresets: TimerTaskPreset[];
  dailyTasks: DailyTaskDefinition[];
}

export function canUseTimer(
  snapshot: TimerSnapshot | undefined
): snapshot is TimerSnapshot & { mode: "turso" } {
  return snapshot !== undefined && snapshot.mode !== "demo";
}

export interface TimerSnapshot {
  day: TimerDay;
  today: string;
  now: string;
  mode: "turso" | "demo";
  notifications: TimerNotice[];
  preferences?: TimerPreferences;
}

export interface TimerHistory {
  day: TimerDay;
  today: string;
  mode: "turso" | "demo";
  totals: { date: string; spent: number }[];
}

export type TimerAction =
  | {
      action: "restore";
      date: string;
      taskId: string;
    }
  | {
      action: "speed";
      date: string;
      taskId: string;
      speed: TimerSpeed;
    }
  | {
      action: "single-task";
      date: string;
    }
  | {
      action: "start";
      multitask?: boolean;
      date: string;
      taskId: string;
    }
  | {
      action: "add";
      taskId?: string;
      date: string;
      activity: string;
      description: string;
      duration: number;
    }
  | {
      action: "edit";
      date: string;
      taskId: string;
      activity: string;
      description: string;
      duration: number;
    }
  | {
      action: "pause" | "done" | "acknowledge" | "delete";
      autoplay?: boolean;
      date: string;
      taskId: string;
    };

const TIMER_TIME_ZONE = "Asia/Jakarta";

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIMER_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function timerDate(now: number = Date.now()) {
  const parts = dateFormatter.formatToParts(now);
  const part = (type: string) =>
    parts.find((value) => value.type === type)?.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export function validTimerDate(value: string) {
  return (
    /^\d{4}-\d{2}-\d{2}$/u.test(value) &&
    Number.isFinite(Date.parse(`${value}T00:00:00Z`)) &&
    new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value
  );
}

export function shiftTimerDate(date: string, days: number) {
  return new Date(Date.parse(`${date}T00:00:00Z`) + days * 86_400_000)
    .toISOString()
    .slice(0, 10);
}

export interface TimerDayBounds {
  start: number;
  end: number;
}

export function timerDayBounds(date: string): TimerDayBounds {
  const start = Date.parse(`${date}T00:00:00+07:00`);
  return { start, end: start + 86_400_000 };
}

export function timerMidnight(date: string) {
  return timerDayBounds(date).end;
}

export function taskTiming(
  task: TimerTask,
  bounds: TimerDayBounds,
  now: number
) {
  const opensAt = bounds.start + (task.availabilityWindow?.from ?? 0) * 60_000;
  const closesAt =
    bounds.start + (task.availabilityWindow?.until ?? 1440) * 60_000;
  const elapsed =
    task.startedAt === null
      ? 0
      : Math.max(
          0,
          (Math.min(now, closesAt) - Date.parse(task.startedAt)) / 1000
        );
  return {
    spent: Math.min(task.duration, task.spent + elapsed * (task.speed ?? 1)),
    available: now >= opensAt && now < closesAt,
    opensAt,
    closesAt,
  };
}

export function taskSpent(task: TimerTask, date: string, now: number) {
  return taskTiming(task, timerDayBounds(date), now).spent;
}

export function taskWindowEnd(
  task: Pick<TimerTask, "availabilityWindow">,
  date: string
) {
  return (
    timerDayBounds(date).start +
    (task.availabilityWindow?.until ?? 1440) * 60_000
  );
}

export function taskAvailable(task: TimerTask, date: string, now: number) {
  const bounds = timerDayBounds(date);
  return (
    now >= bounds.start + (task.availabilityWindow?.from ?? 0) * 60_000 &&
    now < bounds.start + (task.availabilityWindow?.until ?? 1440) * 60_000
  );
}

export function taskTransitionTime(task: TimerTask, date: string) {
  return task.startedAt === null
    ? Infinity
    : Math.min(taskCompletionTime(task), taskWindowEnd(task, date));
}

// The projected finish at the current speed, before the midnight cutoff.
export function taskCompletionTime(task: TimerTask) {
  return task.startedAt === null
    ? Infinity
    : Date.parse(task.startedAt) +
        ((task.duration - task.spent) / (task.speed ?? 1)) * 1000;
}

export function formatTimerTime(seconds: number) {
  const value = Math.max(0, Math.floor(seconds));
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value % 3600) / 60);
  const remainder = String(value % 60).padStart(2, "0");
  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, "0")}:${remainder}`
    : `${minutes}:${remainder}`;
}

export function createEmptyTimerDay(date: string): TimerDay {
  return { schemaVersion: 1, date, revision: 0, tasks: [] };
}

function createTimerDay(date: string): TimerDay {
  return {
    schemaVersion: 1,
    date,
    revision: 0,
    tasks: [
      {
        id: "daily-x",
        activity: "X Traversal",
        description: "x bookmarks doom scrolling",
        duration: 3600,
      },
      {
        id: "daily-house-keeping",
        activity: "House keeping",
        description: "sapu pel, siram tanaman, cuci piring, masak nasi",
        duration: 3600,
      },
    ].map((task) => ({
      ...task,
      spent: 0,
      startedAt: null,
      reachedAt: null,
      notifiedAt: null,
    })),
  };
}

export function createSampleTimerDay(date: string): TimerDay {
  const day = createTimerDay(date);
  let seed = Number(date.replaceAll("-", ""));
  const random = () => {
    seed = (seed * 1_664_525 + 1_013_904_223) % 4_294_967_296;
    return seed / 4_294_967_296;
  };
  const activities = [
    ["Focused work", "Build and refine one useful feature.", 7200],
    ["Reading", "Read a chapter and write down the main ideas.", 2700],
    ["Exercise", "A walk, stretching, or a short workout.", 1800],
    ["Planning", "Choose priorities and batch small tasks.", 1200],
    ["Physics", "Work through problems and review the solutions.", 3600],
  ] as const;
  for (const [
    index,
    [activity, description, duration],
  ] of activities.entries()) {
    if (random() > 0.3) {
      day.tasks.push({
        id: `sample-${index}`,
        activity,
        description,
        duration,
        spent: 0,
        startedAt: null,
        reachedAt: null,
        notifiedAt: null,
      });
    }
  }
  for (const task of day.tasks) {
    const progress = random();
    task.spent = Math.floor(task.duration * (0.2 + random() * 0.7));
    if (progress < 0.12) {
      task.spent = 0;
    }
    if (progress > 0.62) {
      task.spent = task.duration;
    }
    if (task.spent === task.duration) {
      task.reachedAt = `${date}T16:00:00+07:00`;
      task.notifiedAt = task.reachedAt;
    }
  }
  return day;
}
