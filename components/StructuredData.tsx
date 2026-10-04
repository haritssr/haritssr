import { SITE_URL } from "@/utils/site";

const personId = `${SITE_URL}/#person`;
const websiteId = `${SITE_URL}/#website`;

const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: SITE_URL,
      name: "Harits Syah",
      publisher: { "@id": personId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: "Harits Syah",
      url: SITE_URL,
      description: "Developer, teacher, and founder.",
      jobTitle: "Web Product Engineer and Math-Physics Teacher",
      sameAs: ["https://github.com/haritssr", "https://x.com/haritssr"],
    },
  ],
};

export function SiteStructuredData() {
  return <JsonLdScript data={siteStructuredData} />;
}

export function PageStructuredData({
  name,
  description,
  path,
  breadcrumbs,
}: {
  name: string;
  description: string;
  path: string;
  breadcrumbs?: readonly { name: string; path: string }[];
}) {
  const url = new URL(path, SITE_URL).toString();
  const breadcrumbId = `${url}#breadcrumb`;
  const page: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": websiteId },
    author: { "@id": personId },
  };
  const graph: Record<string, unknown>[] = [page];

  if (breadcrumbs !== undefined && breadcrumbs.length > 0) {
    page.breadcrumb = { "@id": breadcrumbId };
    graph.push({
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: breadcrumbs.map((breadcrumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: breadcrumb.name,
        ...(index < breadcrumbs.length - 1
          ? { item: new URL(breadcrumb.path, SITE_URL).toString() }
          : {}),
      })),
    });
  }

  const data = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return <JsonLdScript data={data} />;
}

// oxlint-disable react/no-danger -- Next.js recommends a script element for JSON-LD; the serialized payload escapes `<` below.
function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replaceAll("<", "\\u003c"),
      }}
    />
  );
}
// oxlint-enable react/no-danger
