import { isDailyTask } from "@/app/(tools)/timer/utils/dailyTasks";
import { taskTiming, timerDayBounds } from "@/app/(tools)/timer/utils/timer";
import type {
  TimerDayBounds,
  TimerTask,
} from "@/app/(tools)/timer/utils/timer";

function getTaskState(
  task: TimerTask,
  date: string,
  now: number,
  bounds = timerDayBounds(date)
) {
  const { spent, available } = taskTiming(task, bounds, now);
  const reached = task.reachedAt !== null || spent >= task.duration;
  const running = task.startedAt !== null && !reached && available;
  const paused = !running && !reached && spent > 0;
  let label: "Start" | "Pause" | "Continue" =
    task.spent === 0 ? "Start" : "Continue";
  if (running) {
    label = "Pause";
  }
  return { spent, reached, running, paused, label, available };
}

export type TaskState = ReturnType<typeof getTaskState>;
interface TaskEntry {
  task: TimerTask;
  state: TaskState;
}

function taskOrder(state: TaskState) {
  if (!state.available || state.reached) {
    return 3;
  }
  if (state.running) {
    return 0;
  }
  return state.paused ? 1 : 2;
}

function compareTasks(first: TaskEntry, second: TaskEntry) {
  return (
    taskOrder(first.state) - taskOrder(second.state) ||
    second.state.spent / second.task.duration -
      first.state.spent / first.task.duration
  );
}

function countState(
  counts: { running: number; paused: number; ready: number },
  state: TaskState
) {
  if (state.reached) {
    return;
  }
  if (state.running) {
    counts.running += 1;
  } else if (state.paused) {
    counts.paused += 1;
  } else {
    counts.ready += 1;
  }
}

export function getTaskCounts(tasks: TimerTask[], date: string, now: number) {
  const bounds = timerDayBounds(date);
  const counts = { running: 0, paused: 0, ready: 0 };
  for (const task of tasks) {
    countState(counts, getTaskState(task, date, now, bounds));
  }
  return counts;
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
  const counts = { running: 0, paused: 0, ready: 0 };
  for (const task of tasks) {
    const entry = { task, state: getTaskState(task, date, now, bounds) };
    if (isDailyTask(task) || !entry.state.reached) {
      visible.push(entry);
    }
    if (entry.state.reached) {
      completed.push(entry);
    } else {
      active.push(entry);
    }
    countState(counts, entry.state);
  }
  active.sort(compareTasks);
  completed.sort(compareTasks);
  visible.sort(compareTasks);
  return {
    active,
    completed: completed.map(({ task }) => task),
    visible,
    counts,
  };
}
