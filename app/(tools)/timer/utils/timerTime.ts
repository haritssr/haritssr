// Formatting and parsing for minutes since Jakarta midnight (0–1440).
import type { Period } from "./timer";

const pad = (value: number) => String(value).padStart(2, "0");

/** `08:30`; midnight at the end of the day stays `24:00` for timeline labels. */
export function timelineTime(minutes: number) {
  return `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;
}

/** `08:30` for `<input type="time">`, wrapping `24:00` to `00:00`. */
export function inputTime(minutes: number) {
  return `${pad(Math.floor(minutes / 60) % 24)}:${pad(minutes % 60)}`;
}

/** Parses `HH:MM` to minutes, or `NaN` when invalid. */
function inputMinutes(value: unknown) {
  if (typeof value !== "string" || !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value)) {
    return Number.NaN;
  }
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

/** Parses From/Until inputs; an Until of `00:00` means midnight at day end. */
export function inputWindow(from: unknown, until: unknown) {
  const end = inputMinutes(until);
  return { from: inputMinutes(from), until: end === 0 ? 1440 : end };
}

export const SCHEDULED_WINDOW_MESSAGE =
  "Choose times in 15-minute increments, at least 15 minutes apart.";

/** Whether a window lies within one day, uses 15-minute steps and spans at least 15 minutes. */
export function isScheduledWindow({
  from,
  until,
}: {
  from: number;
  until: number;
}) {
  return (
    Number.isInteger(from) &&
    Number.isInteger(until) &&
    from >= 0 &&
    until <= 1440 &&
    until - from >= 15 &&
    from % 15 === 0 &&
    until % 15 === 0
  );
}

/** `08:00–09:30`, or an em dash without a window. */
export function windowRange(window: Period | null | undefined) {
  return window === null || window === undefined
    ? "—"
    : `${timelineTime(window.from)}–${timelineTime(window.until)}`;
}

function compactTime(minutes: number) {
  const hour = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return `${hour}${remainder === 0 ? "" : `:${pad(remainder)}`}`;
}

/** Compact task-card window, e.g. `18/19:30`. */
export function formatPeriod(window: Period | null | undefined) {
  return window === null || window === undefined
    ? undefined
    : `${compactTime(window.from)}/${compactTime(window.until)}`;
}

function cardTime(minutes: number, showPeriod = true) {
  const hour = Math.floor(minutes / 60) % 24;
  const minute = minutes % 60;
  const time = `${hour % 12 || 12}${minute === 0 ? "" : `.${pad(minute)}`}`;
  const period = hour < 12 ? "am" : "pm";
  return `${time}${showPeriod ? period : ""}`;
}

/** Timeline card range, e.g. `8-8.30am` or `11am-1pm`. */
export function cardTimeRange(from: number, until: number) {
  const samePeriod = Math.floor(from / 720) % 2 === Math.floor(until / 720) % 2;
  return `${cardTime(from, !samePeriod)}-${cardTime(until)}`;
}
