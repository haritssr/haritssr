import { taskTiming, timerDayBounds } from "@/app/(tools)/timer/utils/timer";
import type {
  TimerDayBounds,
  TimerTask,
} from "@/app/(tools)/timer/utils/timer";
import { taskDeadline } from "@/app/(tools)/timer/utils/timerDeadline";

function getTaskState(
  task: TimerTask,
  date: string,
  now: number,
  bounds = timerDayBounds(date)
) {
  const { spent, available, closesAt } = taskTiming(task, bounds, now);
  const reached = task.reachedAt !== null || spent >= task.duration;
  const missed =
    !reached && (task.availabilityWindow ?? null) !== null && now >= closesAt;
  const running = task.startedAt !== null && !reached && available;
  const paused = !running && !reached && spent > 0;
  let label: "Start" | "Pause" | "Continue" =
    task.spent === 0 ? "Start" : "Continue";
  if (running) {
    label = "Pause";
  }
  const deadline = taskDeadline(task, bounds, now);
  return {
    spent,
    reached,
    missed,
    running,
    paused,
    label,
    available,
    deadlineWarning: deadline.warning,
    latestStartAt: deadline.latestStartAt,
    closesAt: deadline.closesAt,
  };
}

export type TaskState = ReturnType<typeof getTaskState>;
interface TaskEntry {
  task: TimerTask;
  state: TaskState;
}

function taskOrder(state: TaskState) {
  if (state.reached || state.missed) {
    return 4;
  }
  if (!state.available) {
    return 3;
  }
  if (state.running) {
    return 0;
  }
  return state.spent > 0 ? 1 : 2;
}

function compareTasks(first: TaskEntry, second: TaskEntry) {
  return (
    taskOrder(first.state) - taskOrder(second.state) ||
    second.state.spent / second.task.duration -
      first.state.spent / first.task.duration
  );
}

export function reconcileTaskOrder(previous: string[], visible: string[]) {
  const visibleIds = new Set(visible);
  const order = previous.filter((id) => visibleIds.has(id));
  const knownIds = new Set(order);
  for (const id of visible) {
    if (!knownIds.has(id)) {
      order.push(id);
      knownIds.add(id);
    }
  }
  return order.length === previous.length &&
    order.every((id, index) => id === previous[index])
    ? previous
    : order;
}

export function getTaskCollection(
  tasks: TimerTask[],
  date: string,
  now: number
) {
  const bounds: TimerDayBounds = timerDayBounds(date);
  const active: TaskEntry[] = [];
  const completed: TaskEntry[] = [];
  const visible: TaskEntry[] = [];
  for (const task of tasks) {
    const entry = { task, state: getTaskState(task, date, now, bounds) };
    if (!entry.state.missed && !entry.state.reached) {
      visible.push(entry);
    }
    if (entry.state.reached || entry.state.missed) {
      completed.push(entry);
    } else {
      active.push(entry);
    }
  }
  active.sort(compareTasks);
  completed.sort(compareTasks);
  visible.sort(compareTasks);
  return {
    active,
    completed: completed.map(({ task }) => task),
    visible,
  };
}
