import ToolChangelog from "@/app/(tools)/_components/ToolChangelog";
import Accordion, { AccordionItem } from "@/components/Accordion";
import ExplanationList from "@/components/ExplanationList";
import FlowDiagram from "@/components/FlowDiagram";
import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import Table from "@/components/Table";
import {
  commitsDetailsRoute,
  commitsRoute,
  weeklyChangelogRoute,
} from "@/data/routes";
import { createPageMetadata } from "@/utils/metadata/pageMetadata";

import { commitRelationships } from "./relationships";

export const metadata = createPageMetadata({
  title: "Commits Details",
  description: commitsDetailsRoute.description,
  path: commitsDetailsRoute.route,
});

const cacheLayers = [
  ["Home count", "One total, cached separately from the history."],
  [
    "Shared history",
    "Commit records used by the explorer, reviews, tool changelogs, and API.",
  ],
  ["Browser and CDN", "The response for each filtered API URL."],
] as const;

export default function CommitsDetailsPage() {
  return (
    <>
      <PageHeader
        back={{ href: commitsRoute.route, name: commitsRoute.title }}
        path={commitsDetailsRoute.route}
      >
        <PageTitle>{commitsDetailsRoute.title}</PageTitle>
        <PageDescription>
          Browse code changes, explore activity, and understand when history
          updates.
        </PageDescription>
      </PageHeader>
      <div className="space-y-16">
        <Section
          id="what-you-can-do"
          title="What you can do"
          contentClassName="max-w-3xl"
        >
          <ExplanationList>
            <li>Browse commits by day, week, month, year, or all history.</li>
            <li>
              Jump to the latest period or step backward and forward through
              history.
            </li>
            <li>Filter by change type and search commit messages or hashes.</li>
            <li>
              Compare matching commits, active periods, and the busiest hour or
              day.
            </li>
            <li>
              Hover or focus chart bars for counts, and select them to drill
              down from a week, month, year, or all-history view.
            </li>
            <li>
              Load more timeline entries and share the current filters through
              the page URL.
            </li>
            <li>
              Read curated weekly highlights on the{" "}
              <InternalLink href={weeklyChangelogRoute.route} variant="inline">
                Changelog
              </InternalLink>{" "}
              page.
            </li>
          </ExplanationList>
        </Section>
        <Section id="refresh" title="What to know" contentClassName="max-w-3xl">
          <ExplanationList>
            <li>
              History is uploaded manually from Git, so committing or deploying
              does not publish it automatically.
            </li>
            <li>
              History, the homepage count, and API responses each use 24-hour
              caches.
            </li>
            <li>
              Expired data refreshes when requested, so new commits may take
              longer than 24 hours to appear.
            </li>
            <li>
              The homepage total and explorer can temporarily differ because
              their caches refresh separately.
            </li>
            <li>
              Failed refreshes can retain older data; failed fresh API reads
              return an error that can be retried.
            </li>
          </ExplanationList>
        </Section>
        <Section
          id="reading-the-activity"
          title="Reading the activity"
          contentClassName="max-w-3xl"
        >
          <ExplanationList>
            <li>Dates and hourly buckets use Jakarta time (WIB).</li>
            <li>
              Daily views show active hours and the peak hour; wider ranges show
              active days and the busiest day.
            </li>
            <li>
              Charts and summary totals include every matching commit, even when
              only 50 timeline entries are visible.
            </li>
            <li>
              Counts describe recorded commits, not the size or effort of each
              change.
            </li>
            <li>
              Messages without a recognized commit prefix appear under Other.
            </li>
            <li>
              The weekly changelog contains curated summaries rather than every
              commit.
            </li>
          </ExplanationList>
        </Section>
        <Section id="how-it-works" title="How it works">
          <p className="max-w-3xl">
            Git history is imported into a separate database, then cached on the
            server. Your selected filters determine the summaries, chart, and
            timeline; changing them updates the URL and requests matching
            results.
          </p>
          <FlowDiagram
            definition={commitRelationships}
            title="Commit history data flow"
          />
          <Accordion>
            <AccordionItem
              excludeFromContents
              title="Technical reference"
              value="technical-reference"
            >
              <div className="space-y-16">
                <Section
                  id="storage"
                  title="Storage and access"
                  headingAs="h3"
                  contentClassName="max-w-3xl"
                >
                  <ExplanationList>
                    <li>
                      A separate Turso database stores Git hashes, author dates,
                      and commit subjects.
                    </li>
                    <li id="usage">
                      Pages only read history; imports add or update records
                      without deleting existing history.
                    </li>
                    <li>
                      The history query loads all records before filtering,
                      while the homepage count has its own query.
                    </li>
                    <li>
                      Runtime reads use Turso without a local JSON fallback.
                    </li>
                  </ExplanationList>
                </Section>
                <Section id="cache-periods" title="Cache layers" headingAs="h3">
                  <Table>
                    <caption className="sr-only">
                      Commit cache layers and freshness
                    </caption>
                    <thead>
                      <tr className="divide-border bg-foreground/5 divide-x">
                        <th className="px-3 text-left font-medium" scope="col">
                          Layer
                        </th>
                        <th className="px-3 text-left font-medium" scope="col">
                          Fresh for
                        </th>
                        <th className="px-3 text-left font-medium" scope="col">
                          Stores
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-border divide-y">
                      {cacheLayers.map(([name, detail]) => (
                        <tr className="divide-border divide-x" key={name}>
                          <th
                            className="px-3 py-2 text-left align-top font-medium"
                            scope="row"
                          >
                            {name}
                          </th>
                          <td className="px-3 py-2 align-top whitespace-nowrap">
                            24 hours
                          </td>
                          <td className="px-3 py-2 align-top">{detail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <p id="consumers" className="max-w-3xl">
                    Server data is shared across the explorer, dated reviews,
                    tool changelogs, and API; weekly highlights are curated
                    locally. Browser and CDN hits can delay a request reaching
                    the server cache.
                  </p>
                </Section>
                <Section
                  id="updates"
                  title="Import and recovery"
                  headingAs="h3"
                  contentClassName="max-w-3xl"
                >
                  <ExplanationList>
                    <li>
                      Run <code>bun run sync:commits</code> only when an upload
                      is intended, from a full Git checkout.
                    </li>
                    <li>
                      Use <code>bun run sync:commits --dry-run</code> to
                      validate without database access.
                    </li>
                    <li>
                      Imports preserve existing records and do not invalidate
                      the data or API caches.
                    </li>
                    <li>
                      API responses allow another 24 hours of stale data during
                      revalidation; failed fresh reads return an uncached 503.
                    </li>
                    <li>
                      The explorer debounces filter changes and supports Back
                      and Forward without polling on a timer.
                    </li>
                  </ExplanationList>
                </Section>
              </div>
            </AccordionItem>
          </Accordion>
        </Section>
        <ToolChangelog tool="commits" />
      </div>
    </>
  );
}
