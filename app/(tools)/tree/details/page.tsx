import ToolChangelog from "@/app/(tools)/_components/ToolChangelog";
import ExplanationList from "@/components/ExplanationList";
import FlowDiagram from "@/components/FlowDiagram";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import Table from "@/components/Table";
import { createPageMetadata } from "@/utils/metadata/pageMetadata";

export const metadata = createPageMetadata({
  path: "/tree/details",
  title: "Tree Details",
  description:
    "Explore the site hierarchy, understand route counts, and browse Tree’s changes.",
});

const relationships = `flowchart TD
  accTitle: How Tree builds the site hierarchy
  accDescr: The shared route manifest supplies available pages and dynamic patterns. getRouteTree groups and sorts those routes, calculates counts, and sends them to the analytics table and expandable ToggleList. Disclosure controls reveal children independently of page links.
  Manifest["Shared route manifest"] --> Builder["getRouteTree: group and sort routes"]
  Builder --> Counts["Count pages, patterns, and hierarchy levels"]
  Counts --> Table["Route analytics table"]
  Builder --> Nodes["Route labels, links, and child counts"]
  Nodes --> List["ToggleList: expandable site hierarchy"]
  List --> Controls["Open branches or expand and collapse all"]
  List --> Links["Follow links to site pages"]
`;

const metrics = [
  ["Total pages", "All pages available in the site’s shared index."],
  [
    "Fixed routes",
    "Pages whose URL is not generated from a dynamic route pattern.",
  ],
  [
    "Dynamic route patterns",
    "Active URL templates that generate pages, such as /writing/[slug].",
  ],
  [
    "Pages generated from dynamic routes",
    "Individual pages produced from those templates.",
  ],
  ["Route patterns", "Fixed routes plus active dynamic route patterns."],
  [
    "Hierarchy levels",
    "Page counts by URL depth, with Home included in level one.",
  ],
] as const;

export default function TreeDetailsPage() {
  return (
    <>
      <PageHeader back={{ href: "/tree", name: "Tree" }} path="/tree/details">
        <PageTitle>Details</PageTitle>
        <PageDescription>
          Explore the site’s pages and see how they fit together.
        </PageDescription>
      </PageHeader>
      <div className="space-y-16">
        <Section
          id="what-you-can-do"
          title="What you can do"
          contentClassName="max-w-3xl"
        >
          <ExplanationList>
            <li>Browse the site as an expandable hierarchy of pages.</li>
            <li>
              Open individual branches or use Expand all and Collapse all.
            </li>
            <li>Open a page directly from its linked label.</li>
            <li>See how many immediate children each branch contains.</li>
            <li>
              Compare page totals, dynamic routes, and counts at each hierarchy
              level.
            </li>
          </ExplanationList>
        </Section>
        <Section
          id="how-the-tree-is-organized"
          title="What to know"
          contentClassName="max-w-3xl"
        >
          <ExplanationList>
            <li>
              Pages are grouped by URL path, with Home first and siblings sorted
              by title.
            </li>
            <li>
              Branches start closed, and their arrow controls work separately
              from page links.
            </li>
            <li>
              Some dynamic pages share a non-clickable [...] placeholder to keep
              large branches compact.
            </li>
            <li>
              Each branch counts its direct children, not every descendant;
              analytics include pages hidden behind compact placeholders.
            </li>
            <li>
              The tree reflects the pages available in the current environment,
              so a local preview may differ from the public site.
            </li>
          </ExplanationList>
        </Section>
        <Section
          id="understanding-the-counts"
          title="Understanding the counts"
          contentClassName="max-w-3xl"
        >
          <Table>
            <caption className="sr-only">
              Tree route analytics explained
            </caption>
            <thead>
              <tr className="divide-border bg-foreground/5 divide-x">
                <th className="px-3 text-left font-medium" scope="col">
                  Metric
                </th>
                <th className="px-3 text-left font-medium" scope="col">
                  Meaning
                </th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {metrics.map(([name, meaning]) => (
                <tr className="divide-border divide-x" key={name}>
                  <th
                    className="px-3 py-2 text-left align-top font-medium"
                    scope="row"
                  >
                    {name}
                  </th>
                  <td className="px-3 py-2 align-top">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>
        <Section id="how-it-works" title="How it works">
          <p className="max-w-3xl">
            Tree uses the same route manifest as search and the sitemap. The
            server builds the hierarchy and counts, and the browser handles
            opening and closing branches.
          </p>
          <FlowDiagram
            definition={relationships}
            title="Tree components and data flow"
          />
        </Section>
        <ToolChangelog tool="tree" />
      </div>
    </>
  );
}
