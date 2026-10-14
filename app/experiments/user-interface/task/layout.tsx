import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { DATABASE_EXPERIMENTS_ENABLED } from "@/utils/databaseExperiments";

export default function TaskLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  if (!DATABASE_EXPERIMENTS_ENABLED) {
    notFound();
  }

  return children;
}
