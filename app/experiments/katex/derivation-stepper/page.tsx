import type { Metadata } from "next";

import ExternalLink from "@/components/ExternalLink";
import Section from "@/components/Section";
import SourceCodeLink from "@/components/SourceCodeLink";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import katexify from "@/utils/katexify";

import Demo from "./demo";

export const metadata: Metadata = getExperimentMetadata(
  "katex",
  "derivation-stepper",
  {
    description:
      "Reveal an aligned completing-the-square derivation one step at a time with KaTeX.",
  }
);

export default function DerivationStepperPage() {
  return (
    <div className="space-y-20 pb-16">
      <div>
        <p className="text-foreground/80 max-w-3xl text-lg leading-relaxed">
          Follow a solution of {katexify("x^2+6x+5=0", false)} by completing the
          square. Reveal each transformation and see how KaTeX keeps the
          equations aligned as the derivation grows.
        </p>
        <SourceCodeLink />
      </div>
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
            keeps these relations in one column. This example reveals prepared,
            valid steps; KaTeX handles their presentation. See the{" "}
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
  );
}
