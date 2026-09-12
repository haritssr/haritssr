import type { Task, TaskLike } from "./type";

function isTask(candidate: unknown): candidate is TaskLike {
  if (candidate === null || typeof candidate !== "object") {
    return false;
  }

  const task = candidate as {
    duration?: unknown;
    progress?: unknown;
    title?: unknown;
    type?: unknown;
  };

  return (
    typeof task.title === "string" &&
    typeof task.duration === "number" &&
    Number.isFinite(task.duration) &&
    typeof task.progress === "number" &&
    Number.isFinite(task.progress) &&
    (task.type === "Now" ||
      task.type === "Other" ||
      task.type === "Done" ||
      task.type === "Queue")
  );
}

export function parseTasks(value: unknown): Task[] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  const validTasks = value.filter((task): task is TaskLike => isTask(task));
  if (validTasks.length !== value.length) {
    return null;
  }

  return validTasks.map((task): Task => {
    if (task.type === "Queue") {
      return { ...task, type: "Other" };
    }

    return { ...task, type: task.type };
  });
}
