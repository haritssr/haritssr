import type { ComponentProps } from "react";

import type Button from "@/components/Button";

// Grid card dimensions and spacing. State colors are below the layout map.
export const TASK_LAYOUT = {
  collection: "grid grid-cols-1 gap-3",
  item: "flex min-w-0 flex-row items-center gap-3",
  controls:
    "grid min-w-0 grid-cols-[auto_auto] items-center gap-2 sm:grid-cols-[max-content_auto] sm:gap-4",
  surface:
    "corner-squircle bg-interface-hover rounded-2xl pl-3.5 pr-3 py-2 sm:rounded-3xl sm:pr-2.5 sm:pl-4",
  profileSurface:
    "corner-squircle rounded-xl border bg-linear-to-b from-secondary-button-surface from-30% to-background p-4 inset-shadow-[0_2px_0_var(--color-zinc-50)] backdrop-blur-md supports-[corner-shape:squircle]:rounded-3xl",
  time: "flex items-baseline justify-between gap-1 whitespace-nowrap text-sm",
  progress: "h-1.5",
  running: "border-border [--task-surface-color:var(--color-foreground)]",
  paused: "border-border [--task-surface-color:var(--color-foreground)]",
  percentage: "",
};

const TASK_STATE_APPEARANCE = {
  running: {
    elapsed: "text-danger",
    progress: "var(--color-danger)",
    button: "timer-running",
  },
  paused: {
    elapsed: "text-foreground",
    progress: "var(--color-foreground)",
    button: "timer-paused",
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
    surface = `text-foreground ${TASK_LAYOUT.running}`;
  } else if (paused) {
    surface = `text-foreground ${TASK_LAYOUT.paused}`;
  }
  return {
    elapsed: appearance.elapsed,
    progress: appearance.progress,
    button: appearance.button,
    surface,
  };
}

export type TaskAppearance = ReturnType<typeof taskAppearance>;
