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

export type TimerView = "day" | "week" | "month" | "year";

/** Monday that starts the week containing `date`. */
export function weekStart(date: string) {
  const weekday = new Date(`${date}T00:00:00Z`).getUTCDay();
  return shiftTimerDate(date, -((weekday + 6) % 7));
}

/** Monday-to-Sunday dates of the week containing `date`. */
export function weekDates(date: string) {
  const start = weekStart(date);
  return Array.from({ length: 7 }, (_, index) => shiftTimerDate(start, index));
}

/** Week range heading, e.g. `Nov 2 – 8, 2026`. */
export function weekRangeLabel(date: string) {
  const start = weekStart(date);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "short",
    day: "numeric",
  }).formatRange(
    new Date(`${start}T00:00:00Z`),
    new Date(`${shiftTimerDate(start, 6)}T00:00:00Z`)
  );
}

export function monthCells(month: string) {
  const dates = monthDates(month);
  const leading = (new Date(`${month}-01T00:00:00Z`).getUTCDay() + 6) % 7;
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
    const stored = byDate.get(date);
    if (stored !== undefined || date <= today) {
      return stored ?? createEmptyTimerDay(date);
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

/** Date that identifies the period shown by `view`. */
export function viewPeriodDate(
  view: TimerView,
  month: string,
  week: string,
  selectedDate: string
) {
  if (view === "month" || view === "year") {
    return month;
  }
  return view === "week" ? week : selectedDate;
}

/** Loading text naming what is being fetched for the current calendar view. */
export function calendarLoadingLabel(view: TimerView, date: string) {
  if (view === "month") {
    return `Loading scheduled tasks for ${calendarDateLabel(`${date.slice(0, 7)}-01`, true)}…`;
  }
  return view === "week"
    ? `Loading scheduled tasks for ${weekRangeLabel(date)}…`
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

/** Compact heading for mobile, e.g. `Wed, Nov 4, 2026`. */
export function shortDateLabel(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short",
  }).format(new Date(`${date}T00:00:00Z`));
}
