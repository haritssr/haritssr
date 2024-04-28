import ExperimentIndexPage from "@/components/ExperimentIndexPage";
import { BrowserData } from "data/ExperimentsData";

export default function Browser() {
	return <ExperimentIndexPage experiment={BrowserData} />;
}
