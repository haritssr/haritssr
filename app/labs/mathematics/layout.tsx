import "katex/dist/katex.min.css";
import type { Metadata } from "next";

import LabDomainLayout from "@/app/labs/_components/LabDomainLayout";
import { getLabDomainMetadata } from "@/app/labs/data";

export const metadata: Metadata = getLabDomainMetadata("mathematics");

export default function MathLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LabDomainLayout domain="mathematics">{children}</LabDomainLayout>;
}
