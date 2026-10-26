import { activityBuckets, filterCommits } from "./changelog";
import type { PreparedCommit } from "./changelog";
import type { ChangelogResult, ChangelogSelection } from "./changelogTypes";

export function summarizeCommits(
  prepared: readonly PreparedCommit[],
  selection: ChangelogSelection,
  firstDay: string,
  lastDay: string
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
