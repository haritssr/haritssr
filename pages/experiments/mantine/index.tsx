import ExperimentIndexPage from "@/components/ExperimentIndexPage";
import { MantineData } from "data/ExperimentsData";

export default function IndexPage() {
	return <ExperimentIndexPage experiment={MantineData} />;
}
