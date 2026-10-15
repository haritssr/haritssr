import type { Metadata } from "next";

import ExternalLink from "@/components/ExternalLink";
import LabPageHeader from "@/components/LabPageHeader";
import PageDescription from "@/components/PageDescription";
import Section from "@/components/Section";
import { getLabMetadata } from "@/data/LabsData";

import Demo from "./demo";

export const metadata: Metadata = getLabMetadata(
  "mathematics",
  "matrix-builder"
);

export default function MatrixBuilderPage() {
  return (
    <div className="pb-16">
      <LabPageHeader>
        <PageDescription>
          Build a matrix and generate its TeX notation.
        </PageDescription>
      </LabPageHeader>
      <div className="space-y-20">
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
