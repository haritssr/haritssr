import type { Metadata } from "next";

import { getLabMetadata } from "@/data/LabsData";

import TaskClient from "./TaskClient";

export const metadata: Metadata = getLabMetadata("user-interface", "task");

export default function TaskPage() {
  return <TaskClient />;
}
