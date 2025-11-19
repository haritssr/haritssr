import { BrowserData } from "data/ExperimentsData";
import ExperimentIndexPage from "@/components/ExperimentIndexPage";

export default function Browser() {
	return <ExperimentIndexPage experiment={BrowserData} />;
}
