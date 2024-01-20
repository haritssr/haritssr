import { ExperimentsData } from "data/ExperimentsData";
import ExperimentCard from "./ExperimentCard";

export default function ExperimentsGrid() {
	return (
		<div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
			{ExperimentsData.map((experiment) => {
				return <ExperimentCard key={experiment.id} experiment={experiment} />;
			})}
		</div>
	);
}
