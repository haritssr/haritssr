import { taskTiming, taskCompletionTime, timerDayBounds } from "./timer";
import type { TimerTask } from "./timer";
import { taskDeadline } from "./timerDeadline";

export const TIMER_REQUEST_STARTED_HEADER = "X-Timer-Request-Started-At";
export const TIMER_RESPONSE_TIME_HEADER = "X-Timer-Server-Time";

export interface TimerResponseTiming {
  receivedAt: number;
  elapsed: number;
  serverReceivedAt: number | null;
}

export function timerClockOffset(now: string, timing: TimerResponseTiming) {
  const serverNow = Date.parse(now);
  const offset = serverNow - timing.receivedAt;
  if (
    timing.serverReceivedAt === null ||
    !Number.isFinite(timing.serverReceivedAt) ||
    !Number.isFinite(timing.elapsed) ||
    timing.elapsed < 0 ||
    timing.serverReceivedAt > serverNow
  ) {
    return offset;
  }
  // Snapshot time is stamped after server work, so only transport belongs in
  // the round-trip estimate; database and authentication time must not bias it.
  const processing = serverNow - timing.serverReceivedAt;
  const travel = Math.max(0, timing.elapsed - processing);
  return offset + travel / 2;
}

function timerDisplayDelay(now: number, clockOffset: number) {
  const phase = (((now + clockOffset) % 1000) + 1000) % 1000;
  return Math.max(1, Math.ceil(1000 - phase));
}

// Absolute server-time deadline; no polling or per-second timer while idle.
export function timerNextDisplayAt(
  tasks: TimerTask[],
  date: string,
  now: number
) {
  const bounds = timerDayBounds(date);
  let next = bounds.end > now ? bounds.end : Infinity;
  for (const task of tasks) {
    next = Math.min(next, taskDeadline(task, bounds, now).nextAt);
    const timing = taskTiming(task, bounds, now);
    if (timing.opensAt > now) {
      next = Math.min(next, timing.opensAt);
    }
    if (timing.closesAt > now) {
      next = Math.min(next, timing.closesAt);
    }
    if (
      task.startedAt !== null &&
      task.reachedAt === null &&
      timing.available &&
      timing.spent < task.duration
    ) {
      next = Math.min(
        next,
        now + timerDisplayDelay(now, 0),
        taskCompletionTime(task)
      );
    }
  }
  return next;
}

/**
 * Runs `scan` now and again whenever it asks, until the returned function is
 * called. `scan` returns the delay in milliseconds until its next run, or null
 * to wait. Focus and tab visibility also rescan, because timers are throttled
 * or paused while a tab is hidden. Hidden tabs skip the scan unless
 * `whenHidden` is set. The returned `wake` rescans on demand.
 */
export function subscribeWake(
  scan: () => number | null,
  { whenHidden = false }: { whenHidden?: boolean } = {}
) {
  let timeout = 0;
  let stopped = false;
  function wake() {
    window.clearTimeout(timeout);
    if (stopped || (document.hidden && !whenHidden)) {
      return;
    }
    const delay = scan();
    // A scan may have rescheduled itself while it ran.
    window.clearTimeout(timeout);
    if (!stopped && delay !== null && Number.isFinite(delay)) {
      timeout = window.setTimeout(wake, delay);
    }
  }
  window.addEventListener("focus", wake);
  document.addEventListener("visibilitychange", wake);
  wake();
  return {
    wake,
    stop: () => {
      stopped = true;
      window.clearTimeout(timeout);
      window.removeEventListener("focus", wake);
      document.removeEventListener("visibilitychange", wake);
    },
  };
}
