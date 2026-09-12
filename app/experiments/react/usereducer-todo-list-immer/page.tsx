import type { Metadata } from "next";

import { getExperimentMetadata } from "@/data/ExperimentsData";

import Demo from "./demo";

export const metadata: Metadata = getExperimentMetadata(
  "react",
  "usereducer-todo-list-immer"
);

export default function ExperimentPage() {
  return <Demo />;
}
