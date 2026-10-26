import ExplanationList from "@/components/ExplanationList";
import FlowDiagram from "@/components/FlowDiagram";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import { createPageMetadata } from "@/utils/metadata/pageMetadata";

export const metadata = createPageMetadata({
  path: "/tree/details",
  title: "Tree Details",
  description: "How Tree organizes and displays the site's routes.",
});

const relationships = `flowchart LR
  Manifest["Route manifest"] --> Builder["getRouteTree: hierarchy and analytics"]
  Builder --> Page["Tree page"]
  Page --> Table["Route analytics"]
  Page --> List["ToggleList: expand and collapse"]
  List --> Links["Route links and child counts"]
`;

export default function TreeDetailsPage() {
  return (
    <>
      <PageHeader back={{ href: "/tree", name: "Tree" }} path="/tree/details">
        <PageTitle>Tree Details</PageTitle>
        <PageDescription>How the site route tree is organized.</PageDescription>
      </PageHeader>
      <div className="space-y-16">
        <Section title="Logics" contentClassName="max-w-3xl">
          <ExplanationList>
            <li>
              Routes come from the shared discovery manifest and are grouped by
              URL path. Dynamic routes marked for collapse share a placeholder.
            </li>
            <li>
              Home appears first; sibling routes are sorted by title. A count
              shows the immediate children of each branch.
            </li>
            <li>
              Branches start closed. Open them individually, expand all, or
              collapse all; links navigate to their routes independently.
            </li>
            <li>
              Analytics count manifest routes and dynamic patterns; a collapsed
              placeholder can represent multiple generated pages.
            </li>
          </ExplanationList>
        </Section>
        <Section title="How this works">
          <FlowDiagram
            definition={relationships}
            title="Tree components and data flow"
          />
        </Section>
      </div>
    </>
  );
}
