import ExperimentIndexPage from "@/components/ExperimentIndexPage";
import { ReactQueryData } from "data/ExperimentsData";

export default function IndexPage() {
  return <ExperimentIndexPage experiment={ReactQueryData} />;
}
