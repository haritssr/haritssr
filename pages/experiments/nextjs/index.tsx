import { NextjsData } from "data/ExperimentsData";
import ExperimentIndexPage from "@/components/ExperimentIndexPage";

export default function Next() {
  return <ExperimentIndexPage experiment={NextjsData} />;
}
