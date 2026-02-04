"use client";

import { Collapsible } from "radix-ui";
import { useState } from "react";

import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import InternalLink from "@/components/InternalLink";
import Section from "@/components/Section";
import SubTitle from "@/components/SubTitle";

export default function RadixCollapsibleDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <SubTitle>
        <ExternalLink
          href="https://www.radix-ui.com/docs/primitives/components/alert-dialog"
          name="Radix UI Alert Dialog"
        />
        <ExplanationList>
          <li>An interactive component which expands/collapses a panel.</li>
          <li>
            Click the &#39;Load more...&#39; to see more content, and click
            &#39;Collapse&#39; after the more content displayed to collapse the
            more displayed contents.
          </li>
        </ExplanationList>
      </SubTitle>
      <Collapsible.Root
        className="w-full sm:w-2/3"
        onOpenChange={setOpen}
        open={open}
      >
        <Section name="List of a groceries" />
        <div className="space-y-2">
          <InternalLink href="/work/radix-ui/accordion">
            This is Accordion
          </InternalLink>
          <InternalLink href="/work/radix-ui/dropdown-menu">
            This is Dropdown Menu
          </InternalLink>
          <InternalLink href="/work/tailwindcss/blurry">
            This is Blurry Effect
          </InternalLink>
        </div>
        <Collapsible.Content className="mt-2 space-y-2">
          <InternalLink href="/work/radix-ui/accordion">Acordion</InternalLink>
          <InternalLink href="/work/radix-ui/dropdown-menu">
            Dropdown Menu
          </InternalLink>
          <InternalLink href="/work/tailwindcss/blurry">
            Blurry Effect
          </InternalLink>
        </Collapsible.Content>
        <Collapsible.Trigger className="py-1 text-lg text-zinc-500 hover:underline sm:text-base">
          {open ? "Collapse" : "Load more..."}
        </Collapsible.Trigger>
      </Collapsible.Root>
    </>
  );
}
