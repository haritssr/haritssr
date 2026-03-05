import { getExperimentsHomeDescription } from "data/PageDescriptions";
import type { Metadata } from "next";
import ExperimentsGrid from "@/components/ExperimentsGrid";
import PageDescription from "@/components/PageDescription";
import PageTitle from "@/components/PageTitle";

export const metadata: Metadata = {
  title: "Experiments",
  description: getExperimentsHomeDescription(),
};

export default function ExperimentsPage() {
  return (
    <>
      <PageTitle title="Experiments" />
      <PageDescription description={getExperimentsHomeDescription()} />
      <ExperimentsGrid />
    </>
  );
}
