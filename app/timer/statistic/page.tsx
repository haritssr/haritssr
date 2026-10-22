import { TimerContent } from "@/app/timer/_components/TimerProvider";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import { createPageMetadata } from "@/utils/pageMetadata";

import Statistics from "./Statistics";

export const metadata = createPageMetadata({
  title: "Statistics",
  path: "/timer/statistic",
  description:
    "Review daily activities and how you spent your time over 30 days.",
});

export default function TimerStatisticsPage() {
  return (
    <>
      <PageHeader
        back={{ href: "/timer", name: "Timer" }}
        path="/timer/statistic"
      >
        <PageTitle>Statistics</PageTitle>
        <PageDescription>
          See where your time went. Choose a day to review its activities and
          the previous 30 days of time spent.
        </PageDescription>
      </PageHeader>
      <TimerContent>
        <Statistics />
      </TimerContent>
    </>
  );
}
