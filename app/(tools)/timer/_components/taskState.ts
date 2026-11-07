import { timerDayBounds } from "@/app/(tools)/timer/utils/timer";
import type {
  TimerDayBounds,
  TimerTask,
} from "@/app/(tools)/timer/utils/timer";

import { PHASE_ORDER, getTaskState } from "./taskStatus";
import type { TaskState } from "./taskStatus";

export type { TaskState } from "./taskStatus";

interface TaskEntry {
  task: TimerTask;
  state: TaskState;
}

function taskOrder(state: TaskState) {
  return PHASE_ORDER[state.phase];
}

function compareTasks(first: TaskEntry, second: TaskEntry) {
  return (
    taskOrder(first.state) - taskOrder(second.state) ||
    second.state.spent / second.task.duration -
      first.state.spent / first.task.duration
  );
}

export function reconcileTaskOrder(previous: string[], visible: TaskEntry[]) {
  const visibleIds = new Set(visible.map(({ task }) => task.id));
  const upcomingIds = new Set(
    visible.filter(({ state }) => !state.available).map(({ task }) => task.id)
  );
  const order = previous.filter((id) => visibleIds.has(id));
  const knownIds = new Set(order);
  for (const { task, state } of visible) {
    const { id } = task;
    if (!knownIds.has(id)) {
      const upcomingIndex = state.available
        ? order.findIndex((existingId) => upcomingIds.has(existingId))
        : -1;
      if (upcomingIndex === -1) {
        order.push(id);
      } else {
        order.splice(upcomingIndex, 0, id);
      }
      knownIds.add(id);
    }
  }
  const running = visible.filter(({ state }) => state.running);
  const runningIds = new Set(running.map(({ task }) => task.id));
  const nextOrder = [
    ...running.map(({ task }) => task.id),
    ...order.filter((id) => !runningIds.has(id)),
  ];
  return nextOrder.length === previous.length &&
    nextOrder.every((id, index) => id === previous[index])
    ? previous
    : nextOrder;
}

export function getTaskCollection(
  tasks: TimerTask[],
  date: string,
  now: number
) {
  const bounds: TimerDayBounds = timerDayBounds(date);
  const active: TaskEntry[] = [];
  const completed: TaskEntry[] = [];
  for (const task of tasks) {
    const entry = { task, state: getTaskState(task, date, now, bounds) };
    if (entry.state.reached || entry.state.missed) {
      completed.push(entry);
    } else {
      active.push(entry);
    }
  }
  active.sort(compareTasks);
  completed.sort(compareTasks);
  return {
    active,
    completed: completed.map(({ task }) => task),
    visible: active,
  };
}

export function getEarliestRunningTask(
  tasks: TimerTask[],
  date: string,
  now: number
) {
  const bounds = timerDayBounds(date);
  let earliest: TaskEntry | undefined;
  let remaining = Infinity;
  for (const task of tasks) {
    if (task.startedAt === null) {
      continue;
    }
    const state = getTaskState(task, date, now, bounds);
    if (!state.running) {
      continue;
    }
    const entry = { task, state };
    const seconds = task.duration - state.spent;
    if (
      seconds < remaining ||
      (seconds === remaining &&
        earliest !== undefined &&
        compareTasks(entry, earliest) < 0)
    ) {
      // Equal finish times retain the collection's progress and saved ordering.
      earliest = entry;
      remaining = seconds;
    }
  }
  return earliest;
}
