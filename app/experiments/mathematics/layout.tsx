import "katex/dist/katex.min.css";
import type { Metadata } from "next";

import ExperimentDomainLayout from "@/components/ExperimentDomainLayout";
import { getExperimentDomainMetadata } from "@/data/ExperimentsData";

export const metadata: Metadata = getExperimentDomainMetadata("mathematics");

export default function MathLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ExperimentDomainLayout domain="mathematics">
      {children}
    </ExperimentDomainLayout>
  );
}
