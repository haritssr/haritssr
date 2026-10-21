import "katex/dist/katex.min.css";
import type { Metadata } from "next";

import { getLabDomainMetadata } from "@/app/labs/data";
import LabDomainLayout from "@/components/LabDomainLayout";

export const metadata: Metadata = getLabDomainMetadata("mathematics");

export default function MathLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LabDomainLayout domain="mathematics">{children}</LabDomainLayout>;
}
