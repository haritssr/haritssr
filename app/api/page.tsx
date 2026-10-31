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

interface Endpoint {
  href: string;
  description: string;
  method?: string;
  authenticated?: boolean;
}

const methodColors: Record<string, string> = {
  GET: "bg-[#00d1ad]/10 text-[#008c75]",
  POST: "bg-[#72c4ef]/10 text-[#167ba9]",
  PUT: "bg-[#dc8be9]/10 text-[#a13db1]",
  PATCH: "bg-[#b7a0f3]/10 text-[#7753c3]",
  DELETE: "bg-[#f18ba6]/10 text-[#c04468]",
};

const endpoints: Endpoint[] = [
  {
    href: "/api/commits?period=month&date=2026-10-01&limit=50",
    description:
      "Filtered commit history, summary counts, and activity buckets. Supports period (day, week, month, year, all), date, type, q, and limit (50–5000). Reads public commit history from Turso and defaults to the latest recorded day. Database reads and successful responses use 24-hour caches; a storage failure returns 503 without caching the error.",
  },
  {
    href: "/api/timer/auth/session",
    description:
      "Current owner account email and optional Google photo, or null when signed out. Reads the session cookie and is never cached; used by the top bar. No sign-in is required to check session status. Signing in only unlocks personal Timer access.",
  },
  {
    href: "/api/timer",
    description:
      "Current Timer activities, or a historical day and 30-day totals with ?date=YYYY-MM-DD. Visitors receive generated samples; the signed-in owner reads personal Turso records. Responses are private and never cached.",
  },
  {
    href: "/api/timer",
    method: "POST",
    authenticated: true,
    description:
      "Change personal Timer tasks. Add accepts an optional UUID taskId to prevent duplicate creation. Requires the owner session, a same-origin request, and application/json.",
  },
  {
    href: "/api/timer",
    method: "PATCH",
    authenticated: true,
    description:
      "Save personal preferences, including ordered durationPresets (1–5 entries) and taskPresets (1–10 entries). Requires the owner session, a same-origin request, and application/json.",
  },
  {
    href: "/api/timer?backup=1",
    method: "GET / POST",
    authenticated: true,
    description:
      "Export personal history with GET or import a JSON backup with POST. Requires the owner session; imports also require a same-origin request and application/json, with a 10 MB limit.",
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
        <Section title="Endpoints">
          <ul className="max-w-full space-y-5">
            {endpoints.map((endpoint) => (
              <li
                className="min-w-0 space-y-1"
                key={`${endpoint.method ?? "GET"} ${endpoint.href}`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  {(endpoint.method ?? "GET").split(" / ").map((method) => (
                    <span
                      className={`rounded-md px-2 py-0 font-mono text-sm leading-6 font-medium ${methodColors[method]}`}
                      key={method}
                    >
                      {method}
                    </span>
                  ))}
                  <InternalLink href={endpoint.href}>
                    {endpoint.href}
                  </InternalLink>
                  {endpoint.authenticated === true && (
                    <span className="border-border bg-foreground/5 text-foreground/70 inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium">
                      <span
                        aria-hidden="true"
                        className="bg-muted size-1.5 shrink-0 rounded-full"
                      />
                      Authenticated
                    </span>
                  )}
                </div>
                <p className="text-muted">{endpoint.description}</p>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </>
  );
}
