import CommitHourlyChart from "@/components/CommitHourlyChart";
import CommitTable from "@/components/CommitTable";
import ExternalLink from "@/components/ExternalLink";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import history from "@/data/changelog.json";
import analysis from "@/data/commit-analysis-2026-10-14.json";
import { commitAnalysisRoute } from "@/data/routes";
import { commitDay, countCommitTypes, formatDay } from "@/utils/changelog";
import { createPageMetadata } from "@/utils/pageMetadata";
import { SOURCE_CODE_URL } from "@/utils/site";

export const metadata = createPageMetadata({
  title: commitAnalysisRoute.title,
  description: commitAnalysisRoute.description,
  path: commitAnalysisRoute.route,
});

const reviewedHashes = new Set(
  analysis.groups.flatMap((group) => group.hashes)
);
const commits = history.commits.filter(
  (commit) =>
    commitDay(commit.date) === analysis.date && reviewedHashes.has(commit.hash)
);
const typeCounts = countCommitTypes(commits).filter(({ count }) => count > 0);

export default function CommitAnalysisPage() {
  return (
    <>
      <PageHeader
        back={{ href: "/commits", name: "Commits" }}
        path={commitAnalysisRoute.route}
      >
        <PageTitle>{commitAnalysisRoute.title}</PageTitle>
        <PageDescription>
          {commits.length} commits reviewed for {formatDay(analysis.date)} ·
          Jakarta time (WIB)
        </PageDescription>
      </PageHeader>
      <div className="space-y-16">
        <Section id="overview" title="What changed">
          <div className="max-w-3xl space-y-5">
            <p>
              The most significant change is a common layout for science
              experiments. The day also adds two experiments and makes the home
              page a simpler entry point to the rest of the site.
            </p>
            <ul className="marker:text-muted list-disc space-y-2 pl-5">
              {typeCounts.map(({ value, count }) => (
                <li key={value}>
                  {value}: {count} commits
                </li>
              ))}
            </ul>
            <p className="text-muted">
              This review is based on commit messages and diffs, through{" "}
              <ExternalLink
                href={`${SOURCE_CODE_URL}/commit/${analysis.reviewedThrough}`}
                name={analysis.reviewedThrough.slice(0, 9)}
                size="inherit"
              />
              . It covers these committed changes only. Commit counts describe
              recorded activity, and do not establish implementation time or
              measured performance gains.
            </p>
          </div>
        </Section>
        {analysis.groups.map((group) => (
          <Section id={group.id} key={group.id} title={group.title}>
            <p className="max-w-3xl">{group.analysis}</p>
            <CommitTable
              caption={`Commits supporting ${group.title}`}
              commits={commits.filter((commit) =>
                group.hashes.includes(commit.hash)
              )}
            />
          </Section>
        ))}
        <Section id="activity" title="Commit activity">
          <CommitHourlyChart commits={commits} day={analysis.date} />
          <p className="text-muted max-w-3xl">
            Commits were recorded in two groups, around 11:15–11:16 and
            16:32–16:34 WIB. These timestamps show when changes were committed,
            rather than how long the work took.
          </p>
        </Section>
      </div>
    </>
  );
}
