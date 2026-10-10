import type { Metadata } from "next";

import ExternalLink from "@/components/ExternalLink";
import Section from "@/components/Section";
import SourceCodeLink from "@/components/SourceCodeLink";
import { getExperimentMetadata } from "@/data/ExperimentsData";

import Demo from "./demo";

export const metadata: Metadata = getExperimentMetadata(
  "mathematics",
  "piecewise-functions",
  {
    description:
      "Explore 13 piecewise functions with cases notation, interactive evaluation, and graphs.",
  }
);

export default function PiecewiseFunctionsPage() {
  return (
    <div className="space-y-20 pb-16">
      <div>
        <p className="text-foreground/80 max-w-3xl text-lg leading-relaxed">
          A piecewise function chooses a rule according to its input. Move the
          slider across each boundary to see the active branch and result while
          KaTeX displays the complete definition.
        </p>
        <SourceCodeLink />
      </div>
      <Section title="Explore the branches" id="piecewise-heading">
        <Demo />
      </Section>
      <Section
        title="Typeset conditions with cases"
        id="piecewise-notes-heading"
        description={
          <>
            The cases environment pairs each expression with its condition under
            one opening brace. Include equality in the appropriate condition so
            the definition covers its boundary. Choose from 13 examples,
            including pulses, step functions, and loss functions. JavaScript
            evaluates them; KaTeX renders the definition and result. See{" "}
            <ExternalLink
              href="https://katex.org/docs/supported.html#environments"
              name="cases notation"
              size="inherit"
            />{" "}
            for the underlying TeX syntax.
          </>
        }
      />
    </div>
  );
}
