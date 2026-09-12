import type { Metadata } from "next";

import ExperimentDomainLayout from "@/components/ExperimentDomainLayout";
import { getExperimentDomainMetadata } from "@/data/ExperimentsData";

export const metadata: Metadata = getExperimentDomainMetadata("react-table");

export default function DomainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ExperimentDomainLayout domain="react-table">
      {children}
    </ExperimentDomainLayout>
  );
}
