import { useEffect } from "react";

import {
  canUseTimer,
  taskCompletionTime,
  timerMidnight,
  taskTransitionTime,
  taskWindowEnd,
} from "@/app/(tools)/timer/utils/timer";
import type {
  TimerNotice,
  TimerSnapshot,
} from "@/app/(tools)/timer/utils/timer";

export default function useTimerSchedule(
  snapshot: TimerSnapshot | undefined,
  clockOffset: number,
  refresh: () => Promise<unknown>,
  onCompletion: (notice: TimerNotice) => void
) {
  useEffect(() => {
    if (!canUseTimer(snapshot)) {
      return () => {
        /* No scheduled work in the read-only preview. */
      };
    }
    let finish = timerMidnight(snapshot.today);
    for (const task of snapshot.day.tasks) {
      finish = Math.min(finish, taskTransitionTime(task, snapshot.today));
    }
    const timeout = window.setTimeout(
      () => {
        const now = Date.now() + clockOffset;
        for (const task of snapshot.day.tasks) {
          if (
            task.notifiedAt === null &&
            taskCompletionTime(task) <=
              Math.min(now, taskWindowEnd(task, snapshot.today))
          ) {
            onCompletion({
              date: snapshot.today,
              taskId: task.id,
              activity: task.activity,
            });
          }
        }
        void refresh();
      },
      Math.max(100, finish - Date.now() - clockOffset + 50)
    );
    return () => {
      window.clearTimeout(timeout);
    };
  }, [snapshot, clockOffset, refresh, onCompletion]);
}
