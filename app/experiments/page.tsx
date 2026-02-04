import { ExperimentsData } from "data/ExperimentsData";
import type { Metadata } from "next";
import ExperimentsGrid from "@/components/ExperimentsGrid";
import { PageTitle } from "@/components/SubTitle";

export const metadata: Metadata = {
  title: "Experiments",
  description: "JavaScript-React ecosystem stack experiments",
};

export default function ExperimentsPage() {
  let totalExperiment = 0;

  for (const experiment of ExperimentsData) {
    totalExperiment += experiment.links.length;
  }

  return (
    <>
      <PageTitle
        description={`${totalExperiment} unique individual (per page) experiments across Javascript-React ecosystem stack`}
        title="Experiments"
      />
      <ExperimentsGrid />
    </>
  );
}
