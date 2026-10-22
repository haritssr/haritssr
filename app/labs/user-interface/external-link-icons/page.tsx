import type { Metadata } from "next";

import LabPageHeader from "@/app/labs/_components/LabPageHeader";
import { getLabMetadata } from "@/app/labs/data";
import ExternalLink from "@/components/ExternalLink";
import PageDescription from "@/components/PageDescription";

import IconComparison from "./demo";

export const metadata: Metadata = getLabMetadata(
  "user-interface",
  "external-link-icons"
);

export default function ExternalLinkIconsPage() {
  return (
    <div className="pb-16">
      <LabPageHeader>
        <PageDescription>
          How little does an icon need to say “go outside”? Try fewer lines,
          shorter arrows, and a lighter footprint beside the same link text.
        </PageDescription>
      </LabPageHeader>
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
