"use client";

import { Switch } from "radix-ui";

import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";

export default function RadixSwitchDemo() {
  return (
    <>
      <SubTitle>
        <ExternalLink
          href="https://www.radix-ui.com/docs/primitives/components/switch"
          name="Radix UI Switch"
        />
        <ExplanationList>
          <li>
            A control that allows the user to toggle between checked and not
            checked.
          </li>
          <li>Click to change state.</li>
        </ExplanationList>
      </SubTitle>
      <SourceCodeLink />
      <form>
        <Switch.Root
          aria-label="Enable example setting"
          className="rdx-state-checked:border-green-700 rdx-state-checked:bg-green-600 block w-11 rounded-full border border-zinc-300 p-1 hover:bg-zinc-50"
          defaultChecked
          id="s1"
        >
          <Switch.Thumb className="rdx-state-checked:translate-x-[18px] rdx-state-checked:bg-white block h-4 w-4 rounded-full border border-zinc-400 bg-zinc-800 shadow duration-100 will-change-transform" />
        </Switch.Root>
      </form>
    </>
  );
}
