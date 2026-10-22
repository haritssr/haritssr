import type { Metadata } from "next";

import LabPageHeader from "@/app/labs/_components/LabPageHeader";

import "katex/dist/katex.min.css";
import { getLabMetadata } from "@/app/labs/data";
import PageDescription from "@/components/PageDescription";

import DoubleSlitLab from "./double-slit-lab";

export const metadata: Metadata = getLabMetadata(
  "physics",
  "double-slit-interference"
);

export default function DoubleSlitPage() {
  return (
    <div className="pb-24">
      <LabPageHeader>
        <PageDescription>
          Explore bright and dark interference fringes.
        </PageDescription>
      </LabPageHeader>

      <DoubleSlitLab />
    </div>
  );
}
