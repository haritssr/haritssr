import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { DATABASE_LABS_ENABLED } from "@/utils/databaseLabs";

export default function TaskLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  if (!DATABASE_LABS_ENABLED) {
    notFound();
  }

  return children;
}
