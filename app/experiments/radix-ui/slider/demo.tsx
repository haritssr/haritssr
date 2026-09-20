"use client";

import { Slider } from "radix-ui";

import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";

export default function RadixSliderDemo() {
  return (
    <>
      <SubTitle>
        <ExternalLink
          href="https://www.radix-ui.com/docs/primitives/components/slider"
          name="Radix UI Slider"
        />
        <ExplanationList>
          <li>
            An input where the user selects a value from within a given range.
          </li>
          <li>
            Click the button with name and icon and the explanation box will
            appear
          </li>
        </ExplanationList>
      </SubTitle>
      <SourceCodeLink />
      <form action="">
        <Slider.Root
          className="relative flex w-full items-center select-none"
          defaultValue={[50]}
          // step={10}
          orientation="horizontal"
        >
          <Slider.Track
            aria-orientation="horizontal"
            className="h-2 flex-1 rounded-full bg-zinc-800"
          >
            <Slider.Range className="rounded-ful absolute h-full bg-zinc-100" />
          </Slider.Track>
          <Slider.Thumb className="block h-5 w-5 cursor-pointer rounded-full border border-zinc-300 bg-white shadow-lg hover:border-zinc-400 hover:bg-zinc-50 focus:border focus:border-zinc-500 focus:ring-4 focus:ring-zinc-400/50 focus:outline-hidden" />
        </Slider.Root>
      </form>
    </>
  );
}
