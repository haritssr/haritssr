import ExperimentIndexPage from "@/components/ExperimentIndexPage";
import { VisXData } from "data/ExperimentsData";

export default function IndexPage() {
  return <ExperimentIndexPage experiment={VisXData} />;
}
