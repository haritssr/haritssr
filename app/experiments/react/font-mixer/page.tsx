import type { Metadata } from "next";

import { getExperimentMetadata } from "@/data/ExperimentsData";

import Demo from "./demo";

export const metadata: Metadata = getExperimentMetadata("react", "font-mixer");

export default function ExperimentPage() {
  return <Demo />;
}
