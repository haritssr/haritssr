import type { Metadata } from "next";

import LabPageHeader from "@/app/labs/_components/LabPageHeader";
import { getLabMetadata } from "@/app/labs/data";
import ExternalLink from "@/components/ExternalLink";
import PageDescription from "@/components/PageDescription";
import Section from "@/components/Section";

import Demo from "./demo";

export const metadata: Metadata = getLabMetadata(
  "mathematics",
  "piecewise-functions"
);

export default function PiecewiseFunctionsPage() {
  return (
    <div className="pb-16">
      <LabPageHeader>
        <PageDescription>
          Explore functions with different rules by interval.
        </PageDescription>
      </LabPageHeader>
      <div className="space-y-20">
        <Section title="Explore the branches" id="piecewise-heading">
          <Demo />
        </Section>
        <Section
          title="Typeset conditions with cases"
          id="piecewise-notes-heading"
          description={
            <>
              The cases environment pairs each expression with its condition
              under one opening brace. Include equality in the appropriate
              condition so the definition covers its boundary. Choose from 13
              examples, including pulses, step functions, and loss functions.
              JavaScript evaluates them; KaTeX renders the definition and
              result. See{" "}
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
    </div>
  );
}
