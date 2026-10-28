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

export function timerDisplayDelay(now: number, clockOffset: number) {
  const phase = (((now + clockOffset) % 1000) + 1000) % 1000;
  return Math.max(1, Math.ceil(1000 - phase));
}
