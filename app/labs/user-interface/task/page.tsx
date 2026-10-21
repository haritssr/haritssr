import type { Metadata } from "next";

import { getLabMetadata } from "@/app/labs/data";

import TaskClient from "./TaskClient";

export const metadata: Metadata = getLabMetadata("user-interface", "task");

export default function TaskPage() {
  return <TaskClient />;
}
