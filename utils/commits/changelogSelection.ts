import { isCalendarDate } from "@/utils/calendar";

import type { ChangelogPeriod } from "./changelog";
import { changeTypes } from "./changelog";
import type { ChangelogSelection } from "./changelogTypes";

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

export function parseChangelogSelection(
  params: URLSearchParams,
  initialDay: string
): ChangelogSelection {
  const period = params.get("period") ?? "day";
  const date = params.get("date") ?? initialDay;
  const validDate =
    isCalendarDate(date) && date >= "0001-01-01" && date <= "9998-12-31";
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
