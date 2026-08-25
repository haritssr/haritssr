import type { Metadata } from "next";
import ExperimentDomainLayout from "@/components/ExperimentDomainLayout";
import { getExperimentDomainMetadata } from "@/data/ExperimentsData";

export const metadata: Metadata =
  getExperimentDomainMetadata("ui-explorations");

export default function DomainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ExperimentDomainLayout domain="ui-explorations">
      {children}
    </ExperimentDomainLayout>
  );
}
