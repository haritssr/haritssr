import type { Metadata } from "next";

import { getExperimentMetadata } from "@/data/ExperimentsData";

import Demo from "./demo";

export const metadata: Metadata = getExperimentMetadata(
  "user-interface",
  "yearly-interest"
);

export default function ExperimentPage() {
  return <Demo />;
}
