import Link from "next/link";

import { TimerContent } from "@/app/(tools)/timer/_components/TimerProvider";
import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import { createPageMetadata } from "@/utils/metadata/pageMetadata";

import AnalogClock from "./_components/AnalogClock";
import TimerClient from "./TimerClient";

const description = "Schedule and time daily tasks.";

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
        aside={
          <Link
            aria-label="Open the full clock"
            className="focus-visible:outline-action block w-fit rounded-full focus-visible:outline-2 focus-visible:outline-offset-4"
            href="/timer/clock"
            prefetch={false}
            title="Open clock"
          >
            <AnalogClock className="size-22 sm:size-26" />
          </Link>
        }
      >
        <PageTitle>Timer</PageTitle>
        <PageDescription>{description}</PageDescription>
        <nav aria-label="Timer" className="flex flex-wrap gap-3">
          <InternalLink href="/timer/details">Details</InternalLink>
          <InternalLink href="/timer/statistics">Statistics</InternalLink>
        </nav>
      </PageHeader>
      <TimerContent>
        <TimerClient />
      </TimerContent>
    </>
  );
}
