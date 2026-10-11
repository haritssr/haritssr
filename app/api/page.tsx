import InternalLink from "@/components/InternalLink";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import TopLevelSectionPageDescription from "@/components/TopLevelSectionPageDescription";
import { apiRoute } from "@/data/routes";
import { DATABASE_EXPERIMENTS_ENABLED } from "@/utils/databaseExperiments";
import { createPageMetadata } from "@/utils/pageMetadata";

export const metadata = createPageMetadata({
  title: apiRoute.title,
  description: apiRoute.description,
  path: apiRoute.route,
});

const publicEndpoints = [
  {
    href: "/api/hello",
    description: "Returns sample people as JSON for the data-fetching demo.",
  },
  {
    href: "/api/og",
    description:
      "Returns a social preview image. Customize it with title, description, and path query parameters.",
  },
  {
    href: "/api/params/one/two",
    description:
      "Returns the URL path segments as JSON. Replace one/two with your own segments.",
  },
  {
    href: "/api/search-index",
    description: "Returns the pages and content used by the site search.",
  },
  {
    href: "/api/searchWithApi",
    description:
      "Returns up to ten sample users. Add a q query parameter to search by name.",
  },
];

export default function APIPage() {
  return (
    <>
      <PageTitle>{apiRoute.title}</PageTitle>
      <TopLevelSectionPageDescription>
        {apiRoute.description}
      </TopLevelSectionPageDescription>
      <div className="space-y-20">
        <Section
          title="Public endpoints"
          description="Open a link to view its GET response. Most endpoints return JSON; the social preview endpoint returns a JPEG image."
        >
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
        {DATABASE_EXPERIMENTS_ENABLED ? (
          <Section
            title="Local development"
            description="This endpoint is available only in development and returns 404 on the production site."
          >
            <InternalLink href="/api/task" variant="inline">
              /api/task
            </InternalLink>
            <p className="text-muted max-w-full">
              Returns today&apos;s local tasks. Add a date query parameter in
              YYYY-MM-DD format to view another day. The task app also uses POST
              and PUT to save tasks.
            </p>
          </Section>
        ) : null}
      </div>
    </>
  );
}
