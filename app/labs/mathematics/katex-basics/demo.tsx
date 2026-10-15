"use client";

import LabPageHeader from "@/components/LabPageHeader";
import PageDescription from "@/components/PageDescription";
import Section from "@/components/Section";
import katexify from "@/utils/katexify";

export default function KaTeXBasicDemo() {
  return (
    <div className="min-w-0">
      <LabPageHeader>
        <PageDescription>
          Render inline and display math with KaTeX.
        </PageDescription>
      </LabPageHeader>
      <div className="space-y-20">
        <Section className="max-w-full min-w-0" title="Render a formula">
          <div className="max-w-full overflow-x-auto py-1">
            {katexify(
              "\\text{house-price} = \\hat{\\beta_1} * sqft + \\hat{\\beta_0}",
              false
            )}
          </div>
        </Section>
      </div>
    </div>
  );
}
