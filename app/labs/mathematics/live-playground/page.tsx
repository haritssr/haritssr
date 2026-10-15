import type { Metadata } from "next";

import ExternalLink from "@/components/ExternalLink";
import LabPageHeader from "@/components/LabPageHeader";
import PageDescription from "@/components/PageDescription";
import Section from "@/components/Section";
import { getLabMetadata } from "@/data/LabsData";

import Demo from "./demo";

export const metadata: Metadata = getLabMetadata(
  "mathematics",
  "live-playground"
);

export default function LivePlaygroundPage() {
  return (
    <div className="pb-16">
      <LabPageHeader>
        <PageDescription>
          Write TeX and preview equations as you type.
        </PageDescription>
      </LabPageHeader>
      <div className="space-y-20">
        <Section title="Try your own notation" id="playground-heading">
          <Demo />
        </Section>
        <Section
          title="Inline and display math"
          id="playground-notes-heading"
          description={
            <>
              Inline mode fits equations into a line of text. Display mode
              centers a standalone equation and gives large operators more room.
              Enter TeX directly, without dollar-sign delimiters. KaTeX typesets
              expressions; it does not solve or evaluate them. Explore the{" "}
              <ExternalLink
                href="https://katex.org/docs/supported.html"
                name="supported TeX functions"
                size="inherit"
              />{" "}
              for more notation to try.
            </>
          }
        />
      </div>
    </div>
  );
}
