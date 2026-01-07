import { Toggle } from "radix-ui";
import { useState } from "react";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

export default function ExportedToggle() {
  const [pressed, setPressed] = useState(false);
  return (
    <LayoutToExperiments domain="Radix UI" title="Toggle">
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
      <Toggle.Root
        className="rounded-md border border-zinc-400 bg-white px-3 py-1.5 font-medium rdx-state-on:text-action rdx-state-on:ring-2 rdx-state-on:ring-blue-600 hover:bg-zinc-50"
        onPressedChange={() => {
          setPressed(!pressed);
        }}
        pressed={pressed}
      >
        Show alert
      </Toggle.Root>
    </LayoutToExperiments>
  );
}
