"use client";

import Balancer from "react-wrap-balancer";
import ExternalLink from "@/components/ExternalLink";
import SubTitle from "@/components/SubTitle";

export default function ReactWrapBalancerDemo() {
  return (
    <>
      <SubTitle>React Wrap Balancer</SubTitle>
      <div className="mb-8">
        <ExternalLink
          href="https://github.com/haritssr/haritssr/tree/try/app/experiments/react/react-wrap-balancer"
          name="Source code"
        />
      </div>
      <Balancer>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos similique
        rem eos praesentium odio atque voluptatum, recusandae harum provident
        omnis.
      </Balancer>
    </>
  );
}
