import type { Metadata } from "next";

import ExternalLink from "@/components/ExternalLink";
import { getExperimentMetadata } from "@/data/ExperimentsData";

import IconComparison from "./demo";

export const metadata: Metadata = getExperimentMetadata(
  "ui-explorations",
  "external-link-icons"
);

export default function ExternalLinkIconsPage() {
  return (
    <div className="space-y-20 pb-16">
      <p className="text-muted max-w-2xl text-lg leading-relaxed">
        How little does an icon need to say “go outside”? Try fewer lines,
        shorter arrows, and a lighter footprint beside the same link text.
      </p>
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
  );
}
