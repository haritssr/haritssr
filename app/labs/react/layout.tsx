import type { Metadata } from "next";

import { getLabDomainMetadata } from "@/app/labs/data";
import LabDomainLayout from "@/components/LabDomainLayout";

export const metadata: Metadata = getLabDomainMetadata("react");

export default function DomainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LabDomainLayout domain="react">{children}</LabDomainLayout>;
}
