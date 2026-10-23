import type { ChangelogPeriod } from "./changelog";
import { changeTypes } from "./changelog";
import type { ChangelogSelection } from "./commitHistory";

const periods: readonly ChangelogPeriod[] = [
  "all",
  "day",
  "week",
  "month",
  "year",
];

function isPeriod(value: string): value is ChangelogPeriod {
  return periods.some((period) => period === value);
}
const datePattern = /^\d{4}-\d{2}-\d{2}$/u;

export function parseChangelogSelection(
  params: URLSearchParams,
  initialDay: string
): ChangelogSelection {
  const period = params.get("period") ?? "day";
  const date = params.get("date") ?? initialDay;
  const validDate =
    datePattern.test(date) &&
    date >= "0001-01-01" &&
    date <= "9998-12-31" &&
    Number.isFinite(Date.parse(`${date}T00:00:00Z`)) &&
    new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) === date;
  const type = params.get("type") ?? "all";
  const limit = Number(params.get("limit") ?? 50);
  return {
    period: isPeriod(period) ? period : "day",
    anchor: validDate ? date : initialDay,
    type: changeTypes.some((entry) => entry.value === type) ? type : "all",
    query: (params.get("q") ?? "").slice(0, 200),
    limit: Number.isInteger(limit) ? Math.min(5000, Math.max(50, limit)) : 50,
  };
}

export function changelogParams(
  selection: ChangelogSelection
): URLSearchParams {
  return new URLSearchParams({
    period: selection.period,
    date: selection.anchor,
    type: selection.type,
    q: selection.query,
    limit: String(selection.limit),
  });
}
