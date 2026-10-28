import { useEffect, useState } from "react";

import type { TimerSnapshot } from "@/app/(tools)/timer/utils/timer";
import { timerNextDisplayAt } from "@/app/(tools)/timer/utils/timerClock";

// Keep progress ticks and idle availability boundaries local to the display.
export default function useTimerClock(
  snapshot: TimerSnapshot | undefined,
  clockOffset: number,
  enabled = true
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
    let timeout = 0;
    function tick() {
      window.clearTimeout(timeout);
      if (document.hidden) {
        return;
      }
      const timestamp = Date.now();
      setNow(timestamp);
      const serverNow = timestamp + clockOffset;
      const next = timerNextDisplayAt(tasks, date, serverNow);
      if (Number.isFinite(next)) {
        timeout = window.setTimeout(
          tick,
          Math.max(1, Math.ceil(next - serverNow))
        );
      }
    }
    tick();
    document.addEventListener("visibilitychange", tick);
    window.addEventListener("focus", tick);
    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener("visibilitychange", tick);
      window.removeEventListener("focus", tick);
    };
  }, [clockOffset, enabled, day]);

  return Math.max(now + clockOffset, Date.parse(snapshot?.now ?? "") || 0);
}
