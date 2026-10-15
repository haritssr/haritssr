import type { Metadata } from "next";

import LabDomainLayout from "@/components/LabDomainLayout";
import { getLabDomainMetadata } from "@/data/LabsData";

export const metadata: Metadata = getLabDomainMetadata("nextjs");

export default function DomainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LabDomainLayout domain="nextjs">{children}</LabDomainLayout>;
}
