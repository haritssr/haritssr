import type { Metadata } from "next";

import LabPageHeader from "@/app/labs/_components/LabPageHeader";
import { getLabMetadata } from "@/app/labs/data";
import ExternalLink from "@/components/ExternalLink";
import PageDescription from "@/components/PageDescription";
import Section from "@/components/Section";

import Demo from "./demo";

export const metadata: Metadata = getLabMetadata(
  "mathematics",
  "derivation-stepper"
);

export default function DerivationStepperPage() {
  return (
    <div className="pb-16">
      <LabPageHeader>
        <PageDescription>
          Complete the square, one step at a time.
        </PageDescription>
      </LabPageHeader>
      <div className="space-y-20">
        <Section title="Reveal the reasoning" id="derivation-heading">
          <Demo />
        </Section>
        <Section
          title="Align a chain of equations"
          id="derivation-notes-heading"
          description={
            <>
              Place an ampersand before the relation you want to align, then
              separate lines with a double backslash. The aligned environment
              keeps these relations in one column. This example reveals
              prepared, valid steps; KaTeX handles their presentation. See the{" "}
              <ExternalLink
                href="https://katex.org/docs/supported.html#environments"
                name="alignment environments"
                size="inherit"
              />{" "}
              for other multiline layouts.
            </>
          }
        />
      </div>
    </div>
  );
}
