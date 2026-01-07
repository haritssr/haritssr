import { ExperimentsData } from "data/ExperimentsData";
import ExperimentCard from "./ExperimentCard";

export default function ExperimentsGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {ExperimentsData.map((experiment) => {
        return <ExperimentCard experiment={experiment} key={experiment.id} />;
      })}
    </div>
  );
}
