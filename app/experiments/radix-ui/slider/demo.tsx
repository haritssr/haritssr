"use client";

import { Slider } from "radix-ui";

import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
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
      <form action="">
        <Slider.Root
          className="relative flex w-full select-none items-center"
          defaultValue={[50]}
          // step={10}
          orientation="horizontal"
        >
          <Slider.Track
            aria-orientation="horizontal"
            className="h-2 flex-1 rounded-full bg-zinc-800"
          >
            <Slider.Range className="absolute h-full rounded-ful bg-zinc-100" />
          </Slider.Track>
          <Slider.Thumb className="block h-5 w-5 cursor-pointer rounded-full border border-zinc-300 bg-white shadow-lg hover:border-zinc-400 hover:bg-zinc-50 focus:border focus:border-zinc-500 focus:outline-hidden focus:ring-4 focus:ring-zinc-400/50" />
        </Slider.Root>
      </form>
    </>
  );
}
