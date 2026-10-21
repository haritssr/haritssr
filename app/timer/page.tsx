import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
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
          <InternalLink href="/timer/details" variant="inline">
            Details
          </InternalLink>
          .{" "}
          <InternalLink href="/timer/statistic" variant="inline">
            Statistics
          </InternalLink>
          . <TimerDate />.
        </PageDescription>
      </PageHeader>
      <TimerClient />
    </>
  );
}
