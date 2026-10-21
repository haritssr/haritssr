import type { Metadata } from "next";

import { getLabMetadata } from "@/app/labs/data";
import LabPageHeader from "@/components/LabPageHeader";
import PageDescription from "@/components/PageDescription";

import GraphView from "./GraphView";

const DESCRIPTION =
  "A graph representation of the student problems mapped to HL features in Notion.";

export const metadata: Metadata = getLabMetadata(
  "user-interface",
  "masalah-to-feature",
  { description: DESCRIPTION }
);

export default function MasalahToFeaturePage() {
  return (
    <>
      <LabPageHeader>
        <PageDescription>{DESCRIPTION}</PageDescription>
      </LabPageHeader>

      <GraphView />
    </>
  );
}
