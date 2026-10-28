import { useEffect, useState } from "react";

import type { TimerSnapshot } from "@/app/(tools)/timer/utils/timer";
import { timerDisplayDelay } from "@/app/(tools)/timer/utils/timerClock";

// Keep live progress updates local to the display, outside the shared provider.
export default function useTimerClock(
  snapshot: TimerSnapshot | undefined,
  clockOffset: number,
  enabled = true
) {
  const [now, setNow] = useState(() => Date.now());
  const ticking =
    enabled &&
    (snapshot?.day.tasks.some((task) => task.startedAt !== null) ?? false);

  useEffect(() => {
    if (!ticking) {
      return () => {
        /* No display clock while hidden or idle. */
      };
    }
    let timeout = 0;
    const tick = () => {
      window.clearTimeout(timeout);
      if (document.hidden) {
        return;
      }
      const timestamp = Date.now();
      setNow(timestamp);
      timeout = window.setTimeout(
        tick,
        timerDisplayDelay(timestamp, clockOffset)
      );
    };
    tick();
    document.addEventListener("visibilitychange", tick);
    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [clockOffset, ticking]);

  return Math.max(now + clockOffset, Date.parse(snapshot?.now ?? "") || 0);
}
