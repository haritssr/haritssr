import {
  MAX_TASK_DURATION_MINUTES,
  MAX_TASKS_PER_DAY,
} from "@/app/experiments/ui-explorations/task/data";
import type { Task } from "@/app/experiments/ui-explorations/task/type";

const MAX_TASK_TITLE_LENGTH = 200;
const taskDatePattern = /^\d{4}-\d{2}-\d{2}$/u;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isValidTaskDate(value: string) {
  if (!taskDatePattern.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return (
    !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
}

function parseTask(candidate: unknown): Task | null {
  if (!isRecord(candidate)) {
    return null;
  }

  const { duration, progress, title, type } = candidate;
  if (
    typeof title !== "string" ||
    title.length === 0 ||
    title.length > MAX_TASK_TITLE_LENGTH ||
    title.trim() !== title ||
    typeof duration !== "number" ||
    !Number.isSafeInteger(duration) ||
    duration < 1 ||
    duration > MAX_TASK_DURATION_MINUTES ||
    typeof progress !== "number" ||
    !Number.isFinite(progress) ||
    progress < 0 ||
    progress > 100 ||
    (type !== "Now" && type !== "Other" && type !== "Done")
  ) {
    return null;
  }

  return { duration, progress, title, type };
}

export function parseTaskPayload(
  payload: unknown,
  defaultTaskDate: string
): { taskDate: string; tasks: Task[] } | null {
  if (!isRecord(payload) || !Array.isArray(payload.tasks)) {
    return null;
  }

  const taskDate = payload.date ?? defaultTaskDate;
  if (typeof taskDate !== "string" || !isValidTaskDate(taskDate)) {
    return null;
  }

  if (payload.tasks.length > MAX_TASKS_PER_DAY) {
    return null;
  }

  const tasks: Task[] = [];
  const normalizedTitles = new Set<string>();

  for (const candidate of payload.tasks) {
    const task = parseTask(candidate);
    if (!task) {
      return null;
    }

    const normalizedTitle = task.title.toLocaleLowerCase("en-US");
    if (normalizedTitles.has(normalizedTitle)) {
      return null;
    }

    normalizedTitles.add(normalizedTitle);
    tasks.push(task);
  }

  return { taskDate, tasks };
}
