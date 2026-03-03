import type { Task } from "./type";

const TASK_ACTION_BUTTON_BASE_CLASS = "cursor-pointer text-xs px-1.5 py-1 rounded-lg corner-squircle";

const TASK_ACTION_BUTTON_COLOR_CLASS = {
  blue: "bg-blue-600 hover:bg-blue-500 text-blue-50",
  green: "bg-green-600 hover:bg-green-500 text-green-50",
  rose: "bg-rose-600 hover:bg-rose-500 text-rose-50",
  secondary: "bg-white hover:bg-zinc-200 hover:text-zinc-800 text-zinc-700",
  zinc: "bg-zinc-600 hover:bg-zinc-500 text-zinc-50",
} as const;

export function getTaskActionButtonClassName(color: keyof typeof TASK_ACTION_BUTTON_COLOR_CLASS) {
  return `${TASK_ACTION_BUTTON_BASE_CLASS} ${TASK_ACTION_BUTTON_COLOR_CLASS[color]}`;
}

export function sanitizeTasks(tasks: readonly Task[]) {
  let hasNow = false;
  let demotedNowCount = 0;
  const sanitizedTasks = tasks.map((task) => {
    if (task.type !== "Now") {
      return task;
    }
    if (!hasNow) {
      hasNow = true;
      return task;
    }
    demotedNowCount += 1;
    return { ...task, type: "Other" as const };
  });

  return { demotedNowCount, sanitizedTasks };
}

export const NEW_TASK_DURATION_PRESETS = [
  { label: "5", minutes: 5 },
  { label: "10", minutes: 10 },
  { label: "15", minutes: 15 },
  { label: "20", minutes: 20 },
  { label: "30", minutes: 30 },
  { label: "60", minutes: 60 },
  { label: "90", minutes: 90 },
] as const;

const DAILY_TASK_TEMPLATE: readonly Task[] = [];

export function createDailyTaskTemplate(): Task[] {
  return DAILY_TASK_TEMPLATE.map((task) => ({
    ...task,
    progress: 0,
    status: "Todo",
  }));
}
