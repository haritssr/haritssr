"use client";

import Section from "@/components/Section";
import SubTitle from "@/components/SubTitle";
import katexify from "@/utils/katexify";

export default function KaTeXBasicDemo() {
  return (
    <div className="min-w-0 space-y-20">
      <div className="max-w-full">
        <SubTitle>Basic example</SubTitle>
      </div>
      <Section className="max-w-full min-w-0" title="Render a formula">
        <div className="max-w-full overflow-x-auto py-1">
          {katexify(
            "\\text{house-price} = \\hat{\\beta_1} * sqft + \\hat{\\beta_0}",
            false
          )}
        </div>
      </Section>
    </div>
  );
}
