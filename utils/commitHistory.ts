import "server-only";
import history from "@/app/commits/changelog.json";

import {
  activityBuckets,
  commitDay,
  filterCommits,
  prepareCommits,
} from "./changelog";
import type {
  ActivityBucket,
  ChangelogCommit,
  ChangelogPeriod,
} from "./changelog";

const prepared = prepareCommits(history.commits);
const lastDay = prepared[0]?.day ?? "2021-09-21";
const firstDay = prepared.at(-1)?.day ?? lastDay;

export interface ChangelogSelection {
  period: ChangelogPeriod;
  anchor: string;
  type: string;
  query: string;
  limit: number;
}

export interface ChangelogResult {
  commits: readonly ChangelogCommit[];
  total: number;
  activeDays: number;
  busiest?: readonly [string, number];
  buckets: ActivityBucket[];
  firstDay: string;
  lastDay: string;
}

export function getChangelogResult(
  selection: ChangelogSelection
): ChangelogResult {
  const matched = filterCommits(
    prepared,
    selection.period,
    selection.anchor,
    selection.type,
    selection.query
  );
  const days = new Map<string, number>();
  for (const commit of matched) {
    days.set(commit.day, (days.get(commit.day) ?? 0) + 1);
  }
  const [busiest] = [...days].toSorted(
    (a, b) => b[1] - a[1] || b[0].localeCompare(a[0])
  );
  return {
    commits: matched.slice(0, selection.limit).map(({ commit }) => commit),
    total: matched.length,
    activeDays: days.size,
    busiest,
    buckets: activityBuckets(
      matched,
      selection.period,
      selection.anchor,
      firstDay,
      lastDay
    ),
    firstDay,
    lastDay,
  };
}

export const changelogSummary = {
  count: history.commits.length,
  firstDay: commitDay(history.commits.at(-1)?.date ?? `${firstDay}T00:00:00Z`),
  lastDay,
};
