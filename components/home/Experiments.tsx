import { ExperimentsData } from "data/ExperimentsData";
import ExperimentsGrid from "@/components/ExperimentsGrid";
import HomeSectionWrapper from "./HomeSectionWrapper";

export default function Experiments() {
  let totalExperiment = 0;

  for (const experiment of ExperimentsData) {
    totalExperiment += experiment.links.length;
  }

  return (
    <HomeSectionWrapper
      explanation={`${totalExperiment} experiments across the TypeScript and React ecosystem.`}
      id="experiments"
      topic="Experiments"
    >
      <ExperimentsGrid />
    </HomeSectionWrapper>
  );
}
