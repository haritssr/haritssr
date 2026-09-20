"use client";

import { ToggleGroup } from "radix-ui";

import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";

export default function RadixToggleGroupDemo() {
  return (
    <>
      <SubTitle>
        <ExternalLink
          href="https://www.radix-ui.com/docs/primitives/components/toggle"
          name="Radix UI Toggle"
        />
        <ExplanationList>
          <li>A two-state button that can be either on or off.</li>
          <li>Click to change.</li>
        </ExplanationList>
      </SubTitle>
      <SourceCodeLink />

      <ToggleGroup.Root className="space-x-2" type="multiple">
        <ToggleGroup.Item
          aria-label="left"
          className="rdx-state-on:border-blue-600 rdx-state-on:bg-blue-600 rdx-state-on:text-white hover:text-action rounded-full border border-zinc-500 px-4 py-1.5 text-zinc-800 hover:border-blue-600 sm:py-1"
          value="left"
        >
          Button
        </ToggleGroup.Item>
        <ToggleGroup.Item
          aria-label="center"
          className="rdx-state-on:border-blue-600 rdx-state-on:bg-blue-600 rdx-state-on:text-white hover:text-action rounded-full border border-zinc-500 px-4 py-1.5 text-zinc-800 hover:border-blue-600 sm:py-1"
          value="center"
        >
          Button
        </ToggleGroup.Item>
        <ToggleGroup.Item
          aria-label="right"
          className="rdx-state-on:border-blue-600 rdx-state-on:bg-blue-600 rdx-state-on:text-white hover:text-action rounded-full border border-zinc-500 px-4 py-1.5 text-zinc-800 hover:border-blue-600 sm:py-1"
          value="right"
        >
          Button
        </ToggleGroup.Item>
      </ToggleGroup.Root>
    </>
  );
}
