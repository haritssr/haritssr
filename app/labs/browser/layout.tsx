import type { Metadata } from "next";

import LabDomainLayout from "@/components/LabDomainLayout";
import { getLabDomainMetadata } from "@/data/LabsData";

export const metadata: Metadata = getLabDomainMetadata("browser");

export default function DomainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LabDomainLayout domain="browser">{children}</LabDomainLayout>;
}
