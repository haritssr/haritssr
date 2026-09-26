"use client";

import { RadioGroup } from "radix-ui";

import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";

export default function RadixRadioGroupDemo() {
  return (
    <>
      <SubTitle>
        A set of checkable buttons—known as radio buttons—where no more than one
        of the buttons can be checked at a time.
      </SubTitle>
      <SourceCodeLink />
      <RadioGroup.Root aria-label="Example options" className="space-y-3">
        <RadioGroup.Item
          className="rdx-state-checked:border-blue-600 flex h-5 w-5 items-center justify-center rounded-full border border-zinc-400 bg-white hover:bg-blue-50"
          aria-label="Default"
          id="item-1"
          value="default"
        >
          <RadioGroup.Indicator className="rdx-state-checked:border-blue-600 rdx-state-checked:bg-blue-600 h-3 w-3 rounded-full bg-zinc-800" />
        </RadioGroup.Item>
        <RadioGroup.Item
          className="rdx-state-checked:border-blue-600 flex h-5 w-5 items-center justify-center rounded-full border border-zinc-400 bg-white hover:bg-blue-50"
          aria-label="Option 2"
          id="item-2"
          value="value-2"
        >
          <RadioGroup.Indicator className="rdx-state-checked:border-blue-600 rdx-state-checked:bg-blue-600 h-3 w-3 rounded-full bg-zinc-800" />
        </RadioGroup.Item>
        <RadioGroup.Item
          className="rdx-state-checked:border-blue-600 flex h-5 w-5 items-center justify-center rounded-full border border-zinc-400 bg-white hover:bg-blue-50"
          aria-label="Option 3"
          id="item-3"
          value="value-3"
        >
          <RadioGroup.Indicator className="rdx-state-checked:border-blue-600 rdx-state-checked:bg-blue-600 h-3 w-3 rounded-full bg-zinc-800" />
        </RadioGroup.Item>
      </RadioGroup.Root>
    </>
  );
}
