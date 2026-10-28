import { timerMidnight } from "@/app/(tools)/timer/utils/timer";
import type { TimerTask } from "@/app/(tools)/timer/utils/timer";

import { getTaskCollection } from "./taskState";

function startedAt(task: TimerTask) {
  return Date.parse(task.lastStartedAt ?? task.startedAt ?? "") || 0;
}

export function getFloatingTasks(
  tasks: TimerTask[],
  date: string,
  now: number,
  retainedTaskId: string | null
) {
  if (now >= timerMidnight(date)) {
    return [];
  }
  return getTaskCollection(tasks, date, now)
    .active.filter(
      ({ task, state }) =>
        state.available &&
        (state.running || (state.paused && task.id === retainedTaskId))
    )
    .toSorted(
      (first, second) => startedAt(second.task) - startedAt(first.task)
    );
}
