"use client";

import { ScrollArea } from "radix-ui";

import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";

export default function RadixScrollAreaDemo() {
  return (
    <>
      <SubTitle>
        <ExternalLink
          href="https://www.radix-ui.com/docs/primitives/components/scroll-area"
          name="Radix UI Scroll Area"
        />
        <ExplanationList>
          <li>
            Augments native scroll functionality for custom, cross-browser
            styling.
          </li>
          <li>Try to scroll it.</li>
        </ExplanationList>
      </SubTitle>
      <div className="mb-14">
        <SourceCodeLink />
      </div>
      <ScrollArea.Root className="h-64 w-2/3 rounded-md border border-zinc-400">
        <ScrollArea.Viewport className="h-full w-full rounded-md bg-white">
          <div className="p-4">
            <div className="text-lg font-semibold text-zinc-800">Version</div>
            {TAGS.map((tag) => (
              <div
                className="mt-5 rounded border border-gray-500 p-2"
                key={tag}
              >
                {tag}
              </div>
            ))}
          </div>
        </ScrollArea.Viewport>

        <ScrollArea.Scrollbar className="scrollArea" orientation="vertical">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>
    </>
  );
}

const TAGS = Array.from({ length: 50 }).map((_, i) => `${i}`);
