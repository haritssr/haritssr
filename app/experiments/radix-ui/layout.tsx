import type { Metadata } from "next";
import { getExperimentDomainMetadata } from "@/data/ExperimentsData";
import ExperimentDomainLayout from "../_components/ExperimentDomainLayout";

export const metadata: Metadata = getExperimentDomainMetadata("radix-ui");

export default function DomainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ExperimentDomainLayout domain="radix-ui">
      {children}
    </ExperimentDomainLayout>
  );
}
