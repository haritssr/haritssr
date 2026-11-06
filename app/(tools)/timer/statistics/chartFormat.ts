const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Compact duration for chart labels, such as "1h 20m" or "45m". */
export function formatHours(seconds: number) {
  const minutes = Math.round(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) {
    return `${rest}m`;
  }
  return rest === 0 ? `${hours}h` : `${hours}h ${rest}m`;
}

/** Monday-first weekday index (0 = Mon) of a `YYYY-MM-DD` date. */
export function weekdayIndex(date: string) {
  return (new Date(`${date}T00:00:00Z`).getUTCDay() + 6) % 7;
}

export function weekdayName(date: string) {
  return WEEKDAYS[new Date(`${date}T00:00:00Z`).getUTCDay()] ?? "";
}

/** "5 Nov" for a `YYYY-MM-DD` date. */
export function shortDate(date: string) {
  return `${Number(date.slice(8))} ${MONTHS[Number(date.slice(5, 7)) - 1] ?? ""}`;
}
