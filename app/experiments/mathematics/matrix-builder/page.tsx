import type { Metadata } from "next";

import ExternalLink from "@/components/ExternalLink";
import Section from "@/components/Section";
import SourceCodeLink from "@/components/SourceCodeLink";
import { getExperimentMetadata } from "@/data/ExperimentsData";

import Demo from "./demo";

export const metadata: Metadata = getExperimentMetadata(
  "mathematics",
  "matrix-builder",
  {
    description:
      "Build an editable matrix and explore KaTeX matrix environments and delimiters.",
  }
);

export default function MatrixBuilderPage() {
  return (
    <div className="space-y-20 pb-16">
      <div>
        <p className="text-foreground/80 max-w-3xl text-lg leading-relaxed">
          Build a matrix from individual entries. Change its size and brackets
          to see how the same values become different TeX environments.
        </p>
        <SourceCodeLink />
      </div>
      <Section title="Build a matrix" id="matrix-heading">
        <Demo />
      </Section>
      <Section
        title="Rows, columns, and delimiters"
        id="matrix-notes-heading"
        description={
          <>
            Ampersands separate columns, and a double backslash starts a new
            row. The pmatrix environment uses parentheses; bmatrix uses square
            brackets. KaTeX sizes the delimiters to fit the entries. Read about{" "}
            <ExternalLink
              href="https://katex.org/docs/supported.html#environments"
              name="matrix environments"
              size="inherit"
            />{" "}
            to explore other styles.
          </>
        }
      />
    </div>
  );
}
