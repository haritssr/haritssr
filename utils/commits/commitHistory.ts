import "server-only";
import { unstable_cache } from "next/cache";
import { cache } from "react";

import { activityBuckets, filterCommits, prepareCommits } from "./changelog";
import type {
  ActivityBucket,
  ChangelogCommit,
  ChangelogPeriod,
} from "./changelog";
import { readCommitCount, readCommitHistory } from "./commitsDatabase";

export const getCommitCount = cache(
  unstable_cache(readCommitCount, ["turso-commit-count-v1"], {
    revalidate: 86_400,
  })
);

export const getCommitHistory = cache(
  unstable_cache(readCommitHistory, ["turso-commits-v1"], {
    revalidate: 86_400,
  })
);

const getPreparedHistory = cache(async () => {
  const commits = await getCommitHistory();
  const prepared = prepareCommits(commits);
  const lastDay = prepared[0]?.day ?? "2021-09-21";
  const firstDay = prepared.at(-1)?.day ?? lastDay;
  return { prepared, lastDay, firstDay };
});

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

export async function getChangelogResult(
  selection: ChangelogSelection
): Promise<ChangelogResult> {
  const { prepared, firstDay, lastDay } = await getPreparedHistory();
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

export async function getChangelogSummary() {
  const { prepared, firstDay, lastDay } = await getPreparedHistory();
  return { count: prepared.length, firstDay, lastDay };
}
