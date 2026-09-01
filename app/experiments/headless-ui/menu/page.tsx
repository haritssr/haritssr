import type { Metadata } from "next";

import { getExperimentMetadata } from "@/data/ExperimentsData";

import Demo from "./demo";

export const metadata: Metadata = getExperimentMetadata("headless-ui", "menu");

export default function ExperimentPage() {
  return <Demo />;
}
