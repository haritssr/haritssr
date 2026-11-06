import { useEffect, useState } from "react";

import type { TimerSnapshot } from "@/app/(tools)/timer/utils/timer";
import {
  subscribeWake,
  timerNextDisplayAt,
} from "@/app/(tools)/timer/utils/timerClock";

// Keep progress ticks and idle availability boundaries local to the display.
export default function useTimerClock(
  snapshot: TimerSnapshot | undefined,
  clockOffset: number,
  enabled = true,
  maximumDelay = Infinity
) {
  const [now, setNow] = useState(() => Date.now());
  const day = snapshot?.day;

  useEffect(() => {
    if (!enabled || day === undefined) {
      return () => {
        /* No display scheduling while disabled. */
      };
    }
    const { tasks, date } = day;
    function tick() {
      const timestamp = Date.now();
      setNow(timestamp);
      const serverNow = timestamp + clockOffset;
      const next = Math.min(
        timerNextDisplayAt(tasks, date, serverNow),
        Number.isFinite(maximumDelay)
          ? serverNow + maximumDelay - (serverNow % maximumDelay)
          : Infinity
      );
      return Number.isFinite(next)
        ? Math.max(1, Math.ceil(next - serverNow))
        : null;
    }
    return subscribeWake(tick).stop;
  }, [clockOffset, enabled, day, maximumDelay]);

  return Math.max(now + clockOffset, Date.parse(snapshot?.now ?? "") || 0);
}
