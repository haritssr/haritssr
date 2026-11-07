import { formatDay } from "./changelog";
import type { PreparedCommit } from "./changelog";

/** Change types that get their own color; everything else folds into "other". */
export const INSIGHT_TYPES = [
  { value: "feat", label: "Features" },
  { value: "fix", label: "Fixes" },
  { value: "refactor", label: "Refactors" },
  { value: "style", label: "Style" },
  { value: "docs", label: "Documentation" },
  { value: "chore", label: "Maintenance" },
  { value: "other", label: "Other" },
] as const;

export type InsightType = (typeof INSIGHT_TYPES)[number]["value"];
export type TypeCounts = Record<InsightType, number>;

export interface MonthlyMix {
  key: string;
  label: string;
  description: string;
  total: number;
  counts: TypeCounts;
}

interface AreaCount {
  name: string;
  count: number;
}

export interface CommitInsights {
  total: number;
  activeDays: number;
  perActiveDay: number;
  busiest: { day: string; count: number } | undefined;
  longestStreak: { days: number; start: string; end: string } | undefined;
  lateNightShare: number;
  months: MonthlyMix[];
  typeTotals: TypeCounts;
  areas: AreaCount[];
  scoped: number;
  /** Rows Monday to Sunday, columns of three hours from 00:00. */
  rhythm: number[][];
}

export const RHYTHM_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;
export const RHYTHM_BLOCKS = [
  "00–03",
  "03–06",
  "06–09",
  "09–12",
  "12–15",
  "15–18",
  "18–21",
  "21–24",
] as const;

const DAY_MS = 86_400_000;
const AREA_LIMIT = 8;
const scopePattern = /^\w+\((?<scope>[^)]+)\)!?:\s/u;
const monthFormatter = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  year: "2-digit",
  timeZone: "UTC",
});
const longMonthFormatter = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function emptyCounts(): TypeCounts {
  return {
    feat: 0,
    fix: 0,
    refactor: 0,
    style: 0,
    docs: 0,
    chore: 0,
    other: 0,
  };
}

function isInsightType(type: string): type is InsightType {
  return INSIGHT_TYPES.some((entry) => entry.value === type);
}

function insightType(type: string): InsightType {
  return isInsightType(type) ? type : "other";
}

function dayNumber(day: string) {
  return Math.round(Date.parse(`${day}T00:00:00Z`) / DAY_MS);
}

function nextMonth(key: string) {
  const date = new Date(`${key}-01T00:00:00Z`);
  date.setUTCMonth(date.getUTCMonth() + 1);
  return date.toISOString().slice(0, 7);
}

function longestStreak(days: readonly string[]) {
  let best: { days: number; start: string; end: string } | undefined;
  let [start] = days;
  let length = 0;
  for (const [index, day] of days.entries()) {
    const previous = days[index - 1];
    if (previous !== undefined && dayNumber(day) - dayNumber(previous) === 1) {
      length += 1;
    } else {
      start = day;
      length = 1;
    }
    if (start !== undefined && (best === undefined || length > best.days)) {
      best = { days: length, start, end: day };
    }
  }
  return best;
}

function monthlyMix(
  counts: ReadonlyMap<string, TypeCounts>,
  firstDay: string,
  lastDay: string
) {
  const months: MonthlyMix[] = [];
  const last = lastDay.slice(0, 7);
  for (let key = firstDay.slice(0, 7); key <= last; key = nextMonth(key)) {
    const date = new Date(`${key}-01T00:00:00Z`);
    const monthCounts = counts.get(key) ?? emptyCounts();
    months.push({
      key,
      label: monthFormatter.format(date),
      description: longMonthFormatter.format(date),
      total: Object.values(monthCounts).reduce((sum, value) => sum + value, 0),
      counts: monthCounts,
    });
  }
  return months;
}

/** Everything the Commits insights show, from the whole history. */
export function commitInsights(
  prepared: readonly PreparedCommit[]
): CommitInsights {
  const dayCounts = new Map<string, number>();
  const monthCounts = new Map<string, TypeCounts>();
  const typeTotals = emptyCounts();
  const scopes = new Map<string, number>();
  const rhythm = RHYTHM_DAYS.map(() => RHYTHM_BLOCKS.map(() => 0));
  let lateNight = 0;
  let scoped = 0;

  for (const { commit, day, hour, type } of prepared) {
    dayCounts.set(day, (dayCounts.get(day) ?? 0) + 1);
    const group = insightType(type);
    typeTotals[group] += 1;
    const month = monthCounts.get(day.slice(0, 7)) ?? emptyCounts();
    month[group] += 1;
    monthCounts.set(day.slice(0, 7), month);
    const scope = scopePattern
      .exec(commit.subject)
      ?.groups?.scope?.trim()
      .toLowerCase();
    if (scope !== undefined && scope.length > 0) {
      scoped += 1;
      scopes.set(scope, (scopes.get(scope) ?? 0) + 1);
    }
    const weekday = (new Date(`${day}T00:00:00Z`).getUTCDay() + 6) % 7;
    const row = rhythm[weekday];
    const block = Math.floor(hour / 3);
    if (row?.[block] !== undefined) {
      row[block] += 1;
    }
    if (hour < 6) {
      lateNight += 1;
    }
  }

  const days = [...dayCounts.keys()].toSorted();
  const [busiestDay] = [...dayCounts].toSorted(
    (left, right) => right[1] - left[1] || right[0].localeCompare(left[0])
  );
  const [firstDay] = days;
  const lastDay = days.at(-1);
  return {
    total: prepared.length,
    activeDays: days.length,
    perActiveDay: days.length === 0 ? 0 : prepared.length / days.length,
    busiest:
      busiestDay === undefined
        ? undefined
        : { day: busiestDay[0], count: busiestDay[1] },
    longestStreak: longestStreak(days),
    lateNightShare: prepared.length === 0 ? 0 : lateNight / prepared.length,
    months:
      firstDay === undefined || lastDay === undefined
        ? []
        : monthlyMix(monthCounts, firstDay, lastDay),
    typeTotals,
    areas: [...scopes]
      .map(([name, count]) => ({ name, count }))
      .toSorted(
        (left, right) =>
          right.count - left.count || left.name.localeCompare(right.name)
      )
      .slice(0, AREA_LIMIT),
    scoped,
    rhythm,
  };
}

export function streakRange(streak: { start: string; end: string }) {
  return streak.start === streak.end
    ? formatDay(streak.start)
    : `${formatDay(streak.start)} – ${formatDay(streak.end)}`;
}
