import type { Metadata } from "next";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import Demo from "./demo";

export const metadata: Metadata = getExperimentMetadata(
  "tailwind-css",
  "tailwind-vs-apple-color"
);

export default function ExperimentPage() {
  return <Demo />;
}
