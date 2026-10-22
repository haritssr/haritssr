import CommitActivityChart from "@/app/commits/_components/CommitActivityChart";
import { activityBuckets, prepareCommits } from "@/utils/changelog";
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
      buckets={activityBuckets(prepareCommits(commits), "day", day, day, day)}
      title="Commits by hour"
      subtitle={`${day} · Jakarta time (WIB)`}
      axisLabel="Hour (WIB)"
      hourly
    />
  );
}
