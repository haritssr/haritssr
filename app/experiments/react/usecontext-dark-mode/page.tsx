import type { Metadata } from "next";

import { getExperimentMetadata } from "@/data/ExperimentsData";

import Demo from "./demo";

export const metadata: Metadata = getExperimentMetadata(
  "react",
  "usecontext-dark-mode"
);

export default function ExperimentPage() {
  return <Demo />;
}
