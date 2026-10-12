export interface ChangelogCommit {
  hash: string;
  date: string;
  subject: string;
}

export type ChangelogPeriod = "all" | "day" | "week" | "month" | "year";

export const changeTypes = [
  { value: "feat", label: "Features" },
  { value: "fix", label: "Fixes" },
  { value: "refactor", label: "Refactors" },
  { value: "style", label: "Style" },
  { value: "perf", label: "Performance" },
  { value: "docs", label: "Documentation" },
  { value: "chore", label: "Maintenance" },
  { value: "test", label: "Tests" },
  { value: "other", label: "Other" },
] as const;

const DAY_MS = 86_400_000;
const JAKARTA_OFFSET_MS = 7 * 3_600_000;
const conventionalSubject = /^(?<type>\w+)(?:\([^)]*\))?!?:\s/u;
const shortMonthFormatter = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  year: "2-digit",
  timeZone: "UTC",
});
const longMonthFormatter = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const dayFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function commitDay(date: string): string {
  return new Date(new Date(date).getTime() + JAKARTA_OFFSET_MS)
    .toISOString()
    .slice(0, 10);
}

export function formatDay(day: string): string {
  return dayFormatter.format(new Date(`${day}T00:00:00Z`));
}

function calendarDate(day: string): Date {
  return new Date(`${day}T00:00:00Z`);
}

function dateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function shiftDay(day: string, days: number): string {
  return dateKey(new Date(calendarDate(day).getTime() + days * DAY_MS));
}

export function shiftPeriod(
  day: string,
  period: ChangelogPeriod,
  delta: number
): string {
  const date = calendarDate(day);
  if (period === "year") {
    return `${date.getUTCFullYear() + delta}-01-01`;
  }
  if (period === "month") {
    date.setUTCDate(1);
    date.setUTCMonth(date.getUTCMonth() + delta);
    return dateKey(date);
  }
  return shiftDay(day, delta * (period === "week" ? 7 : 1));
}

export function periodRange(
  period: ChangelogPeriod,
  anchor: string
): { start: string; end: string } | null {
  if (period === "all") {
    return null;
  }
  if (period === "day") {
    return { start: anchor, end: anchor };
  }
  if (period === "week") {
    const weekday = calendarDate(anchor).getUTCDay();
    const start = shiftDay(anchor, -((weekday + 6) % 7));
    return { start, end: shiftDay(start, 6) };
  }
  if (period === "month") {
    const start = `${anchor.slice(0, 7)}-01`;
    return { start, end: shiftDay(shiftPeriod(start, "month", 1), -1) };
  }
  return {
    start: `${anchor.slice(0, 4)}-01-01`,
    end: `${anchor.slice(0, 4)}-12-31`,
  };
}

function commitType(subject: string): string {
  const type = conventionalSubject.exec(subject)?.groups?.type?.toLowerCase();
  return changeTypes.some((entry) => entry.value === type)
    ? (type ?? "other")
    : "other";
}

export function filterCommits(
  commits: readonly ChangelogCommit[],
  period: ChangelogPeriod,
  anchor: string,
  type: string,
  query: string
): ChangelogCommit[] {
  const range = periodRange(period, anchor);
  const words = query.trim().toLowerCase().split(/\s+/u).filter(Boolean);
  return commits.filter((commit) => {
    const day = commitDay(commit.date);
    return (
      (!range || (day >= range.start && day <= range.end)) &&
      (type === "all" || commitType(commit.subject) === type) &&
      words.every((word) =>
        `${commit.subject} ${commit.hash}`.toLowerCase().includes(word)
      )
    );
  });
}

export interface ActivityBucket {
  key: string;
  label: string;
  description: string;
  count: number;
  period: "day" | "month";
}

export function activityBuckets(
  commits: readonly ChangelogCommit[],
  period: ChangelogPeriod,
  anchor: string,
  firstDay: string,
  lastDay: string
): ActivityBucket[] {
  const range = periodRange(period, anchor);
  const monthly = period === "all" || period === "year";
  const hourly = period === "day";
  const counts = new Map<string, number>();
  for (const commit of commits) {
    const day = commitDay(commit.date);
    let key = monthly ? day.slice(0, 7) : day;
    if (hourly) {
      key = String(
        new Date(
          new Date(commit.date).getTime() + JAKARTA_OFFSET_MS
        ).getUTCHours()
      );
    }
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  if (hourly) {
    return Array.from({ length: 24 }, (_, hour) => ({
      key: String(hour),
      label: `${String(hour).padStart(2, "0")}:00`,
      description: `${String(hour).padStart(2, "0")}:00–${String(hour).padStart(2, "0")}:59 WIB`,
      count: counts.get(String(hour)) ?? 0,
      period: "day",
    }));
  }
  const start = range?.start ?? firstDay;
  const end = range?.end ?? lastDay;
  const buckets: ActivityBucket[] = [];
  for (
    let day = monthly ? `${start.slice(0, 7)}-01` : start;
    day <= end;
    day = monthly ? shiftPeriod(day, "month", 1) : shiftDay(day, 1)
  ) {
    const key = monthly ? day.slice(0, 7) : day;
    buckets.push({
      key: day,
      label: monthly
        ? shortMonthFormatter.format(calendarDate(day))
        : day.slice(8),
      description: monthly
        ? longMonthFormatter.format(calendarDate(day))
        : formatDay(day),
      count: counts.get(key) ?? 0,
      period: monthly ? "month" : "day",
    });
  }
  return buckets;
}
