import ExperimentIndexPage from "@/components/ExperimentIndexPage";
import { HeadlessUIData } from "data/ExperimentsData";

export default function IndexPage() {
	return <ExperimentIndexPage experiment={HeadlessUIData} />;
}
