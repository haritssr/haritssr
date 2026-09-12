import type { Metadata } from "next";

import ExperimentDomainLayout from "@/components/ExperimentDomainLayout";
import { getExperimentDomainMetadata } from "@/data/ExperimentsData";

export const metadata: Metadata = getExperimentDomainMetadata("nextjs");

export default function DomainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ExperimentDomainLayout domain="nextjs">{children}</ExperimentDomainLayout>
  );
}
