import type { Metadata } from "next";

import ExperimentsGrid from "@/components/ExperimentsGrid";
import PageTitle from "@/components/PageTitle";
import TopLevelSectionPageDescription from "@/components/TopLevelSectionPageDescription";
import { getAvailableExperimentDomains } from "@/utils/experimentCatalog";
import { createPageMetadata } from "@/utils/pageMetadata";

export const metadata: Metadata = createPageMetadata({
  path: "/experiments",
  title: "Experiments",
  description: getExperimentsHomeDescription(),
});

export default function ExperimentsPage() {
  return (
    <>
      <PageTitle>Experiments</PageTitle>
      <TopLevelSectionPageDescription>
        {getExperimentsHomeDescription()}
      </TopLevelSectionPageDescription>
      <ExperimentsGrid />
    </>
  );
}

function getExperimentsHomeDescription(): string {
  const totalExperiment = getAvailableExperimentDomains().reduce(
    (total, domain) => total + domain.experiments.length,
    0
  );

  return `${totalExperiment} experiments across the TypeScript and React ecosystem.`;
}
