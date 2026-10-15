import type { Metadata } from "next";

import LabPageHeader from "@/components/LabPageHeader";
import PageDescription from "@/components/PageDescription";
import Section from "@/components/Section";
import { getLabMetadata } from "@/data/LabsData";

import PolynomialPractice from "./polynomial-practice";

export const metadata: Metadata = getLabMetadata("mathematics", "polinomial");

export default function PolynomialPage() {
  return (
    <div className="text-foreground pb-24" lang="id">
      <LabPageHeader>
        <PageDescription>
          Latihan soal polinomial dengan pembahasan.
        </PageDescription>
      </LabPageHeader>
      <div className="space-y-20">
        <Section id="polynomial-practice" title="Latihan polinomial">
          <PolynomialPractice />
        </Section>
      </div>
    </div>
  );
}
