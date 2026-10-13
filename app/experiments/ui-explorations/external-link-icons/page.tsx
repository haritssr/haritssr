import type { Metadata } from "next";

import ExperimentPageHeader from "@/components/ExperimentPageHeader";
import ExternalLink from "@/components/ExternalLink";
import PageDescription from "@/components/PageDescription";
import { getExperimentMetadata } from "@/data/ExperimentsData";

import IconComparison from "./demo";

export const metadata: Metadata = getExperimentMetadata(
  "ui-explorations",
  "external-link-icons"
);

export default function ExternalLinkIconsPage() {
  return (
    <div className="pb-16">
      <ExperimentPageHeader>
        <PageDescription>
          How little does an icon need to say “go outside”? Try fewer lines,
          shorter arrows, and a lighter footprint beside the same link text.
        </PageDescription>
      </ExperimentPageHeader>
      <div className="space-y-16">
        <IconComparison
          componentLink={
            <ExternalLink
              href="https://example.com"
              name="Visit website"
              size="inherit"
            />
          }
        />
      </div>
    </div>
  );
}
