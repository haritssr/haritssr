import ExperimentIndexPage from "@/components/ExperimentIndexPage";
import { RadixUIData } from "data/ExperimentsData";

export default function IndexPage() {
	return <ExperimentIndexPage experiment={RadixUIData} />;
}
