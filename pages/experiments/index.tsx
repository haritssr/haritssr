import ExperimentsGrid from "@/components/ExperimentsGrid";
import Layout from "@/components/Layout";

export default function ExperimentsPage() {
  return (
    <Layout browserTitle="Experiments" description="Home">
      <div className="text-4xl font-bold text-zinc-800 mt-16">Experiments</div>
      <div className="mt-5 mb-8 text-lg text-zinc-500">
        My experiments across JavaScript and React ecosystem stack
      </div>
      <ExperimentsGrid />
    </Layout>
  );
}
