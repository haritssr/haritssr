import ExperimentIndexPage from "@/components/ExperimentIndexPage";
import { NextjsData } from "data/ExperimentsData";

export default function Next() {
	return <ExperimentIndexPage experiment={NextjsData} />;
}
