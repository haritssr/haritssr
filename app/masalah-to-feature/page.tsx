import type { Metadata } from "next";
import PageDescription from "@/components/PageDescription";
import PageTitle from "@/components/PageTitle";
import GraphView from "./GraphView";

const DESCRIPTION =
  "A graph representation of the student problems mapped to HL features in Notion.";

export const metadata: Metadata = {
  description: DESCRIPTION,
  title: "Masalah Pelajar → HL Feature",
};

export default function MasalahToFeaturePage() {
  return (
    <>
      <PageTitle title="Masalah Pelajar → HL Feature" />
      <PageDescription description={DESCRIPTION} />
      <GraphView />
    </>
  );
}
