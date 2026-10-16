import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import { createPageMetadata } from "@/utils/pageMetadata";

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
          Make room for what matters. Focus on one activity, batch everyday
          tasks, and guard your time.
        </PageDescription>
        <div className="flex flex-wrap gap-5">
          <InternalLink href="/timer/statistic">Statistics</InternalLink>
          <InternalLink href="/timer/details">Details</InternalLink>
        </div>
      </PageHeader>
      <TimerClient />
    </>
  );
}
