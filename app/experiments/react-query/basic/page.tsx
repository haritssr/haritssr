import type { Metadata } from "next";

import { getExperimentMetadata } from "@/data/ExperimentsData";

import Demo from "./demo";

export const metadata: Metadata = getExperimentMetadata("react-query", "basic");

export default function ExperimentPage() {
  return <Demo />;
}
