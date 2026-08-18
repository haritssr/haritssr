"use client";

import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "radix-ui";

import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import SubTitle from "@/components/SubTitle";

export default function RadixTooltipDemo() {
  return (
    <>
      <SubTitle>
        <ExternalLink
          href="https://www.radix-ui.com/docs/primitives/components/tooltip"
          name="Radix UI Tooltip"
        />
        <ExplanationList>
          <li>
            A popup that displays information related to an element when the
            element receives keyboard focus or the mouse hovers over it.
          </li>
          <li>Hover or click will show a tooltip above.</li>
        </ExplanationList>
      </SubTitle>
      <Tooltip.Provider>
        <Tooltip.Root>
          <div className="flex space-x-1">
            <div className="text-zinc-700">MDN</div>
            <Tooltip.Trigger className="flex items-center rounded px-1 py-0.5 hover:bg-zinc-100 active:ring-1 active:ring-zinc-700">
              <ExclamationCircleIcon
                className="h-4 w-4 text-zinc-600 hover:text-zinc-700"
                strokeWidth={2}
              />
            </Tooltip.Trigger>
            <Tooltip.Content
              align="center"
              className="rounded-md bg-zinc-700 px-2.5 py-1.5 text-white shadow-xl"
              side="top"
            >
              <div>Mozilla Developer Network</div>
              <Tooltip.Arrow
                className="fill-[#3F3F46]"
                height={5}
                offset={5}
                width={10}
              />
            </Tooltip.Content>
          </div>
        </Tooltip.Root>
      </Tooltip.Provider>
    </>
  );
}
