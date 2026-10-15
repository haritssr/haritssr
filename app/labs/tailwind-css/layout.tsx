import type { Metadata } from "next";

import LabDomainLayout from "@/components/LabDomainLayout";
import { getLabDomainMetadata } from "@/data/LabsData";

export const metadata: Metadata = getLabDomainMetadata("tailwind-css");

export default function DomainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LabDomainLayout domain="tailwind-css">{children}</LabDomainLayout>;
}
