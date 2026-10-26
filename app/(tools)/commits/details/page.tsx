import ExplanationList from "@/components/ExplanationList";
import FlowDiagram from "@/components/FlowDiagram";
import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import Table from "@/components/Table";
import {
  commitAnalysisRoute,
  commitsDetailsRoute,
  commitsRoute,
  modelSuitabilityRoute,
  october21AnalysisRoute,
  october22AnalysisRoute,
  todayModelSuitabilityRoute,
  weeklyChangelogRoute,
} from "@/data/routes";
import { createPageMetadata } from "@/utils/metadata/pageMetadata";

import { commitRelationships } from "./relationships";

export const metadata = createPageMetadata({
  title: commitsDetailsRoute.title,
  description: commitsDetailsRoute.description,
  path: commitsDetailsRoute.route,
});

const analysisRoutes = [
  modelSuitabilityRoute,
  commitAnalysisRoute,
  todayModelSuitabilityRoute,
  october21AnalysisRoute,
  october22AnalysisRoute,
];

export default function CommitsDetailsPage() {
  return (
    <>
      <PageHeader
        back={{ href: commitsRoute.route, name: commitsRoute.title }}
        path={commitsDetailsRoute.route}
      >
        <PageTitle>{commitsDetailsRoute.title}</PageTitle>
        <PageDescription>
          Where commit data comes from, how it is cached, and when changes
          become visible.
        </PageDescription>
      </PageHeader>
      <div className="space-y-16">
        <Section title="Logics" contentClassName="max-w-3xl">
          <ExplanationList>
            <li>
              Git history is imported only on request. Pages read the separate
              commits database without a local fallback.
            </li>
            <li>
              Calendar filters use Jakarta dates. The URL preserves filters and
              row limits; calculations use the full matching history before
              limiting displayed rows.
            </li>
            <li>
              History and count caches are independent. Their freshness windows
              depend on requests rather than a background schedule.
            </li>
          </ExplanationList>
        </Section>
        <Section title="How this works">
          <FlowDiagram
            definition={commitRelationships}
            title="Commit history components and data flow"
          />
        </Section>
        <Section id="storage" title="Storage and data flow">
          <p>
            A separate Turso database named commits contains a table also named
            commits. Each record stores a Git hash, author date, and commit
            subject. The server queries this table and caches the results before
            supplying them to pages and the API.
          </p>
          <p>
            The cache belongs to Next.js: locally it uses generated storage
            under .next, while Vercel manages it for the deployed site. Local
            and deployed environments have separate caches. Commit history is
            imported directly from Git into Turso; no local JSON snapshot is
            used.
          </p>
        </Section>

        <Section id="cache-periods" title="Cache periods">
          <Table className="min-w-4xl text-left">
            <caption className="sr-only">
              Commit data and response cache periods
            </caption>
            <thead>
              <tr className="divide-border bg-foreground/5 divide-x">
                <th className="w-44 px-3 font-medium" scope="col">
                  Cache
                </th>
                <th
                  className="w-24 px-3 font-medium whitespace-nowrap"
                  scope="col"
                >
                  Fresh for
                </th>
                <th className="w-56 px-3 font-medium" scope="col">
                  Routes
                </th>
                <th className="px-3 font-medium" scope="col">
                  What it stores
                </th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              <tr className="divide-border divide-x">
                <th className="px-3 py-2 align-top font-medium" scope="row">
                  Homepage count
                </th>
                <td className="px-3 py-2 align-top whitespace-nowrap">
                  24 hours
                </td>
                <td className="px-3 py-2 align-top">
                  <InternalLink href="/" variant="inline">
                    /
                  </InternalLink>
                </td>
                <td className="px-3 py-2 align-top">
                  Only the total from a separate COUNT(*) query. Displaying this
                  count does not refresh the full history cache.
                </td>
              </tr>
              <tr className="divide-border divide-x">
                <th className="px-3 py-2 align-top font-medium" scope="row">
                  Shared commit history
                </th>
                <td className="px-3 py-2 align-top whitespace-nowrap">
                  24 hours
                </td>
                <td className="px-3 py-2 align-top">
                  <ul className="space-y-1 whitespace-nowrap">
                    {[commitsRoute, ...analysisRoutes].map((route) => (
                      <li key={route.route}>
                        <InternalLink href={route.route} variant="inline">
                          {route.route}
                        </InternalLink>
                      </li>
                    ))}
                    <li>/api/commits</li>
                  </ul>
                </td>
                <td className="px-3 py-2 align-top">
                  All commit records, shared by the explorer, dated analysis
                  pages, and API. Filtering and activity calculations use these
                  cached records in the application.
                </td>
              </tr>
              <tr className="divide-border divide-x">
                <th className="px-3 py-2 align-top font-medium" scope="row">
                  API browser cache
                </th>
                <td className="px-3 py-2 align-top whitespace-nowrap">
                  24 hours
                </td>
                <td className="px-3 py-2 align-top">/api/commits</td>
                <td className="px-3 py-2 align-top">
                  The JSON response for a particular API URL.
                </td>
              </tr>
              <tr className="divide-border divide-x">
                <th className="px-3 py-2 align-top font-medium" scope="row">
                  API CDN cache
                </th>
                <td className="px-3 py-2 align-top whitespace-nowrap">
                  24 hours
                </td>
                <td className="px-3 py-2 align-top">/api/commits</td>
                <td className="px-3 py-2 align-top">
                  The JSON response at the CDN. Its policy also permits a stale
                  response for up to 24 hours while revalidating.
                </td>
              </tr>
            </tbody>
          </Table>
          <p>
            React also deduplicates matching data reads within a server render.
            This is separate from the persistent Next.js caches above. Cache
            periods are freshness windows, not scheduled jobs or guaranteed
            update deadlines.
          </p>
        </Section>

        <Section id="consumers" title="Where the caches are used">
          <ExplanationList>
            <li>
              <InternalLink href="/" variant="inline">
                Home
              </InternalLink>{" "}
              uses the 24-hour count cache for its Commits card under Tools.
            </li>
            <li>
              <InternalLink href={commitsRoute.route} variant="inline">
                Commits
              </InternalLink>{" "}
              uses the 24-hour history cache for the initial count, date range,
              activity chart, and commit list.
            </li>
            <li>
              /api/commits uses the same history cache to answer filtered
              requests. The response can additionally be served from the browser
              or CDN cache before reaching the server.
            </li>
            <li>
              Dated analysis pages share the history cache:{" "}
              {analysisRoutes.map((route, index) => (
                <span key={route.route}>
                  {index > 0 ? ", " : ""}
                  <InternalLink href={route.route} variant="inline">
                    {route.title}
                  </InternalLink>
                </span>
              ))}
              .
            </li>
            <li>
              <InternalLink href={weeklyChangelogRoute.route} variant="inline">
                Changelog
              </InternalLink>{" "}
              uses locally maintained highlights. This Details page also renders
              without querying the commits database.
            </li>
          </ExplanationList>
          <p>
            The homepage count can temporarily differ from the count on Commits
            because their freshness windows are independent.
          </p>
        </Section>

        <Section id="refresh" title="When a refresh happens">
          <ExplanationList>
            <li>
              An empty cache makes the next request fetch from Turso and store
              the result.
            </li>
            <li>
              A fresh cache serves its saved result without another Turso query.
            </li>
            <li>
              After the freshness window, the next request can receive the
              existing result while Next.js refreshes it in the background.
              Later requests receive the refreshed result.
            </li>
            <li>
              Without a request, an expired cache does not refresh itself.
              Clearing or losing a cache can cause a new fetch sooner.
            </li>
          </ExplanationList>
          <p>
            For example, a history fetch at 10:00 stays fresh until 10:00 the
            next day. If the next history request arrives at 10:20 that day,
            that request can trigger the refresh. Visiting Home only checks its
            own independent 24-hour count cache.
          </p>
          <p>
            API response caching adds another layer, so a request served
            entirely by a browser or CDN does not reach the history cache.
            Leaving the explorer open does not poll Turso on a timer; its client
            cache also disables automatic focus and reconnect revalidation.
          </p>
        </Section>

        <Section id="usage" title="Database reads and writes">
          <p>
            A history refresh selects every commit row. With 1,900 stored
            commits, one such query reads about 1,900 rows even if a page
            displays only 50. The homepage count query returns one number; it
            can still involve database reads, so it has its own 24-hour cache. A
            cache hit adds no Turso reads for that data.
          </p>
          <p>
            Viewing these pages does not write commit records. Imports add new
            commits or update changed records, and their verification step reads
            the stored history. Turso usage counters accumulate operations: they
            do not represent the number of unique commits stored.
          </p>
        </Section>

        <Section id="updates" title="Publishing changes and handling failures">
          <p>
            The update workflow is Git history directly into Turso. Run bun run
            sync:commits manually after committing from a full Git checkout to
            upload records. Run bun run import:commits --dry-run to validate the
            source without database access. Imports preserve existing history
            and skip unchanged records. Deploying the site does not upload
            commits automatically.
          </p>
          <p>
            An import does not invalidate either data cache. New records become
            visible as requests refresh the relevant caches; the homepage count
            can remain older for 24 hours, and API response caching can add
            further delay.
          </p>
          <p>
            If a background refresh fails, Next.js can retain previously cached
            data. When no usable result is available, the homepage still shows
            its Tools links without the count, and the API returns an uncached
            503 response. Runtime readers use Turso without a local file
            fallback.
          </p>
        </Section>
      </div>
    </>
  );
}
