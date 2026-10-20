"use client";

import { Tabs as BaseTabs } from "@base-ui/react/tabs";

export default function Tabs() {
  return (
    <BaseTabs.Root
      className="flex w-full max-w-full flex-col"
      defaultValue="tab1"
    >
      <BaseTabs.List
        aria-label="Account settings"
        className="bg-foreground/10 flex shrink-0 gap-1 rounded-lg p-1"
      >
        <BaseTabs.Tab
          className="focus-visible:outline-action text-muted data-active:border-border data-active:text-foreground flex flex-1 cursor-pointer items-center justify-center rounded-md border border-transparent bg-transparent px-3 py-1.5 text-sm font-medium outline-hidden select-none hover:bg-white/70 focus-visible:outline-2 data-active:bg-white data-active:shadow"
          value="tab1"
        >
          Account
        </BaseTabs.Tab>
        <BaseTabs.Tab
          className="focus-visible:outline-action text-muted data-active:border-border data-active:text-foreground flex flex-1 cursor-pointer items-center justify-center rounded-md border border-transparent bg-transparent px-3 py-1.5 text-sm font-medium outline-hidden select-none hover:bg-white/70 focus-visible:outline-2 data-active:bg-white data-active:shadow"
          value="tab2"
        >
          Password
        </BaseTabs.Tab>
      </BaseTabs.List>
      <BaseTabs.Panel
        className="focus-visible:outline-action border-border text-foreground/80 mt-2 grow rounded-lg border bg-white p-4 text-sm outline-hidden focus-visible:outline-2"
        value="tab1"
      >
        Update your profile details and account preferences.
      </BaseTabs.Panel>
      <BaseTabs.Panel
        className="focus-visible:outline-action border-border text-foreground/80 mt-2 grow rounded-lg border bg-white p-4 text-sm outline-hidden focus-visible:outline-2"
        value="tab2"
      >
        Change your password and keep your account secure.
      </BaseTabs.Panel>
    </BaseTabs.Root>
  );
}
