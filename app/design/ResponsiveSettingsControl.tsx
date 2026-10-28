"use client";

import { Switch } from "@base-ui/react/switch";
import { Tooltip } from "@base-ui/react/tooltip";
import {
  BellAlertIcon,
  ForwardIcon,
  SpeakerWaveIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useId, useRef, useState } from "react";

const settings = [
  { name: "Alerts", icon: BellAlertIcon, on: true },
  { name: "Autoplay", icon: ForwardIcon, on: false },
  { name: "Multitask", icon: Square3Stack3DIcon, on: true },
  { name: "Sound", icon: SpeakerWaveIcon, on: true },
] as const;

export default function ResponsiveSettingsControl() {
  const previewId = useId();
  const [feedback, setFeedback] = useState("");
  const feedbackTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (feedbackTimeout.current !== null) {
        clearTimeout(feedbackTimeout.current);
      }
    },
    []
  );

  function showFeedback(name: string, checked: boolean) {
    if (feedbackTimeout.current !== null) {
      clearTimeout(feedbackTimeout.current);
    }
    setFeedback(`${name} ${checked ? "on" : "off"}`);
    feedbackTimeout.current = setTimeout(() => {
      setFeedback("");
      feedbackTimeout.current = null;
    }, 2000);
  }

  return (
    <div>
      <output aria-atomic="true" className="sr-only">
        {feedback}
      </output>
      <div className="corner-squircle border-border inline-flex items-center gap-0 overflow-hidden rounded-md border supports-[corner-shape:squircle]:rounded-xl">
        {settings.map(({ name, icon: Icon, on }) => (
          <Tooltip.Root
            key={name}
            open={feedback.startsWith(`${name} `)}
            triggerId={`${previewId}-${name}`}
          >
            <Tooltip.Trigger
              id={`${previewId}-${name}`}
              closeOnClick={false}
              render={
                <Switch.Root
                  aria-label={name}
                  defaultChecked={on}
                  onCheckedChange={(checked) => {
                    showFeedback(name, checked);
                  }}
                  className="group border-border focus-visible:outline-action bg-interface-hover text-muted data-checked:bg-action/10 data-checked:text-action sm:text-foreground sm:data-checked:text-foreground flex size-8.5 shrink-0 cursor-pointer items-center justify-center border-l outline-hidden first:border-l-0 focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 sm:h-auto sm:min-h-8.5 sm:w-auto sm:gap-2 sm:bg-transparent sm:px-2 sm:data-checked:bg-transparent"
                />
              }
            >
              <span className="flex items-center gap-1.5">
                <Icon
                  aria-hidden="true"
                  className="size-4.5 shrink-0 stroke-2"
                />
                <span className="hidden text-sm sm:inline">{name}</span>
              </span>
              <span
                aria-hidden="true"
                className="bg-border group-data-checked:bg-action hidden w-8 shrink-0 rounded-full p-0.5 sm:block"
              >
                <Switch.Thumb className="bg-surface block size-3.5 rounded-full transition-transform duration-100 data-checked:translate-x-3.5 motion-reduce:transition-none" />
              </span>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Positioner
                side="top"
                align="center"
                sideOffset={8}
                positionMethod="fixed"
                className="pointer-events-none z-100 sm:hidden"
              >
                <Tooltip.Popup className="bg-foreground text-background rounded-md px-2.5 py-1.5 text-sm shadow-xl">
                  {feedback}
                  <Tooltip.Arrow className="data-[side=bottom]:bottom-full data-[side=bottom]:rotate-180 data-[side=top]:top-full">
                    <svg
                      aria-hidden="true"
                      width="10"
                      height="5"
                      viewBox="0 0 10 5"
                      className="fill-foreground"
                    >
                      <path d="M0 0h10L5 5Z" />
                    </svg>
                  </Tooltip.Arrow>
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        ))}
      </div>
    </div>
  );
}
