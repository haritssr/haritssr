import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import { apiRoute } from "@/data/routes";
import { createPageMetadata } from "@/utils/metadata/pageMetadata";

export const metadata = createPageMetadata({
  title: apiRoute.title,
  description: apiRoute.description,
  path: apiRoute.route,
});

const publicEndpoints = [
  {
    href: "/api/commits?period=month&date=2026-10-01&limit=50",
    description:
      "Filtered commit history, summary counts, and activity buckets. Supports period (day, week, month, year, all), date, type, q, and limit (50–5000). Reads public commit history from Turso and defaults to the latest recorded day. Database reads and successful responses use five-minute caches; a storage failure returns 503 without caching the error.",
  },
  {
    href: "/api/timer/auth/session",
    description:
      "Current owner account email and optional Google photo, or null when signed out. Cookie-authenticated and never cached; used by the top bar. Signing in only unlocks personal Timer access.",
  },
  {
    href: "/api/timer",
    description:
      "Timer activities and 30-day totals. Visitors receive generated samples; the signed-in owner reads personal Turso records. POST changes tasks (Add accepts an optional UUID taskId to prevent duplicate creation), PATCH saves preferences, including ordered durationPresets (1–5 entries) and taskPresets (1–10 entries) lists, and ?backup=1 exports or imports history. All personal operations require the owner session.",
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
      </div>
    </>
  );
}
