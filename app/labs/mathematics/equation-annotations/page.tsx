import type { Metadata } from "next";

import { getLabMetadata } from "@/app/labs/data";
import ExternalLink from "@/components/ExternalLink";
import LabPageHeader from "@/components/LabPageHeader";
import PageDescription from "@/components/PageDescription";
import Section from "@/components/Section";

import Demo from "./demo";

export const metadata: Metadata = getLabMetadata(
  "mathematics",
  "equation-annotations"
);

export default function EquationAnnotationsPage() {
  return (
    <div className="pb-16">
      <LabPageHeader>
        <PageDescription>
          Explain equation terms with colors and labels.
        </PageDescription>
      </LabPageHeader>
      <div className="space-y-20">
        <Section title="Explain a term" id="annotations-heading">
          <Demo />
        </Section>
        <Section
          title="Make the meaning visible"
          id="annotations-notes-heading"
          description={
            <>
              Color draws attention, a box isolates a term, and an underbrace
              adds a label below it. The written explanation stays visible in
              every mode, so understanding the selected term does not depend on
              color. Explore KaTeX’s{" "}
              <ExternalLink
                href="https://katex.org/docs/supported.html#accents"
                name="brace annotations"
                size="inherit"
              />{" "}
              and{" "}
              <ExternalLink
                href="https://katex.org/docs/supported.html#color"
                name="color commands"
                size="inherit"
              />{" "}
              for more possibilities.
            </>
          }
        />
      </div>
    </div>
  );
}
