import type { Metadata } from "next";

import ExperimentPageHeader from "@/components/ExperimentPageHeader";
import PageDescription from "@/components/PageDescription";
import { getExperimentMetadata } from "@/data/ExperimentsData";

import GraphView from "./GraphView";

const DESCRIPTION =
  "A graph representation of the student problems mapped to HL features in Notion.";

export const metadata: Metadata = getExperimentMetadata(
  "user-interface",
  "masalah-to-feature",
  { description: DESCRIPTION }
);

export default function MasalahToFeaturePage() {
  return (
    <>
      <ExperimentPageHeader>
        <PageDescription>{DESCRIPTION}</PageDescription>
      </ExperimentPageHeader>

      <GraphView />
    </>
  );
}
