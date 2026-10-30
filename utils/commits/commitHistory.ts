import "server-only";
import { unstable_cache } from "next/cache";
import { cache } from "react";

import { prepareCommits } from "./changelog";
import { summarizeCommits } from "./changelogSummary";
import type { ChangelogResult, ChangelogSelection } from "./changelogTypes";
import { readCommitHistory } from "./commitsDatabase";

export const getCommitHistory = cache(
  unstable_cache(readCommitHistory, ["turso-commits-v2"], {
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

export async function getChangelogResult(
  selection: ChangelogSelection
): Promise<ChangelogResult> {
  const { prepared, firstDay, lastDay } = await getPreparedHistory();
  return summarizeCommits(prepared, selection, firstDay, lastDay);
}

export async function getChangelogSummary() {
  const { prepared, firstDay, lastDay } = await getPreparedHistory();
  return { count: prepared.length, firstDay, lastDay };
}
