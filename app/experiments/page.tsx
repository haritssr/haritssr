import type { Metadata } from "next";
import ExperimentsGrid from "@/components/ExperimentsGrid";
import PageDescription from "@/components/PageDescription";
import PageTitle from "@/components/PageTitle";
import { ExperimentsData } from "../../data/ExperimentsData";

function getExperimentsHomeDescription(): string {
  let totalExperiment = 0;

  for (const experiment of ExperimentsData) {
    totalExperiment += experiment.experiments.length;
  }

  return `${totalExperiment} experiments across the TypeScript and React ecosystem.`;
}

export const metadata: Metadata = {
  title: "Experiments",
  description: getExperimentsHomeDescription(),
};

export default function ExperimentsPage() {
  return (
    <>
      <PageTitle title="Experiments" />
      <PageDescription description={getExperimentsHomeDescription()} />
      <ExperimentsGrid />
    </>
  );
}
