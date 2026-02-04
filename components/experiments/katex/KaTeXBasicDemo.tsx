"use client";

import SubTitle from "@/components/SubTitle";
import katexify from "../../../utils/katexify";

export default function KaTeXBasicDemo() {
  return (
    <>
      <SubTitle>Basic example</SubTitle>
      {katexify(
        "\\text{house-price} = \\hat{\\beta_1} * sqft + \\hat{\\beta_0}",
        false
      )}
    </>
  );
}
