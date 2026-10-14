import type { Metadata } from "next";

import { getExperimentMetadata } from "@/data/ExperimentsData";

import TaskClient from "./TaskClient";

export const metadata: Metadata = getExperimentMetadata(
  "user-interface",
  "task"
);

export default function TaskPage() {
  return <TaskClient />;
}
