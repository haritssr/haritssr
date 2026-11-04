import type { TimerTask } from "../utils/timer";

export function layoutTimelineTasks(tasks: TimerTask[]) {
  const scheduled = tasks
    .flatMap((task, order) => {
      const window = task.availabilityWindow;
      return window === null || window === undefined
        ? []
        : [
            {
              task,
              order,
              from: window.from,
              until: window.until,
              lane: 0,
              lanes: 1,
            },
          ];
    })
    .toSorted(
      (first, second) => first.from - second.from || first.order - second.order
    );
  let group: typeof scheduled = [];
  let ends: number[] = [];
  let groupEnd = -1;
  function finishGroup() {
    for (const entry of group) {
      entry.lanes = ends.length;
    }
    group = [];
    ends = [];
  }
  for (const entry of scheduled) {
    if (entry.from >= groupEnd) {
      finishGroup();
    }
    let lane = ends.findIndex((end) => end <= entry.from);
    if (lane === -1) {
      lane = ends.length;
    }
    ends[lane] = entry.until;
    entry.lane = lane;
    group.push(entry);
    groupEnd = Math.max(groupEnd, entry.until);
  }
  finishGroup();
  return scheduled;
}
