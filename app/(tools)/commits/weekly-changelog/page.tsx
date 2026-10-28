import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Section, { SectionHeading } from "@/components/Section";
import { commitsRoute, weeklyChangelogRoute } from "@/data/routes";
import { formatDay } from "@/utils/commits/changelog";
import { createPageMetadata } from "@/utils/metadata/pageMetadata";

import { reviewedThrough, weeklyChangelog } from "./data";

export const metadata = createPageMetadata({
  title: weeklyChangelogRoute.title,
  description: weeklyChangelogRoute.description,
  path: weeklyChangelogRoute.route,
});

const monthFormatter = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const shortMonthFormatter = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  timeZone: "UTC",
});

function groupMonths() {
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

export default function WeeklyChangelogPage() {
  const months = groupMonths();
  return (
    <>
      <PageHeader
        back={{ href: commitsRoute.route, name: commitsRoute.title }}
        path={weeklyChangelogRoute.route}
      >
        <PageTitle>{weeklyChangelogRoute.title}</PageTitle>
        <PageDescription>
          Weekly highlights from January 2026, reviewed through{" "}
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
              href={`#month-${month.key}`}
              key={month.key}
              variant="inline"
            >
              {month.shortTitle}
            </InternalLink>
          ))}
        </nav>
      </PageHeader>
      <div className="space-y-16">
        <p className="text-muted max-w-3xl text-sm">
          These are curated highlights; browse{" "}
          <InternalLink href={commitsRoute.route} variant="inline">
            all commits
          </InternalLink>{" "}
          for individual changes. Weeks are grouped within each month, and the
          latest reviewed week may be partial.
        </p>
        {months.map((month) => (
          <div
            className="corner-squircle border-border rounded-xl border p-4 supports-[corner-shape:squircle]:rounded-3xl sm:p-5"
            key={month.key}
          >
            <Section id={`month-${month.key}`} title={month.title}>
              <ul className="divide-border divide-y divide-dashed">
                {month.weeks.map((week) => (
                  <li
                    className="py-5 first:pt-0 last:pb-0"
                    id={`week-${week.start}`}
                    key={week.start}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <SectionHeading
                          as="h3"
                          variant="toolbar"
                          data-toc-ignore=""
                        >
                          Week {Math.ceil(Number(week.start.slice(-2)) / 7)}
                        </SectionHeading>
                        {week.partial ? (
                          <span className="bg-action/10 text-action rounded-full px-2 py-0.5 text-xs font-medium">
                            Partial week
                          </span>
                        ) : null}
                      </div>
                      <p className="text-muted text-sm tabular-nums">
                        <time dateTime={week.start}>
                          {formatDay(week.start)}
                        </time>
                        {week.end === week.start ? null : (
                          <>
                            {" – "}
                            <time dateTime={week.end}>
                              {formatDay(week.end)}
                            </time>
                          </>
                        )}
                      </p>
                    </div>
                    {week.changes.length > 0 ? (
                      <div className="mt-3 space-y-3">
                        <p className="text-secondary-foreground max-w-3xl">
                          {week.description}
                        </p>
                        <ul className="marker:text-muted max-w-3xl list-outside list-disc space-y-2 pl-5">
                          {week.changes.map((change) => (
                            <li key={change}>{change}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-muted mt-2 text-sm">
                        {week.description}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        ))}
      </div>
    </>
  );
}
