import type { Period } from "./timer";

/** The 6-hour timeline shows the day as four pages of this many minutes. */
export const PAGE_MINUTES = 360;
export const PAGE_COUNT = 4;

/** Minutes shown by page `0` (00:00–06:00) to `3` (18:00–24:00). */
export function pagePeriod(page: number): Period {
  return { from: page * PAGE_MINUTES, until: (page + 1) * PAGE_MINUTES };
}

/** Pages from 06:00 to 18:00 are daytime; the rest are night. */
export function isDaytime(period: Period) {
  return period.from >= 360 && period.until <= 1080;
}

/** The page holding `minute`, or null outside the day. */
export function pageAt(minute: number) {
  return minute >= 0 && minute < 1440
    ? Math.floor(minute / PAGE_MINUTES)
    : null;
}

/** Whether a task from `from` to `until` overlaps the visible `view`. */
export function overlapsView(from: number, until: number, view: Period) {
  return until > view.from && from < view.until;
}
