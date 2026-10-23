import type { ComponentProps } from "react";

import CommitHourlyChart from "@/app/commits/_components/CommitHourlyChart";
import CommitModelSuitability from "@/app/commits/_components/CommitModelSuitability";
import CommitTable from "@/app/commits/_components/CommitTable";
import history from "@/app/commits/changelog.json";
import ExternalLink from "@/components/ExternalLink";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import type { RouteDoc } from "@/data/routes";
import {
  commitDay,
  countCommitTypes,
  formatDay,
} from "@/utils/commits/changelog";
import { SOURCE_CODE_URL } from "@/utils/metadata/site";

interface Analysis {
  date: string;
  reviewedThrough: string;
  overview: string;
  groups: { id: string; title: string; analysis: string; hashes: string[] }[];
}

export default function DatedCommitAnalysis({
  analysis,
  route,
  suitability,
}: {
  analysis: Analysis;
  route: RouteDoc;
  suitability: ComponentProps<typeof CommitModelSuitability>["suitability"];
}) {
  const reviewedHashes = new Set(
    analysis.groups.flatMap((group) => group.hashes)
  );
  const commits = history.commits.filter(
    (commit) =>
      commitDay(commit.date) === analysis.date &&
      reviewedHashes.has(commit.hash)
  );
  const typeCounts = countCommitTypes(commits).filter(({ count }) => count > 0);

  return (
    <>
      <PageHeader
        back={{ href: "/commits", name: "Commits" }}
        path={route.route}
      >
        <PageTitle>{route.title}</PageTitle>
        <PageDescription>
          {commits.length} commits reviewed for {formatDay(analysis.date)} ·
          Jakarta time (WIB)
        </PageDescription>
      </PageHeader>
      <div className="space-y-16">
        <Section id="overview" title="What changed">
          <div className="max-w-3xl space-y-5">
            <p>{analysis.overview}</p>
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
        <CommitModelSuitability commits={commits} suitability={suitability} />
        <Section id="activity" title="Commit activity">
          <CommitHourlyChart commits={commits} day={analysis.date} />
          <p className="text-muted max-w-3xl">
            Activity uses committed timestamps in Jakarta time. It shows when
            changes were recorded, rather than how long the work took.
          </p>
        </Section>
      </div>
    </>
  );
}
