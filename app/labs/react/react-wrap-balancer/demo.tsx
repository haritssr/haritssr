"use client";

import Balancer from "react-wrap-balancer";

import LabPageHeader from "@/components/LabPageHeader";
import PageDescription from "@/components/PageDescription";

export default function ReactWrapBalancerDemo() {
  return (
    <>
      <LabPageHeader>
        <PageDescription>React Wrap Balancer</PageDescription>
      </LabPageHeader>

      <Balancer>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos similique
        rem eos praesentium odio atque voluptatum, recusandae harum provident
        omnis.
      </Balancer>
    </>
  );
}
