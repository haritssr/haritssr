import type { Metadata } from "next";

import { getExperimentMetadata } from "@/data/ExperimentsData";

import Demo from "./demo";

export const metadata: Metadata = getExperimentMetadata(
  "react",
  "react-use-reducer-july-2026"
);

export default function ExperimentPage() {
  return <Demo />;
}
