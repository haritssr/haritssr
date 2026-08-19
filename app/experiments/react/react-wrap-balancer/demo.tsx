"use client";

import Balancer from "react-wrap-balancer";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";

export default function ReactWrapBalancerDemo() {
  return (
    <>
      <SubTitle>React Wrap Balancer</SubTitle>
      <div className="mb-14">
        <SourceCodeLink />
      </div>
      <Balancer>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos similique
        rem eos praesentium odio atque voluptatum, recusandae harum provident
        omnis.
      </Balancer>
    </>
  );
}
