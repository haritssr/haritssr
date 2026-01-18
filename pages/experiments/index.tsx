import { ExperimentsData } from "data/ExperimentsData";
import ExperimentsGrid from "@/components/ExperimentsGrid";
import Layout from "@/components/Layout";
import { PageTitle } from "@/components/SubTitle";

export default function ExperimentsPage() {
  let totalExperiment = 0;

  for (const experiment of ExperimentsData) {
    totalExperiment += experiment.links.length;
  }

  return (
    <Layout browserTitle="Experiments" description="Home">
      <PageTitle
        description={`${totalExperiment} unique individual (per page) experiments across Javascript-React ecosystem stack`}
        title="Experiments"
      />
      <ExperimentsGrid />
    </Layout>
  );
}
