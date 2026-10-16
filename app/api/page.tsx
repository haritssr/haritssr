import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import { apiRoute } from "@/data/routes";
import { DATABASE_LABS_ENABLED } from "@/utils/databaseLabs";
import { createPageMetadata } from "@/utils/pageMetadata";

export const metadata = createPageMetadata({
  title: apiRoute.title,
  description: apiRoute.description,
  path: apiRoute.route,
});

const publicEndpoints = [
  {
    href: "/api/timer",
    description:
      "Timer activities and 30-day totals. Production returns generated sample data; local development uses personal JSON files.",
  },
  {
    href: "/api/hello",
    description: "Sample people for data-fetching demos.",
  },
  {
    href: "/api/og",
    description:
      "Social preview images customized by title, description, and path.",
  },
  {
    href: "/api/params/one/two",
    description:
      "URL path segments from the requested route, such as one and two.",
  },
  {
    href: "/api/search-index",
    description: "Page and content index for site search.",
  },
  {
    href: "/api/searchWithApi",
    description: "Search sample users by name with the q query parameter.",
  },
];

export default function APIPage() {
  return (
    <>
      <PageHeader back={{ href: "/", name: "Home" }} path={apiRoute.route}>
        <PageTitle>{apiRoute.title}</PageTitle>
        <PageDescription>{apiRoute.description}</PageDescription>
      </PageHeader>
      <div className="space-y-16">
        <Section title="Public">
          <ul className="max-w-full space-y-5">
            {publicEndpoints.map((endpoint) => (
              <li className="min-w-0 space-y-1" key={endpoint.href}>
                <InternalLink href={endpoint.href} variant="inline">
                  {endpoint.href}
                </InternalLink>
                <p className="text-muted">{endpoint.description}</p>
              </li>
            ))}
          </ul>
        </Section>
        {DATABASE_LABS_ENABLED ? (
          <Section title="Local">
            <InternalLink href="/api/timer" variant="inline">
              /api/timer
            </InternalLink>
            <p className="text-muted">
              Today’s timer activities. Use GET with a date, such as{" "}
              <InternalLink href="/api/timer?date=2026-10-15" variant="inline">
                /api/timer?date=2026-10-15
              </InternalLink>
              , for a daily activity list and 30-day totals. POST adds, starts,
              pauses, or acknowledges completion of an activity. Production GET
              responses contain sample data; production POST is unavailable.
            </p>
            <InternalLink href="/api/task" variant="inline">
              /api/task
            </InternalLink>
            <p className="text-muted max-w-full">
              Local tasks by date, with POST and PUT support for editing.
            </p>
          </Section>
        ) : null}
      </div>
    </>
  );
}
