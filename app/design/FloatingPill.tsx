"use client";

import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ForwardIcon,
  SparklesIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

import Button from "@/components/Button";

const themes = {
  dark: {
    label: "Dark",
    variables: "[--pill-accent:var(--color-foreground)]",
  },
  blue: {
    label: "Blue",
    variables: "[--pill-accent:var(--color-action)]",
  },
  yellow: {
    label: "Yellow",
    variables: "[--pill-accent:var(--color-attention)]",
  },
  green: {
    label: "Green",
    variables: "[--pill-accent:var(--color-success)]",
  },
  purple: {
    label: "Purple",
    variables: "[--pill-accent:var(--color-secondary-accent)]",
  },
} as const;

type Theme = keyof typeof themes;
const options: readonly Theme[] = ["dark", "blue", "yellow", "green", "purple"];

export default function FloatingPill() {
  const [theme, setTheme] = useState<Theme>("dark");
  const selected = themes[theme];

  function moveTheme(direction: -1 | 1) {
    setTheme((current) => {
      const index = options.indexOf(current);
      return options[(index + direction + options.length) % options.length];
    });
  }

  return (
    <div className="space-y-4">
      <div
        className={`border-foreground/10 bg-background/70 shadow-foreground/10 mx-auto flex min-h-13.25 w-full max-w-[22.4rem] items-center gap-2 rounded-full border py-2 pr-2 pl-5 shadow-lg backdrop-blur-md [corner-shape:round] ${selected.variables}`}
      >
        <div className="min-w-0 flex-1 space-y-2 sm:space-y-1.5">
          <div className="flex min-w-0 items-center justify-between gap-2">
            <span className="text-foreground flex min-w-0 items-center gap-1 text-sm leading-4 font-medium">
              <SparklesIcon aria-hidden="true" className="size-4 shrink-0" />
              <span className="truncate">Creative session</span>
            </span>
            <span className="text-muted shrink-0 text-sm leading-4 tabular-nums">
              -12:30
            </span>
          </div>
          <progress
            aria-label="Creative session progress"
            className="bg-slider-track-hover [&::-webkit-progress-bar]:bg-slider-track-hover block h-2 w-full appearance-none overflow-hidden rounded-full border-0 sm:h-1.5 [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-(--pill-accent) [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-(--pill-accent)"
            max={100}
            value={40}
          />
        </div>
        <Button aria-label="Next" size="icon-circle" variant="outline">
          <ForwardIcon
            aria-hidden="true"
            className="size-4.5"
            strokeWidth={2}
          />
        </Button>
        <Button aria-label="Dismiss" size="icon-circle" variant="outline">
          <XMarkIcon
            aria-hidden="true"
            className="size-4.5"
            strokeWidth={2.5}
          />
        </Button>
        <Button
          aria-label="Play"
          size="icon-circle"
          variant={theme === "dark" ? "neutral-subtle" : "theme-fill"}
        >
          <PlayIcon aria-hidden="true" className="size-4.5 translate-x-px" />
        </Button>
      </div>
      <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-3">
        <div className="flex items-center gap-1">
          <Button
            aria-label="Previous color"
            iconOnly
            size="icon-compact"
            variant="outline-interactive"
            onClick={() => {
              moveTheme(-1);
            }}
          >
            <ChevronLeftIcon
              aria-hidden="true"
              className="text-foreground size-4 -translate-x-px stroke-2"
            />
          </Button>
          <Button
            aria-label="Next color"
            iconOnly
            size="icon-compact"
            variant="outline-interactive"
            onClick={() => {
              moveTheme(1);
            }}
          >
            <ChevronRightIcon
              aria-hidden="true"
              className="text-foreground size-4 translate-x-px stroke-2"
            />
          </Button>
        </div>
        <RadioGroup<Theme>
          aria-label="Creative pill color"
          className="flex flex-wrap justify-end gap-x-3 gap-y-2"
          onValueChange={setTheme}
          value={theme}
        >
          {options.map((option) => (
            <label
              className={`text-foreground flex cursor-pointer items-center gap-1.5 text-sm ${themes[option].variables}`}
              key={option}
            >
              <Radio.Root
                className="border-border focus-visible:outline-action flex size-5 shrink-0 items-center justify-center rounded border bg-white outline-hidden focus-visible:outline-2 data-checked:border-(--pill-accent) data-checked:bg-(--pill-accent)"
                value={option}
              >
                <Radio.Indicator className="text-white">
                  <CheckIcon aria-hidden="true" className="size-4" />
                </Radio.Indicator>
              </Radio.Root>
              {themes[option].label}
            </label>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
