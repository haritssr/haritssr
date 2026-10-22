import ChangelogExplorer from "@/components/ChangelogExplorer";
import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import {
  commitAnalysisRoute,
  commitsRoute,
  modelSuitabilityRoute,
  october21AnalysisRoute,
  october22AnalysisRoute,
  todayModelSuitabilityRoute,
  weeklyChangelogRoute,
} from "@/data/routes";
import { formatDay } from "@/utils/changelog";
import { parseChangelogSelection } from "@/utils/changelogSelection";
import { changelogSummary, getChangelogResult } from "@/utils/commitHistory";
import { createPageMetadata } from "@/utils/pageMetadata";

export const metadata = createPageMetadata({
  title: commitsRoute.title,
  description: commitsRoute.description,
  path: commitsRoute.route,
});

export default function CommitsPage() {
  const { firstDay, lastDay, count } = changelogSummary;
  const initial = getChangelogResult(
    parseChangelogSelection(new URLSearchParams(), lastDay)
  );
  return (
    <>
      <PageHeader back={{ href: "/", name: "Home" }} path={commitsRoute.route}>
        <PageTitle>{commitsRoute.title}</PageTitle>
        <PageDescription>
          {new Intl.NumberFormat("en-US").format(count)} commits and counting,
          from {formatDay(firstDay)} to {formatDay(lastDay)} · Jakarta time
          (WIB)
        </PageDescription>
        <nav aria-label="Changelog">
          <InternalLink href={weeklyChangelogRoute.route}>
            {weeklyChangelogRoute.title}
          </InternalLink>
        </nav>
      </PageHeader>
      <div className="space-y-16">
        <ChangelogExplorer initial={initial} initialDay={lastDay} />
        <nav
          aria-label="Commit analyses"
          className="flex flex-col items-start gap-3"
        >
          <InternalLink href={modelSuitabilityRoute.route}>
            {modelSuitabilityRoute.title}
          </InternalLink>
          <InternalLink href={commitAnalysisRoute.route}>
            {commitAnalysisRoute.title}
          </InternalLink>
          <InternalLink href={todayModelSuitabilityRoute.route}>
            {todayModelSuitabilityRoute.title}
          </InternalLink>
          <InternalLink href={october21AnalysisRoute.route}>
            {october21AnalysisRoute.title}
          </InternalLink>
          <InternalLink href={october22AnalysisRoute.route}>
            {october22AnalysisRoute.title}
          </InternalLink>
        </nav>
      </div>
    </>
  );
}
