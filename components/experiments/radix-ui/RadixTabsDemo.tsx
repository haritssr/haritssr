"use client";

import { Tabs } from "radix-ui";

import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import SubTitle from "@/components/SubTitle";

export default function RadixTabsDemo() {
  return (
    <>
      <SubTitle>
        <ExternalLink
          href="https://www.radix-ui.com/docs/primitives/components/tabs"
          name="Radix UI Tabs"
        />
        <ExplanationList>
          <li>
            A set of layered sections of content—known as tab panels—that are
            displayed one at a time.
          </li>
        </ExplanationList>
      </SubTitle>
      <TabsDemo />
    </>
  );
}

export const TabsDemo = () => (
  <Tabs.Root className="flex w-[300px] flex-col" defaultValue="tab1">
    <Tabs.List
      aria-label="Manage your account"
      className="flex shrink-0 space-x-1 rounded-lg bg-zinc-100 p-1"
    >
      <Tabs.Trigger
        className="flex flex-1 cursor-pointer select-none items-center justify-center rounded-md border border-transparent bg-white py-1.5 font-medium text-zinc-500 outline-hidden hover:bg-zinc-200/80 data-[state=active]:border-zinc-300 data-[state=active]:bg-white data-[state=active]:text-zinc-800 data-[state=active]:shadow data-[state=active]:focus:relative"
        value="tab1"
      >
        Account
      </Tabs.Trigger>
      <Tabs.Trigger
        className="flex flex-1 cursor-pointer select-none items-center justify-center rounded-md border border-transparent bg-white py-1.5 font-medium text-zinc-500 outline-hidden hover:bg-zinc-200/80 data-[state=active]:border-zinc-300 data-[state=active]:bg-white data-[state=active]:text-zinc-800 data-[state=active]:shadow data-[state=active]:focus:relative"
        value="tab2"
      >
        Password
      </Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content
      className="mt-2 grow rounded-md border border-zinc-200 bg-white p-5 outline-hidden"
      value="tab1"
    >
      <div className="">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut molestias
        veritatis ullam quae rem quis aliquam, accusantium debitis sint
        praesentium.
      </div>
    </Tabs.Content>
    <Tabs.Content
      className="mt-2 grow rounded-md border border-zinc-200 bg-white p-5 outline-hidden"
      value="tab2"
    >
      <div className="">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut molestias
        veritatis ullam quae rem quis aliquam, accusantium debitis sint
        praesentium.
      </div>
    </Tabs.Content>
  </Tabs.Root>
);
