import { KaTeXData } from "data/ExperimentsData";
import ExperimentIndexPage from "@/components/ExperimentIndexPage";

export default function IndexPage() {
  return <ExperimentIndexPage experiment={KaTeXData} />;
}
