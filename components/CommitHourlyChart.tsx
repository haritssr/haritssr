import CommitActivityChart from "@/components/CommitActivityChart";
import { activityBuckets } from "@/utils/changelog";
import type { ChangelogCommit } from "@/utils/changelog";

export default function CommitHourlyChart({
  commits,
  day,
}: {
  commits: readonly ChangelogCommit[];
  day: string;
}) {
  return (
    <CommitActivityChart
      buckets={activityBuckets(commits, "day", day, day, day)}
      title="Commits by hour"
      subtitle={`${day} · Jakarta time (WIB)`}
      axisLabel="Hour (WIB)"
      hourly
    />
  );
}
