import type { ReactNode } from "react";

import { createPageMetadata } from "@/utils/pageMetadata";

export const metadata = createPageMetadata({
  title: "Task Architecture",
  description:
    "How the task tracker manages state, saves, and its local database.",
  path: "/experiments/ui-explorations/task/architecture",
});

export default function TaskArchitectureLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return children;
}
