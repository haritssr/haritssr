import ExperimentIndexPage from "@/components/ExperimentIndexPage";
import { TailwindCSSData } from "data/ExperimentsData";

export default function TailwindCSS() {
  return <ExperimentIndexPage experiment={TailwindCSSData} />;
}
