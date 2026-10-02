import { Tabs } from "@base-ui/react/tabs";

export default function TabsDemo() {
  return (
    <Tabs.Root className="flex w-full max-w-sm flex-col" defaultValue="tab1">
      <Tabs.List
        aria-label="Account settings"
        className="bg-foreground/10 flex shrink-0 gap-1 rounded-lg p-1"
      >
        <Tabs.Tab
          className="focus-visible:outline-action text-muted data-active:border-border data-active:text-foreground flex flex-1 cursor-pointer items-center justify-center rounded-md border border-transparent bg-transparent px-3 py-1.5 text-sm font-medium outline-hidden select-none hover:bg-white/70 focus-visible:outline-2 data-active:bg-white data-active:shadow"
          value="tab1"
        >
          Account
        </Tabs.Tab>
        <Tabs.Tab
          className="focus-visible:outline-action text-muted data-active:border-border data-active:text-foreground flex flex-1 cursor-pointer items-center justify-center rounded-md border border-transparent bg-transparent px-3 py-1.5 text-sm font-medium outline-hidden select-none hover:bg-white/70 focus-visible:outline-2 data-active:bg-white data-active:shadow"
          value="tab2"
        >
          Password
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel
        className="focus-visible:outline-action border-border text-foreground/80 mt-2 grow rounded-lg border bg-white p-4 text-sm outline-hidden focus-visible:outline-2"
        value="tab1"
      >
        Update your profile details and account preferences.
      </Tabs.Panel>
      <Tabs.Panel
        className="focus-visible:outline-action border-border text-foreground/80 mt-2 grow rounded-lg border bg-white p-4 text-sm outline-hidden focus-visible:outline-2"
        value="tab2"
      >
        Change your password and keep your account secure.
      </Tabs.Panel>
    </Tabs.Root>
  );
}
