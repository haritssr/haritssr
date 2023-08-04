import ExperimentsGrid from "@/components/ExperimentsGrid";
import Layout from "@/components/Layout";
import { PageTitle } from "@/components/SubTitle";

export default function ExperimentsPage() {
  return (
    <Layout browserTitle="Experiments" description="Home">
      <PageTitle title="Experiments">
        My experiments across JavaScript and React ecosystem stack
      </PageTitle>
      <ExperimentsGrid />
    </Layout>
  );
}
