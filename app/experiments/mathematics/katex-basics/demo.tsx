"use client";

import ExperimentPageHeader from "@/components/ExperimentPageHeader";
import PageDescription from "@/components/PageDescription";
import Section from "@/components/Section";
import katexify from "@/utils/katexify";

export default function KaTeXBasicDemo() {
  return (
    <div className="min-w-0">
      <ExperimentPageHeader>
        <PageDescription>Basic example</PageDescription>
      </ExperimentPageHeader>
      <div className="space-y-16">
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
