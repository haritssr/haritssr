import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";

import ExperimentExplorer from "@/components/ExperimentExplorer";
import ExperimentResults from "@/components/ExperimentResults";
import ExperimentsGrid from "@/components/ExperimentsGrid";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import TopLevelSectionPageDescription from "@/components/TopLevelSectionPageDescription";
import {
  getAvailableExperimentDomains,
  getAvailableExperimentSummaries,
} from "@/utils/experimentCatalog";
import { createPageMetadata } from "@/utils/pageMetadata";

export const metadata: Metadata = createPageMetadata({
  path: "/experiments",
  title: "Experiments",
  description: getExperimentsHomeDescription(),
});

export default function ExperimentsPage() {
  const items = getAvailableExperimentSummaries();
  return (
    <>
      <PageTitle>Experiments</PageTitle>
      <TopLevelSectionPageDescription>
        {getExperimentsHomeDescription()}
      </TopLevelSectionPageDescription>
      <ExperimentsGrid />
      <section className="mt-20 pb-16" aria-labelledby="explore-experiments">
        <Section id="explore-experiments" name="Explore all experiments" />
        <NuqsAdapter>
          <Suspense fallback={<ExperimentResults items={items} />}>
            <ExperimentExplorer items={items} />
          </Suspense>
        </NuqsAdapter>
      </section>
    </>
  );
}

function getExperimentsHomeDescription(): string {
  const totalExperiment = getAvailableExperimentDomains().reduce(
    (total, domain) => total + domain.experiments.length,
    0
  );

  return `${totalExperiment} experiments in frontend development, browser APIs, mathematics, and physics.`;
}
