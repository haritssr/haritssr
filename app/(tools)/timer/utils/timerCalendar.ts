import { createDailyTasks } from "./dailyTasks";
import type { DailyTaskDefinition } from "./dailyTasks";
import { createEmptyTimerDay, shiftTimerDate, validTimerDate } from "./timer";
import type { TimerDay } from "./timer";

export interface TimerCalendar {
  month: string;
  today: string;
  mode: "turso" | "demo";
  days: TimerDay[];
}

export function validTimerMonth(month: string) {
  return /^\d{4}-\d{2}$/.test(month) && validTimerDate(`${month}-01`);
}

export function monthDates(month: string) {
  const first = `${month}-01`;
  const date = new Date(`${first}T00:00:00Z`);
  date.setUTCMonth(date.getUTCMonth() + 1, 0);
  const length = date.getUTCDate();
  return Array.from({ length }, (_, index) => shiftTimerDate(first, index));
}

export function shiftTimerMonth(month: string, amount: number) {
  const date = new Date(`${month}-01T00:00:00Z`);
  date.setUTCMonth(date.getUTCMonth() + amount);
  return date.toISOString().slice(0, 7);
}

export function monthCells(month: string) {
  const dates = monthDates(month);
  const leading = new Date(`${month}-01T00:00:00Z`).getUTCDay();
  const count = Math.max(35, Math.ceil((leading + dates.length) / 7) * 7);
  return Array.from(
    { length: count },
    (_, index) => dates[index - leading] ?? null
  );
}

export function resolveCalendarDays(
  month: string,
  today: string,
  saved: TimerDay[],
  definitions: DailyTaskDefinition[]
) {
  const byDate = new Map(saved.map((day) => [day.date, day]));
  return monthDates(month).map((date) => {
    if (date <= today) {
      return byDate.get(date) ?? createEmptyTimerDay(date);
    }
    return {
      ...createEmptyTimerDay(date),
      tasks: createDailyTasks(definitions),
    };
  });
}

export function scheduledCalendarTasks(day: TimerDay | undefined) {
  return (day?.tasks ?? [])
    .filter((task) => task.period !== null && task.period !== undefined)
    .toSorted(
      (first, second) => (first.period?.from ?? 0) - (second.period?.from ?? 0)
    );
}

/** Loading text naming what is being fetched for the current calendar view. */
export function calendarLoadingLabel(
  view: "day" | "week" | "month" | "year",
  date: string
) {
  return view === "month"
    ? `Loading scheduled tasks for ${calendarDateLabel(`${date.slice(0, 7)}-01`, true)}…`
    : `Loading activities for ${date}…`;
}

export function calendarDateLabel(date: string, monthOnly = false) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    ...(monthOnly ? {} : { day: "numeric", weekday: "long" }),
  }).format(new Date(`${date}T00:00:00Z`));
}

/** ISO 8601 date with a short weekday, e.g. `2026-11-04, Wed`. */
export function isoDateLabel(date: string) {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    weekday: "short",
  }).format(new Date(`${date}T00:00:00Z`));
  return `${date}, ${weekday}`;
}
