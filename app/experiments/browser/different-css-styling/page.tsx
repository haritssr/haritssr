import type { Metadata } from "next";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import Demo from "./demo";

export const metadata: Metadata = getExperimentMetadata(
  "browser",
  "different-css-styling"
);

export default function ExperimentPage() {
  return <Demo />;
}
