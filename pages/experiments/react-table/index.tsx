import ExperimentIndexPage from "@/components/ExperimentIndexPage";
import { ReactTableData } from "data/ExperimentsData";

export default function IndexPage() {
  return <ExperimentIndexPage experiment={ReactTableData} />;
}
