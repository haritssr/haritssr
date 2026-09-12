import ExperimentsGrid from "@/components/ExperimentsGrid";

import HomeSectionWrapper from "./HomeSectionWrapper";

export default function Experiments() {
  return (
    <HomeSectionWrapper id="experiments" topic="Experiments">
      <ExperimentsGrid mobileLimit={4} />
    </HomeSectionWrapper>
  );
}
