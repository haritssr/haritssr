import ExperimentIndexPage from "@/components/ExperimentIndexPage";
import { KaTeXData } from "data/ExperimentsData";

export default function IndexPage() {
	return <ExperimentIndexPage experiment={KaTeXData} />;
}
