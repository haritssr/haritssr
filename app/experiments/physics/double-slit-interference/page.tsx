import type { Metadata } from "next";

import ExperimentPageHeader from "@/components/ExperimentPageHeader";

import "katex/dist/katex.min.css";
import PageDescription from "@/components/PageDescription";
import { getExperimentMetadata } from "@/data/ExperimentsData";

import DoubleSlitLab from "./double-slit-lab";

export const metadata: Metadata = getExperimentMetadata(
  "physics",
  "double-slit-interference"
);

export default function DoubleSlitPage() {
  return (
    <div className="pb-24">
      <ExperimentPageHeader>
        <PageDescription>
          Explore bright and dark interference fringes.
        </PageDescription>
      </ExperimentPageHeader>

      <DoubleSlitLab />
    </div>
  );
}
