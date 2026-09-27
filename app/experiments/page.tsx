import type { Metadata } from "next";

import ExperimentsGrid from "@/components/ExperimentsGrid";
import PageTitle from "@/components/PageTitle";
import TopLevelSectionPageDescription from "@/components/TopLevelSectionPageDescription";
import { isExperimentAvailable } from "@/utils/databaseExperiments";

import { ExperimentsData } from "../../data/ExperimentsData";

export const metadata: Metadata = {
  title: "Experiments",
  description: getExperimentsHomeDescription(),
};

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
  let totalExperiment = 0;

  for (const experiment of ExperimentsData) {
    totalExperiment += experiment.experiments.filter((entry) =>
      isExperimentAvailable(experiment.slug, entry.slug)
    ).length;
  }

  return `${totalExperiment} experiments across the TypeScript and React ecosystem.`;
}
