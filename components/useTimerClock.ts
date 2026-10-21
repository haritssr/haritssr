import { useEffect, useState } from "react";

import type { TimerSnapshot } from "@/utils/timer";

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
    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => {
      window.clearInterval(interval);
    };
  }, [ticking]);

  return Math.max(now + clockOffset, Date.parse(snapshot?.now ?? "") || 0);
}
