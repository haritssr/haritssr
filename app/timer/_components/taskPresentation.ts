import type { ComponentProps } from "react";

import type Button from "@/components/Button";

// Grid card dimensions and spacing. State colors are below the layout map.
export const TASK_LAYOUT = {
  collection: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3",
  item: "flex flex-col gap-2",
  controls: "mt-auto grid grid-cols-[minmax(0,1fr)_auto] items-end gap-2",
  surface: "corner-squircle rounded-[1.25rem] border p-3.5 shadow-lg",
  time: "flex items-baseline justify-between gap-1 whitespace-nowrap text-sm",
  progress: "h-2",
  running: "border-danger/80 shadow-red-100",
  paused: "border-border",
  percentage: "",
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
    surface = `text-foreground ${TASK_LAYOUT.running} shadow-lg`;
  } else if (paused) {
    surface = `text-foreground ${TASK_LAYOUT.paused} shadow-lg`;
  }
  return {
    elapsed: appearance.elapsed,
    progress: appearance.progress,
    button: appearance.button,
    surface,
  };
}

export type TaskAppearance = ReturnType<typeof taskAppearance>;
