import type { Metadata } from "next";

import ExternalLink from "@/components/ExternalLink";
import Section from "@/components/Section";
import SourceCodeLink from "@/components/SourceCodeLink";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import katexify from "@/utils/katexify";

import Demo from "./demo";

export const metadata: Metadata = getExperimentMetadata(
  "katex",
  "equation-annotations",
  {
    description:
      "Annotate equation terms with color, boxes, and labeled underbraces in KaTeX.",
  }
);

export default function EquationAnnotationsPage() {
  return (
    <div className="space-y-20 pb-16">
      <div>
        <p className="text-foreground/80 max-w-3xl text-lg leading-relaxed">
          Use annotations to explain the pieces of an equation. Explore{" "}
          {katexify("F=ma", false)}, Newton’s second law for constant mass, with
          three ways to draw attention to a selected term.
        </p>
        <SourceCodeLink />
      </div>
      <Section title="Explain a term" id="annotations-heading">
        <Demo />
      </Section>
      <Section
        title="Make the meaning visible"
        id="annotations-notes-heading"
        description={
          <>
            Color draws attention, a box isolates a term, and an underbrace adds
            a label below it. The written explanation stays visible in every
            mode, so understanding the selected term does not depend on color.
            Explore KaTeX’s{" "}
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
  );
}
