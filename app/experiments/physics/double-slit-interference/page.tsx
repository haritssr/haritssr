import "katex/dist/katex.min.css";
import type { Metadata } from "next";

import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";
import { getExperimentMetadata } from "@/data/ExperimentsData";

import DoubleSlitLab from "./double-slit-lab";

export const metadata: Metadata = getExperimentMetadata(
  "physics",
  "double-slit-interference"
);

export default function DoubleSlitPage() {
  return (
    <div className="pb-24">
      <div className="max-w-full">
        <SubTitle>
          Send one color of light through two narrow openings. Change the setup,
          then measure how the bright and dark fringes move across the screen.
        </SubTitle>
        <SourceCodeLink />
      </div>
      <DoubleSlitLab />
    </div>
  );
}
