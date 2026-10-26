import { TimerContent } from "@/app/(tools)/timer/_components/TimerProvider";
import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import { createPageMetadata } from "@/utils/metadata/pageMetadata";

import AnalogClock from "./_components/AnalogClock";
import TimerDate from "./_components/TimerDate";
import TimerClient from "./TimerClient";

const description = "A simple timer for focused work and everyday tasks.";

export const metadata = createPageMetadata({
  title: "Timer",
  description,
  path: "/timer",
});

export default function TimerPage() {
  return (
    <>
      <PageHeader
        back={{ href: "/", name: "Home" }}
        path="/timer"
        aside={<AnalogClock className="size-24 sm:size-32" />}
      >
        <PageTitle>Timer</PageTitle>
        <PageDescription>
          <span className="block min-h-lh">
            <TimerContent fallback="Jakarta time · WIB">
              <TimerDate />
            </TimerContent>
          </span>
        </PageDescription>
        <nav aria-label="Timer" className="flex flex-wrap gap-3">
          <InternalLink href="/timer/details">Details</InternalLink>
          <InternalLink href="/timer/statistic">Statistics</InternalLink>
          <InternalLink href="/timer/clock">Clock</InternalLink>
        </nav>
      </PageHeader>
      <TimerContent>
        <TimerClient />
      </TimerContent>
    </>
  );
}
