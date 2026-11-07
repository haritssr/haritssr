import type { Period } from "./timer";

/** Whether a task from `from` to `until` overlaps the visible `view`. */
export function overlapsView(from: number, until: number, view: Period) {
  return until > view.from && from < view.until;
}

/** Rem of timeline height per hour, shared by every timeline mode. */
export const HOUR_REM = 160 / 24;

/** Minutes of context kept above the current time when the follow-now frame opens. */
export const FOLLOW_LEAD_MINUTES = 30;
