import type { Metadata } from "next";

import ExperimentsGrid from "@/components/ExperimentsGrid";
import PageTitle from "@/components/PageTitle";
import TopLevelSectionPageDescription from "@/components/TopLevelSectionPageDescription";
import { getAvailableExperimentCount } from "@/utils/experimentCatalog";
import { createPageMetadata } from "@/utils/pageMetadata";

const experimentsHomeDescription = getExperimentsHomeDescription();

export const metadata: Metadata = createPageMetadata({
  path: "/experiments",
  title: "Experiments",
  description: experimentsHomeDescription,
});

export default function ExperimentsPage() {
  return (
    <>
      <PageTitle>Experiments</PageTitle>
      <TopLevelSectionPageDescription>
        {experimentsHomeDescription}
      </TopLevelSectionPageDescription>
      <ExperimentsGrid />
    </>
  );
}

function getExperimentsHomeDescription(): string {
  const totalExperiments = getAvailableExperimentCount();
  const experimentLabel = totalExperiments === 1 ? "experiment" : "experiments";

  return `${totalExperiments} ${experimentLabel} in frontend development, browser APIs, mathematics, and physics.`;
}
