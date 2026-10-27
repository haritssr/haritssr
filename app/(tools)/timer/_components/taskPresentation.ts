import type { ComponentProps } from "react";

import type Button from "@/components/Button";

// Grid card dimensions and spacing. State colors are below the layout map.
export const TASK_LAYOUT = {
  collection: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
  item: "flex flex-col gap-2",
  controls: "mt-auto grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4",
  surface:
    "corner-squircle rounded-[0.625rem] border-[0.5px] bg-linear-to-b from-surface to-[color-mix(in_srgb,var(--task-surface-color,var(--color-foreground))_6%,var(--color-surface))] pl-3.5 pr-3 py-2.5 shadow-md inset-shadow-[0_2px_0_var(--color-zinc-50)] backdrop-blur-md supports-[corner-shape:squircle]:rounded-[1.25rem]",
  time: "flex items-baseline justify-between gap-1 whitespace-nowrap text-[0.9375rem]",
  progress: "h-1.5",
  running:
    "border-timer-running/80 shadow-timer-running/10 [--task-surface-color:var(--color-timer-running)]",
  paused:
    "border-timer-paused/80 shadow-timer-paused/10 [--task-surface-color:var(--color-timer-paused)]",
  percentage: "",
};

const TASK_STATE_APPEARANCE = {
  running: {
    elapsed: "text-timer-running",
    progress: "var(--color-timer-running)",
    button: "timer-running",
  },
  paused: {
    elapsed: "text-timer-paused",
    progress: "var(--color-timer-paused)",
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
