import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import { TimerContent } from "@/components/TimerProvider";
import { createPageMetadata } from "@/utils/pageMetadata";

import TimerDate from "./components/TimerDate";
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
      <PageHeader back={{ href: "/", name: "Home" }} path="/timer">
        <PageTitle>Timer</PageTitle>
        <PageDescription>
          <TimerContent fallback="Jakarta time · WIB">
            <TimerDate />
          </TimerContent>
        </PageDescription>
        <nav aria-label="Timer" className="flex flex-wrap gap-2">
          <InternalLink href="/timer/details">Details</InternalLink>
          <InternalLink href="/timer/statistic">Statistics</InternalLink>
        </nav>
      </PageHeader>
      <TimerContent>
        <TimerClient />
      </TimerContent>
    </>
  );
}
