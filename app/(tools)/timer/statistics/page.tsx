import { TimerContent } from "@/app/(tools)/timer/_components/TimerProvider";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import { createPageMetadata } from "@/utils/metadata/pageMetadata";

import Statistics from "./Statistics";

export const metadata = createPageMetadata({
  title: "Statistics",
  path: "/timer/statistics",
  description:
    "Review daily activities and how you spent your time over 30 days.",
});

export default function TimerStatisticsPage() {
  return (
    <>
      <PageHeader
        back={{ href: "/timer", name: "Timer" }}
        path="/timer/statistics"
      >
        <PageTitle>Statistics</PageTitle>
        <PageDescription>
          Review daily activities and time spent over 30 days.
        </PageDescription>
      </PageHeader>
      <TimerContent>
        <Statistics />
      </TimerContent>
    </>
  );
}
