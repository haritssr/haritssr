import type { Metadata } from "next";
import ExperimentDomainLayout from "@/components/ExperimentDomainLayout";
import { getExperimentDomainMetadata } from "@/data/ExperimentsData";

export const metadata: Metadata = getExperimentDomainMetadata("react-aria");

export default function DomainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ExperimentDomainLayout domain="react-aria">
      {children}
    </ExperimentDomainLayout>
  );
}
