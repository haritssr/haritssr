import { getExperimentsHomeDescription } from "data/PageDescriptions";
import ExperimentsGrid from "@/components/ExperimentsGrid";
import HomeSectionWrapper from "./HomeSectionWrapper";

export default function Experiments() {
  return (
    <HomeSectionWrapper
      explanation={getExperimentsHomeDescription()}
      id="experiments"
      topic="Experiments"
    >
      <ExperimentsGrid />
    </HomeSectionWrapper>
  );
}
