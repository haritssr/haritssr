"use client";

import Balancer from "react-wrap-balancer";

import ExperimentPageHeader from "@/components/ExperimentPageHeader";
import PageDescription from "@/components/PageDescription";

export default function ReactWrapBalancerDemo() {
  return (
    <>
      <ExperimentPageHeader>
        <PageDescription>React Wrap Balancer</PageDescription>
      </ExperimentPageHeader>

      <Balancer>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos similique
        rem eos praesentium odio atque voluptatum, recusandae harum provident
        omnis.
      </Balancer>
    </>
  );
}
