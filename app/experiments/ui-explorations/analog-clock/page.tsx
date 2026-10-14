import ExperimentPageHeader from "@/components/ExperimentPageHeader";
import PageDescription from "@/components/PageDescription";
import { getExperimentMetadata } from "@/data/ExperimentsData";

import AnalogClock from "./analog-clock";

export const metadata = getExperimentMetadata(
  "ui-explorations",
  "analog-clock"
);

export default function AnalogClockPage() {
  return (
    <div className="pb-24">
      <ExperimentPageHeader>
        <PageDescription>
          A live analog clock, set to your local time.
        </PageDescription>
      </ExperimentPageHeader>
      <AnalogClock />
    </div>
  );
}
