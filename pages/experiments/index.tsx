import ExperimentsGrid from "@/components/ExperimentsGrid";
import Layout from "@/components/Layout";
import { SubTitleMain } from "@/components/SubTitle";

export default function ExperimentsPage() {
  return (
    <Layout browserTitle="Experiments" description="Home">
      <SubTitleMain title="Experiments">
        My experiments across JavaScript and React ecosystem stack
      </SubTitleMain>
      <ExperimentsGrid />
    </Layout>
  );
}
