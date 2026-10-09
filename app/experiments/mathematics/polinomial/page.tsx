import type { Metadata } from "next";

import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";
import { getExperimentMetadata } from "@/data/ExperimentsData";

import PolynomialPractice from "./polynomial-practice";

export const metadata: Metadata = getExperimentMetadata(
  "mathematics",
  "polinomial"
);

export default function PolynomialPage() {
  return (
    <div className="text-foreground pb-24" lang="id">
      <div className="mb-8 max-w-3xl">
        <SubTitle>
          Dari mengenali polinomial hingga menyamakan koefisien. Kerjakan 27
          soal secara bertahap, periksa jawabanmu, dan buka petunjuk saat
          diperlukan.
        </SubTitle>
        <SourceCodeLink />
      </div>
      <PolynomialPractice />
    </div>
  );
}
