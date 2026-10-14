import type { Metadata } from "next";

import ExperimentPageHeader from "@/components/ExperimentPageHeader";
import PageDescription from "@/components/PageDescription";
import Section from "@/components/Section";
import { getExperimentMetadata } from "@/data/ExperimentsData";

import PolynomialPractice from "./polynomial-practice";

export const metadata: Metadata = getExperimentMetadata(
  "mathematics",
  "polinomial"
);

export default function PolynomialPage() {
  return (
    <div className="text-foreground pb-24" lang="id">
      <ExperimentPageHeader>
        <PageDescription>
          Latihan soal polinomial dengan pembahasan.
        </PageDescription>
      </ExperimentPageHeader>
      <div className="space-y-20">
        <Section id="polynomial-practice" title="Latihan polinomial">
          <PolynomialPractice />
        </Section>
      </div>
    </div>
  );
}
