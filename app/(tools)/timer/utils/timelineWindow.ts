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

/** Rem of timeline height per hour, shared by every timeline mode. */
export const HOUR_REM = 160 / 24;

/** Minutes of context kept above the current time when the follow-now frame opens. */
export const FOLLOW_LEAD_MINUTES = 30;

/** A 12-hour hour with its suffix, such as `6AM`. */
function hourLabel(minute: number) {
  const hour = Math.floor(minute / 60) % 24;
  return `${hour % 12 || 12}${hour < 12 ? "AM" : "PM"}`;
}

/** A compact range that drops the shared suffix: `1-6PM`, or `6AM-12PM` when suffixes differ. */
export function periodRange(period: Period) {
  const start = hourLabel(period.from);
  const end = hourLabel(period.until);
  const startSuffix = start.slice(-2);
  const endSuffix = end.slice(-2);
  if (startSuffix === endSuffix) {
    return `${start.slice(0, -2)}-${end}`;
  }
  return `${start}-${end}`;
}
