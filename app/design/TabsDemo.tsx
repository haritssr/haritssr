import { Tabs } from "@base-ui/react/tabs";

export default function TabsDemo() {
  return (
    <Tabs.Root className="flex w-full max-w-sm flex-col" defaultValue="tab1">
      <Tabs.List
        aria-label="Account settings"
        className="flex shrink-0 gap-1 rounded-lg bg-zinc-100 p-1"
      >
        <Tabs.Tab
          className="focus-visible:outline-action flex flex-1 cursor-pointer items-center justify-center rounded-md border border-transparent bg-transparent px-3 py-1.5 text-sm font-medium text-zinc-500 outline-hidden select-none hover:bg-white/70 focus-visible:outline-2 data-active:border-zinc-300 data-active:bg-white data-active:text-zinc-800 data-active:shadow"
          value="tab1"
        >
          Account
        </Tabs.Tab>
        <Tabs.Tab
          className="focus-visible:outline-action flex flex-1 cursor-pointer items-center justify-center rounded-md border border-transparent bg-transparent px-3 py-1.5 text-sm font-medium text-zinc-500 outline-hidden select-none hover:bg-white/70 focus-visible:outline-2 data-active:border-zinc-300 data-active:bg-white data-active:text-zinc-800 data-active:shadow"
          value="tab2"
        >
          Password
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel
        className="focus-visible:outline-action mt-2 grow rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-600 outline-hidden focus-visible:outline-2"
        value="tab1"
      >
        Update your profile details and account preferences.
      </Tabs.Panel>
      <Tabs.Panel
        className="focus-visible:outline-action mt-2 grow rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-600 outline-hidden focus-visible:outline-2"
        value="tab2"
      >
        Change your password and keep your account secure.
      </Tabs.Panel>
    </Tabs.Root>
  );
}
