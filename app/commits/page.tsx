import { connection } from "next/server";

import history from "@/app/commits/changelog.json";
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
} from "@/data/routes";
import { commitDay, formatDay } from "@/utils/changelog";
import { createPageMetadata } from "@/utils/pageMetadata";

export const metadata = createPageMetadata({
  title: commitsRoute.title,
  description: commitsRoute.description,
  path: commitsRoute.route,
});

export default async function CommitsPage() {
  await connection();
  // oxlint-disable-next-line react/purity -- Request-time server date is passed to the client for consistent hydration.
  const initialDay = commitDay(new Date().toISOString());
  const lastDay = commitDay(history.commits[0]?.date ?? initialDay);
  const firstDay = commitDay(history.commits.at(-1)?.date ?? initialDay);
  return (
    <>
      <PageHeader back={{ href: "/", name: "Home" }} path={commitsRoute.route}>
        <PageTitle>{commitsRoute.title}</PageTitle>
        <PageDescription>
          {new Intl.NumberFormat("en-US").format(history.commits.length)}{" "}
          commits and counting, from {formatDay(firstDay)} to{" "}
          {formatDay(lastDay)} · Jakarta time (WIB)
        </PageDescription>
      </PageHeader>
      <div className="space-y-16">
        <ChangelogExplorer commits={history.commits} initialDay={initialDay} />
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
