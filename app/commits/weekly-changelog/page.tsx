import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import { weeklyChangelogRoute } from "@/data/routes";
import { formatDay } from "@/utils/commits/changelog";
import { createPageMetadata } from "@/utils/metadata/pageMetadata";

import { reviewedThrough, weeklyChangelog } from "./data";

export const metadata = createPageMetadata({
  title: weeklyChangelogRoute.title,
  description: weeklyChangelogRoute.description,
  path: weeklyChangelogRoute.route,
});

export default function WeeklyChangelogPage() {
  return (
    <>
      <PageHeader
        back={{ href: "/commits", name: "Commits" }}
        path={weeklyChangelogRoute.route}
      >
        <PageTitle>{weeklyChangelogRoute.title}</PageTitle>
        <PageDescription>
          Weekly highlights from January 2026, reviewed through{" "}
          {formatDay(reviewedThrough)} · Jakarta time (WIB)
        </PageDescription>
      </PageHeader>
      <div className="space-y-16">
        {weeklyChangelog.map((week) => (
          <Section
            description={
              <>
                <span className="mb-2 block text-sm">
                  <time dateTime={week.start}>{formatDay(week.start)}</time>
                  {" – "}
                  <time dateTime={week.end}>{formatDay(week.end)}</time>
                  {week.partial ? " · Partial week" : null}
                </span>
                {week.description}
              </>
            }
            id={`week-${week.start}`}
            key={week.start}
            title={week.title}
          >
            {week.changes.length > 0 ? (
              <ul className="marker:text-muted list-outside list-disc space-y-2 pl-5">
                {week.changes.map((change) => (
                  <li key={change}>{change}</li>
                ))}
              </ul>
            ) : null}
          </Section>
        ))}
      </div>
    </>
  );
}
