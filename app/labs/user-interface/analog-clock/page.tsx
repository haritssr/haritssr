import LabPageHeader from "@/app/labs/_components/LabPageHeader";
import { getLabMetadata } from "@/app/labs/data";
import PageDescription from "@/components/PageDescription";

import AnalogClock from "./analog-clock";

export const metadata = getLabMetadata("user-interface", "analog-clock");

export default function AnalogClockPage() {
  return (
    <div className="pb-24">
      <LabPageHeader>
        <PageDescription>
          A live analog clock, set to your local time.
        </PageDescription>
      </LabPageHeader>
      <AnalogClock />
    </div>
  );
}
