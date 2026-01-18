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
      explanation={`${totalExperiment} unique individual (per page) experiments across TypeScript-React ecosystem stack and collection of common user interfaces on the mobile and desktop web.`}
      id="experiments"
      topic="Experiments"
    >
      <ExperimentsGrid />
    </HomeSectionWrapper>
  );
}
