import CommitActivityChart from "@/app/(tools)/commits/_components/CommitActivityChart";
import { activityBuckets, prepareCommits } from "@/utils/commits/changelog";
import type { ChangelogCommit } from "@/utils/commits/changelog";

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
