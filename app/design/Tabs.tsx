"use client";

import { Tabs as BaseTabs } from "@base-ui/react/tabs";

export default function Tabs() {
  return (
    <BaseTabs.Root
      className="border-border flex w-full max-w-full flex-col overflow-hidden rounded-lg border bg-white"
      defaultValue="tab1"
    >
      <BaseTabs.List
        aria-label="Account settings"
        className="border-border flex w-full shrink-0 gap-1 border-b p-1"
      >
        <BaseTabs.Tab
          className="focus-visible:outline-action text-foreground data-active:bg-foreground/8 data-active:text-action hover:bg-foreground/5 flex cursor-pointer items-center justify-center rounded-lg px-3 py-1 font-normal whitespace-nowrap outline-hidden transition-colors duration-150 select-none [corner-shape:round] focus-visible:outline-2 focus-visible:-outline-offset-2 motion-reduce:transition-none"
          value="tab1"
        >
          Account
        </BaseTabs.Tab>
        <BaseTabs.Tab
          className="focus-visible:outline-action text-foreground data-active:bg-foreground/8 data-active:text-action hover:bg-foreground/5 flex cursor-pointer items-center justify-center rounded-lg px-3 py-1 font-normal whitespace-nowrap outline-hidden transition-colors duration-150 select-none [corner-shape:round] focus-visible:outline-2 focus-visible:-outline-offset-2 motion-reduce:transition-none"
          value="tab2"
        >
          Password
        </BaseTabs.Tab>
      </BaseTabs.List>
      <BaseTabs.Panel
        className="focus-visible:outline-action text-foreground/80 grow p-4 text-sm outline-hidden focus-visible:outline-2 focus-visible:-outline-offset-2"
        value="tab1"
      >
        Update your profile details and account preferences.
      </BaseTabs.Panel>
      <BaseTabs.Panel
        className="focus-visible:outline-action text-foreground/80 grow p-4 text-sm outline-hidden focus-visible:outline-2 focus-visible:-outline-offset-2"
        value="tab2"
      >
        Change your password and keep your account secure.
      </BaseTabs.Panel>
    </BaseTabs.Root>
  );
}
