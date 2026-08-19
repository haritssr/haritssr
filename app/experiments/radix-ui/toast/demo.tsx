"use client";

import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import SubTitle from "@/components/SubTitle";

export default function RadixToastDemo() {
  return (
    <>
      <SubTitle>
        <ExternalLink
          href="https://www.radix-ui.com/docs/primitives/components/toast"
          name="Radix UI Toast"
        />
        <ExplanationList>
          <li>A succinct message that is displayed temporarily.</li>
          <li>
            Click and come up on right bottom, click undo or close to dissapear.
          </li>
        </ExplanationList>
      </SubTitle>
      <div className="mb-14">
        <ExternalLink
          href="https://github.com/haritssr/haritssr/tree/try/app/experiments/radix-ui/toast"
          name="Source code"
        />
      </div>
    </>
  );
}
