import type { ComponentProps } from "react";

import type Button from "@/components/Button";

// Grid card dimensions and spacing. State colors are below the layout map.
export const TASK_LAYOUT = {
  collection: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3",
  item: "flex flex-col gap-2",
  controls: "mt-auto grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4",
  surface:
    "corner-squircle rounded-[1.25rem] border pl-4 pr-3.5 py-3.5 shadow-lg",
  time: "flex items-baseline justify-between gap-1 whitespace-nowrap text-sm",
  progress: "h-2",
  running: "border-timer-running/80 shadow-timer-running/10",
  paused: "border-border",
  percentage: "",
};

const TASK_STATE_APPEARANCE = {
  running: {
    elapsed: "text-timer-running",
    progress: "var(--color-timer-running)",
    button: "timer-running",
  },
  paused: {
    elapsed: "text-foreground",
    progress: "var(--color-foreground)",
    button: "neutral-subtle",
  },
  ready: {
    elapsed: "text-foreground",
    progress: "var(--color-foreground)",
    button: "neutral-subtle",
  },
  complete: {
    elapsed: "text-foreground",
    progress: "var(--color-foreground)",
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
