import ExperimentIndexPage from "@/components/ExperimentIndexPage";
import { UIExplorationData } from "data/ExperimentsData";

export default function IndexPage() {
  return <ExperimentIndexPage experiment={UIExplorationData} />;
}
