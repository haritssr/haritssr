import type { Metadata } from "next";

import LabDomainLayout from "@/app/labs/_components/LabDomainLayout";
import { getLabDomainMetadata } from "@/app/labs/data";

export const metadata: Metadata = getLabDomainMetadata("tailwind-css");

export default function DomainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LabDomainLayout domain="tailwind-css">{children}</LabDomainLayout>;
}
