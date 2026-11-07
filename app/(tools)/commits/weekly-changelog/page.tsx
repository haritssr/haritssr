import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { CSSProperties } from "react";

import {
  TYPE_BACKGROUND,
  TypeLegend,
} from "@/app/(tools)/commits/_components/CommitTypeChart";
import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import { commitsRoute, weeklyChangelogRoute } from "@/data/routes";
import { formatDay } from "@/utils/commits/changelog";
import {
  getCommitHistory,
  getCommitInsights,
} from "@/utils/commits/commitHistory";
import { INSIGHT_TYPES } from "@/utils/commits/insights";
import type { MonthlyMix } from "@/utils/commits/insights";
import { createPageMetadata } from "@/utils/metadata/pageMetadata";

import { buildWeeks, reviewedThrough } from "./data";

export const revalidate = 86_400;

export const metadata = createPageMetadata({
  title: weeklyChangelogRoute.title,
  description: weeklyChangelogRoute.description,
  path: weeklyChangelogRoute.route,
});

/** Months at the top stay open; older ones fold away until chosen. */
const OPEN_MONTHS = 3;
const numberFormatter = new Intl.NumberFormat("en-GB");
const monthFormatter = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const shortMonthFormatter = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  timeZone: "UTC",
});

type ShareStyle = CSSProperties & Record<"--share", string>;

function groupMonths(weeklyChangelog: ReturnType<typeof buildWeeks>) {
  const grouped = new Map<string, typeof weeklyChangelog>();
  for (const week of weeklyChangelog) {
    const key = week.start.slice(0, 7);
    const weeks = grouped.get(key) ?? [];
    weeks.push(week);
    grouped.set(key, weeks);
  }
  return [...grouped].map(([key, weeks]) => {
    const date = new Date(`${key}-01T00:00:00Z`);
    return {
      key,
      weeks,
      title: monthFormatter.format(date),
      shortTitle: shortMonthFormatter.format(date),
    };
  });
}

/** "15–21 Oct", or "28 Oct" for a single day. */
function weekRange(start: string, end: string) {
  const month = shortMonthFormatter.format(new Date(`${end}T00:00:00Z`));
  const first = Number(start.slice(8));
  const last = Number(end.slice(8));
  return first === last ? `${last} ${month}` : `${first}–${last} ${month}`;
}

function MonthMix({ mix }: { mix: MonthlyMix | undefined }) {
  if (mix === undefined || mix.total === 0) {
    return null;
  }
  return (
    <span
      aria-hidden="true"
      className="flex h-2 w-full gap-0.5 sm:w-56"
      title={INSIGHT_TYPES.filter(({ value }) => mix.counts[value] > 0)
        .map(({ label, value }) => `${label} ${mix.counts[value]}`)
        .join(", ")}
    >
      {INSIGHT_TYPES.filter(({ value }) => mix.counts[value] > 0).map(
        ({ value }) => {
          const segmentStyle: ShareStyle = {
            "--share": String(mix.counts[value]),
          };
          return (
            <span
              className={`h-full min-w-0.5 grow-(--share) basis-0 rounded-xs ${TYPE_BACKGROUND[value]}`}
              key={value}
              style={segmentStyle}
            />
          );
        }
      )}
    </span>
  );
}

export default async function WeeklyChangelogPage() {
  const [history, insights] = await Promise.all([
    getCommitHistory(),
    getCommitInsights(),
  ]);
  const months = groupMonths(buildWeeks(history));
  const mixes = new Map(insights.months.map((mix) => [mix.key, mix]));
  return (
    <>
      <PageHeader
        back={{ href: commitsRoute.route, name: commitsRoute.title }}
        path={weeklyChangelogRoute.route}
      >
        <PageTitle>{weeklyChangelogRoute.title}</PageTitle>
        <PageDescription>
          Weekly changes from January 2026, curated through{" "}
          <time dateTime={reviewedThrough}>{formatDay(reviewedThrough)}</time>
          {" · Jakarta time (WIB)"}
        </PageDescription>
        <nav
          aria-label="Jump to a changelog month"
          className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"
        >
          <span className="text-muted">Jump to</span>
          {months.map((month) => (
            <InternalLink
              href={`#week-${month.weeks.at(0)?.start ?? month.key}`}
              key={month.key}
              variant="inline"
            >
              {month.shortTitle}
            </InternalLink>
          ))}
        </nav>
      </PageHeader>
      <div className="space-y-6">
        <div className="max-w-3xl space-y-3">
          <p className="text-muted text-sm">
            Entries after the curated cutoff are commit subjects; browse{" "}
            <InternalLink href={commitsRoute.route} variant="inline">
              all commits
            </InternalLink>{" "}
            for individual changes. The latest week may be partial, and the{" "}
            {OPEN_MONTHS} newest months start open.
          </p>
          <p className="text-muted text-sm">
            The bar beside each month shows its mix of change types.
          </p>
          <TypeLegend totals={insights.typeTotals} />
        </div>
        <div className="divide-border border-border divide-y border-y">
          {months.map((month, index) => {
            const mix = mixes.get(month.key);
            return (
              <details
                className="group/month"
                id={`month-${month.key}`}
                key={month.key}
                open={index < OPEN_MONTHS}
              >
                <summary className="bg-background focus-visible:outline-action sticky top-[var(--topbar-height,4rem)] z-10 flex cursor-pointer list-none flex-wrap items-center gap-x-4 gap-y-2 py-4 [&::-webkit-details-marker]:hidden">
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="text-muted size-5 shrink-0 -rotate-90 transition-transform group-open/month:rotate-0"
                  />
                  <span className="text-foreground text-xl font-semibold">
                    {month.title}
                  </span>
                  <span className="text-muted text-sm tabular-nums">
                    {mix === undefined
                      ? null
                      : `${numberFormatter.format(mix.total)} commits · `}
                    {month.weeks.length}{" "}
                    {month.weeks.length === 1 ? "week" : "weeks"}
                  </span>
                  <span className="ml-auto flex w-full sm:w-auto">
                    <MonthMix mix={mix} />
                  </span>
                </summary>
                <ol className="divide-border divide-y divide-dashed pb-6">
                  {month.weeks.map((week) => (
                    <li
                      className="grid gap-x-8 gap-y-2 py-5 first:pt-1 last:pb-0 sm:grid-cols-[9rem_minmax(0,1fr)]"
                      id={`week-${week.start}`}
                      key={week.start}
                    >
                      <div className="text-sm">
                        <p className="text-foreground font-medium tabular-nums">
                          <time dateTime={week.start}>
                            {weekRange(week.start, week.end)}
                          </time>
                        </p>
                        <p className="text-muted tabular-nums">
                          {numberFormatter.format(week.count)} commits
                          {week.partial ? " · partial" : ""}
                        </p>
                      </div>
                      <div className="max-w-3xl min-w-0 space-y-2">
                        <p
                          className={
                            week.changes.length > 0
                              ? "text-foreground font-medium"
                              : "text-muted"
                          }
                        >
                          {week.description}
                        </p>
                        {week.changes.length > 0 ? (
                          <ul className="marker:text-muted text-secondary-foreground list-outside list-disc space-y-1.5 pl-5 text-sm">
                            {week.changes.map((change, changeIndex) => (
                              <li key={`${change}-${changeIndex}`}>{change}</li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
              </details>
            );
          })}
        </div>
      </div>
    </>
  );
}
