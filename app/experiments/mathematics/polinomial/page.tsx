import type { Metadata } from "next";

import ExperimentPageHeader from "@/components/ExperimentPageHeader";
import PageDescription from "@/components/PageDescription";
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
          Dari mengenali polinomial hingga menyamakan koefisien. Kerjakan 27
          soal secara bertahap, periksa jawabanmu, dan buka petunjuk saat
          diperlukan.
        </PageDescription>
      </ExperimentPageHeader>
      <div className="space-y-16">
        <PolynomialPractice />
      </div>
    </div>
  );
}
