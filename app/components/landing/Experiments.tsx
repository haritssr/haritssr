import ExperimentsGrid from "@/components/ExperimentsGrid";
import Wrapper from "./Wrapper";

export default function Experiments() {
  return (
    <Wrapper
      id="experiments"
      topic="Experiments"
      explanation="My experiments across JavaScript and React ecosystem stack"
    >
      <ExperimentsGrid />
    </Wrapper>
  );
}
