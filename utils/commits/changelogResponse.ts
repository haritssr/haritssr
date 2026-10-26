import type { ActivityBucket, ChangelogCommit } from "./changelog";
import type { ChangelogResult } from "./changelogTypes";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isCommit(value: unknown): value is ChangelogCommit {
  return (
    isRecord(value) &&
    typeof value.hash === "string" &&
    typeof value.date === "string" &&
    typeof value.subject === "string"
  );
}

function isBucket(value: unknown): value is ActivityBucket {
  return (
    isRecord(value) &&
    typeof value.key === "string" &&
    typeof value.label === "string" &&
    typeof value.description === "string" &&
    typeof value.count === "number" &&
    (value.period === "day" || value.period === "month")
  );
}

function isBusiest(value: unknown): boolean {
  return (
    value === undefined ||
    (Array.isArray(value) &&
      value.length === 2 &&
      typeof value[0] === "string" &&
      typeof value[1] === "number")
  );
}

function isResult(value: unknown): value is ChangelogResult {
  return (
    isRecord(value) &&
    Array.isArray(value.commits) &&
    value.commits.every(isCommit) &&
    typeof value.total === "number" &&
    typeof value.activeDays === "number" &&
    typeof value.firstDay === "string" &&
    typeof value.lastDay === "string" &&
    Array.isArray(value.buckets) &&
    value.buckets.every(isBucket) &&
    isBusiest(value.busiest)
  );
}

export function parseChangelogResult(value: unknown): ChangelogResult {
  if (!isResult(value)) {
    throw new Error("Commit history response is invalid.");
  }
  return value;
}
