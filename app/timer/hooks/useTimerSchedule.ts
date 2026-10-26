import { useEffect } from "react";

import {
  canUseTimer,
  taskCompletionTime,
  timerMidnight,
} from "@/app/timer/utils/timer";
import type { TimerSnapshot } from "@/app/timer/utils/timer";

export default function useTimerSchedule(
  snapshot: TimerSnapshot | undefined,
  clockOffset: number,
  refresh: () => Promise<unknown>
) {
  useEffect(() => {
    if (!canUseTimer(snapshot)) {
      return () => {
        /* No scheduled work in the read-only preview. */
      };
    }
    let finish = timerMidnight(snapshot.today);
    for (const task of snapshot.day.tasks) {
      finish = Math.min(finish, taskCompletionTime(task));
    }
    const timeout = window.setTimeout(
      () => {
        void refresh();
      },
      Math.max(100, finish - Date.now() - clockOffset + 50)
    );
    return () => {
      window.clearTimeout(timeout);
    };
  }, [snapshot, clockOffset, refresh]);
}
