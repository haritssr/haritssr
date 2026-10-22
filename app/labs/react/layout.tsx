import type { Metadata } from "next";

import LabDomainLayout from "@/app/labs/_components/LabDomainLayout";
import { getLabDomainMetadata } from "@/app/labs/data";

export const metadata: Metadata = getLabDomainMetadata("react");

export default function DomainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LabDomainLayout domain="react">{children}</LabDomainLayout>;
}
