"use client";

import ExternalLink from "@/components/ExternalLink";
import SubTitle from "@/components/SubTitle";
import katexify from "@/utils/katexify";

export default function KaTeXBasicDemo() {
  return (
    <>
      <SubTitle>Basic example</SubTitle>
      <div className="mb-8">
        <ExternalLink
          href="https://github.com/haritssr/haritssr/tree/try/app/experiments/katex/basic"
          name="Source code"
        />
      </div>
      {katexify(
        "\\text{house-price} = \\hat{\\beta_1} * sqft + \\hat{\\beta_0}",
        false
      )}
    </>
  );
}
