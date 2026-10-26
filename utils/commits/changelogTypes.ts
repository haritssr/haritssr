import type {
  ActivityBucket,
  ChangelogCommit,
  ChangelogPeriod,
} from "./changelog";

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
