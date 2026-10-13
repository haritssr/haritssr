import type { Metadata } from "next";

import ExperimentsGrid from "@/components/ExperimentsGrid";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
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
      <PageHeader>
        <PageTitle>Experiments</PageTitle>
        <PageDescription>{experimentsHomeDescription}</PageDescription>
      </PageHeader>
      <ExperimentsGrid />
    </>
  );
}

function getExperimentsHomeDescription(): string {
  const totalExperiments = getAvailableExperimentCount();
  const experimentLabel = totalExperiments === 1 ? "experiment" : "experiments";

  return `${totalExperiments} ${experimentLabel} in frontend development, browser APIs, mathematics, and physics.`;
}
