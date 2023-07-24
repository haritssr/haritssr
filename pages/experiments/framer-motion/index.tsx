import ExperimentIndexPage from "@/components/ExperimentIndexPage";
import { FramerMotionData } from "data/ExperimentsData";

export default function IndexPage() {
  return <ExperimentIndexPage experiment={FramerMotionData} />;
}
