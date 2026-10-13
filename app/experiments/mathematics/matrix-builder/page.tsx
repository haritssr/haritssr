import type { Metadata } from "next";

import ExperimentPageHeader from "@/components/ExperimentPageHeader";
import ExternalLink from "@/components/ExternalLink";
import PageDescription from "@/components/PageDescription";
import Section from "@/components/Section";
import { getExperimentMetadata } from "@/data/ExperimentsData";

import Demo from "./demo";

export const metadata: Metadata = getExperimentMetadata(
  "mathematics",
  "matrix-builder"
);

export default function MatrixBuilderPage() {
  return (
    <div className="pb-16">
      <ExperimentPageHeader>
        <PageDescription>
          Build a matrix from individual entries. Change its size and brackets
          to see how the same values become different TeX environments.
        </PageDescription>
      </ExperimentPageHeader>
      <div className="space-y-16">
        <Section title="Build a matrix" id="matrix-heading">
          <Demo />
        </Section>
        <Section
          className="max-w-full"
          title="Rows, columns, and delimiters"
          id="matrix-notes-heading"
          description={
            <>
              Ampersands separate columns, and a double backslash starts a new
              row. The pmatrix environment uses parentheses; bmatrix uses square
              brackets. KaTeX sizes the delimiters to fit the entries. Read
              about{" "}
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
    </div>
  );
}
