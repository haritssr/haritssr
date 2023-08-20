import ExperimentsGrid from "@/components/ExperimentsGrid";
import Wrapper from "./Wrapper";
import { ExperimentsData } from "data/ExperimentsData";

export default function Experiments() {
  
  let totalExperiment = 0
  for(let i = 0; i < ExperimentsData.length; i++){
    totalExperiment += ExperimentsData[i].links.length
  }

  return (
    <Wrapper
      id="experiments"
      topic="Experiments"
      explanation={`${totalExperiment} unique individual (per page) experiments across Javascript-React ecosystem stack`}
    >
      <ExperimentsGrid />
    </Wrapper>
  );
}
