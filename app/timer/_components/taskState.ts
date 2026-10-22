import { taskSpent } from "@/app/timer/utils/timer";
import type { TimerTask } from "@/app/timer/utils/timer";

function getTaskState(task: TimerTask, date: string, now: number) {
  const spent = taskSpent(task, date, now);
  const reached = task.reachedAt !== null || spent >= task.duration;
  const running = task.startedAt !== null && !reached;
  const paused = !running && !reached && spent > 0;
  let label: "Start" | "Pause" | "Continue" =
    task.spent === 0 ? "Start" : "Continue";
  if (running) {
    label = "Pause";
  }

  return { spent, reached, running, paused, label };
}

export type TaskState = ReturnType<typeof getTaskState>;

function taskOrder(task: TimerTask) {
  if (task.reachedAt !== null || task.spent >= task.duration) {
    return 3;
  }
  if (task.startedAt !== null) {
    return 0;
  }
  return task.spent > 0 ? 1 : 2;
}

export function getTaskCollection(
  tasks: TimerTask[],
  date: string,
  now: number
) {
  const entries = tasks
    .map((task) => ({ task, state: getTaskState(task, date, now) }))
    .toSorted((first, second) => {
      const stateOrder = taskOrder(first.task) - taskOrder(second.task);
      return (
        stateOrder ||
        second.state.spent / second.task.duration -
          first.state.spent / first.task.duration
      );
    });
  const active: typeof entries = [];
  const completed: TimerTask[] = [];
  for (const entry of entries) {
    if (entry.state.reached) {
      completed.push(entry.task);
    } else {
      active.push(entry);
    }
  }
  return { active, completed };
}
