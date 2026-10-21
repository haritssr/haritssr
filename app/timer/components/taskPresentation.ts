import type { ComponentProps } from "react";

import type Button from "@/components/Button";

// Card/list dimensions and spacing. State colors are below the layout map.
export type TaskView = "cards" | "list";

export const TASK_VIEW_LAYOUT = {
  cards: {
    collection: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4",
    item: "flex flex-col gap-3",
    controls: "mt-auto space-y-3",
    surface:
      "corner-squircle rounded-[1.25rem] border px-4 pb-4 pt-3.5 shadow-lg",
    time: "flex items-baseline justify-between gap-2 text-base sm:text-sm",
    progress: "h-2.5 sm:h-2",
    running: "border-danger/80",
    paused: "border-border",
    percentage: "",
  },
  list: {
    collection: "grid grid-cols-1 gap-3",
    item: "grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] sm:items-center sm:gap-0 sm:[&>:first-child]:pr-4",
    controls:
      "grid min-w-0 grid-cols-[minmax(0,1fr)_11rem] items-center gap-5 sm:contents [&>:first-child]:border-r [&>:first-child]:border-border [&>:first-child]:pr-5 sm:[&>:first-child]:border-l sm:[&>:first-child]:px-5 sm:[&>:last-child]:ml-5 sm:[&>:last-child]:w-auto",
    surface: "rounded-lg border border-border px-4 py-2.5 sm:pl-3.5 sm:pr-4",
    time: "flex items-baseline justify-between gap-2 text-base sm:text-sm",
    progress: "h-2.5 sm:h-1.5",
    running: "border-danger/60",
    paused: "border-border",
    percentage: "text-base sm:text-sm",
  },
};

const TASK_STATE_APPEARANCE = {
  running: {
    elapsed: "text-danger",
    progress: "var(--color-danger)",
    button: "neutral-subtle",
  },
  paused: {
    elapsed: "text-attention",
    progress: "var(--color-attention)",
    button: "neutral-subtle",
  },
  ready: {
    elapsed: "text-success",
    progress: "var(--color-success)",
    button: "success-subtle",
  },
  complete: {
    elapsed: "text-muted",
    progress: "var(--color-muted)",
    button: "outline",
  },
} satisfies Record<
  string,
  {
    elapsed: string;
    progress: string;
    button: ComponentProps<typeof Button>["variant"];
  }
>;

export function taskAppearance(
  view: TaskView,
  running: boolean,
  paused: boolean,
  reached: boolean
) {
  let state: keyof typeof TASK_STATE_APPEARANCE = "ready";
  if (reached) {
    state = "complete";
  } else if (running) {
    state = "running";
  } else if (paused) {
    state = "paused";
  }
  const appearance = TASK_STATE_APPEARANCE[state];
  let surface = "text-foreground";
  if (running) {
    surface = `text-foreground ${TASK_VIEW_LAYOUT[view].running} shadow-lg shadow-danger/20`;
  } else if (paused) {
    surface = `text-foreground ${TASK_VIEW_LAYOUT[view].paused} shadow-lg`;
  }
  return {
    elapsed: appearance.elapsed,
    progress: appearance.progress,
    button: appearance.button,
    surface,
  };
}

export type TaskAppearance = ReturnType<typeof taskAppearance>;
