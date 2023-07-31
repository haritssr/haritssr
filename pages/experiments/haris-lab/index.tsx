import ExperimentIndexPage from "@/components/ExperimentIndexPage";
import { HarisLabData } from "data/ExperimentsData";

export default function IndexPage() {
  return <ExperimentIndexPage experiment={HarisLabData} />;
}
