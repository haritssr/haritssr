"use client";

import { Accordion } from "@base-ui/react/accordion";
import { Checkbox } from "@base-ui/react/checkbox";
import { ContextMenu } from "@base-ui/react/context-menu";
import { Dialog } from "@base-ui/react/dialog";
import { Popover } from "@base-ui/react/popover";
import { Select } from "@base-ui/react/select";
import { Slider } from "@base-ui/react/slider";
import { Switch } from "@base-ui/react/switch";
import { Tabs } from "@base-ui/react/tabs";
import { Toast } from "@base-ui/react/toast";
import { Toggle } from "@base-ui/react/toggle";
import { Tooltip } from "@base-ui/react/tooltip";
import {
  CheckIcon,
  ChevronDownIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import BackButton from "@/components/BackButton";
import BottomBar from "@/components/BottomBar";
import Box from "@/components/Box";
import Button from "@/components/Button";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";

const FORM_CONTROL_CLASS_NAME =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-800 shadow-sm outline-hidden placeholder:text-zinc-400 focus:border-zinc-700 focus:ring-2 focus:ring-zinc-700/20 sm:max-w-xs";

const POPOVER_ARROW_CLASS_NAME =
  "relative block h-1.5 w-3 overflow-clip data-[side=bottom]:top-[-6px] data-[side=left]:right-[-9px] data-[side=left]:rotate-90 data-[side=right]:left-[-9px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-6px] data-[side=top]:rotate-180 before:absolute before:bottom-0 before:left-1/2 before:h-[calc(6px*sqrt(2))] before:w-[calc(6px*sqrt(2))] before:border before:border-zinc-300 before:bg-white before:content-[''] before:[transform:translate(-50%,50%)_rotate(45deg)]";

const TOOLTIP_ARROW_CLASS_NAME =
  "relative block h-1.5 w-3 overflow-clip data-[side=bottom]:top-[-6px] data-[side=left]:right-[-9px] data-[side=left]:rotate-90 data-[side=right]:left-[-9px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-6px] data-[side=top]:rotate-180 before:absolute before:bottom-0 before:left-1/2 before:h-[calc(6px*sqrt(2))] before:w-[calc(6px*sqrt(2))] before:bg-zinc-700 before:content-[''] before:[transform:translate(-50%,50%)_rotate(45deg)]";

const LOGOS = [
  {
    alt: "haritssr.com logo",
    name: "Harits Syah",
    src: "/Icons/haritssr.svg",
    url: "haritssr.com",
  },
  {
    alt: "Haris Lab logo",
    name: "Haris Lab",
    src: "/Icons/harislab.svg",
    url: "harislab.com",
  },
  {
    alt: "Haris Studio logo",
    name: "Haris Studio",
    src: "/Icons/harisstudio.svg",
    url: "harisstudio.com",
  },
] as const;

const MAIN_COLORS = [
  { className: "bg-green-500", name: "Success", value: "#34c759" },
  { className: "bg-yellow-500", name: "Attention", value: "#eab308" },
  { className: "bg-red-500", name: "Danger", value: "#ef4444" },
  { className: "bg-action", name: "Action", value: "#2563eb" },
  { className: "bg-zinc-800", name: "Black", value: "#27272a" },
  { className: "border bg-white", name: "Background", value: "#fff" },
] as const;

const ZINC_COLORS = [
  { className: "border bg-white", name: "white", value: "#fff" },
  { className: "border bg-zinc-50", name: "zinc-50", value: "#fafafa" },
  { className: "bg-zinc-100", name: "zinc-100", value: "#f4f4f5" },
  { className: "bg-zinc-200", name: "zinc-200", value: "#e4e4e7" },
  { className: "bg-zinc-300", name: "zinc-300", value: "#d4d4d8" },
  { className: "bg-zinc-400", name: "zinc-400", value: "#a1a1aa" },
  { className: "bg-zinc-500", name: "zinc-500", value: "#6b7280" },
  { className: "bg-zinc-600", name: "zinc-600", value: "#52525b" },
  { className: "bg-zinc-700", name: "zinc-700", value: "#3f3f46" },
  { className: "bg-zinc-800", name: "zinc-800", value: "#27272a" },
  { className: "bg-zinc-900", name: "zinc-900", value: "#18181b" },
  { className: "bg-black", name: "black", value: "#000" },
] as const;

const BADGES = [
  { className: "border-zinc-300 text-zinc-600", name: "General" },
  { className: "border-green-300 text-green-600", name: "Success" },
  { className: "border-red-300 text-red-600", name: "Danger" },
  { className: "border-yellow-300 text-yellow-600", name: "Attention" },
  { className: "border-purple-300 text-purple-600", name: "Information" },
] as const;

export default function DesignSystem() {
  const [pressed, setPressed] = useState(false);

  const [loading, setLoading] = useState(false);
  const loadingTimerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (loadingTimerRef.current !== null) {
        window.clearTimeout(loadingTimerRef.current);
      }
    },
    []
  );

  const handleLoadingClick = useCallback(() => {
    setLoading(true);
    if (loadingTimerRef.current !== null) {
      window.clearTimeout(loadingTimerRef.current);
    }
    loadingTimerRef.current = window.setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);
  return (
    <>
      <PageTitle title="Design" />
      <PageDescription
        description={
          <>
            Design system used in this site,{" "}
            <ExternalLink
              href="https://harisstudio.vercel.app"
              name="Haris Studio"
            />{" "}
            and{" "}
            <ExternalLink href="https://www.harislab.com" name="Haris Lab" />.
          </>
        }
      />
      <Section name="Design Principles" />
      <ExplanationList>
        <li>
          A design system is a set of rules and opinions that shape the user
          interface and the experience as a whole.
        </li>
        <li>
          Design principles explain <span className="font-semibold">why</span>{" "}
          we make specific decisions; implementation explains{" "}
          <span className="font-semibold">how</span> they work in code.
        </li>
        <li>
          The Components system takes cues from the tools used to solve math and
          physics problems: paper, pencils, whiteboards, and pencil cases.
        </li>
        <li>
          Why is it called &quot;Components&quot;?
          <ul className="mt-1 list-outside list-disc space-y-1 pl-4">
            <li>
              The name makes the purpose of this page clear in navigation.
            </li>
            <li>
              Blue, black, gray, and white keep the visual language focused and
              familiar.
            </li>
          </ul>
        </li>
        <li>
          Distinguish between link and button, link to navigate, button for
          action.
          <ul className="mt-1 list-outside list-disc space-y-1 pl-4">
            <li>
              Both need clear hover, active, and focus-visible states when those
              states are relevant.
            </li>
            <li>
              A link navigates; a button performs an action. Their visual
              treatment should reinforce that distinction.
            </li>
          </ul>
        </li>
        <li>
          Prefer the system&apos;s basic colors and components to accelerate
          development while maintaining consistency.
        </li>
        <li>
          Components include responsive behavior and keyboard focus treatment
          where interaction requires it.
        </li>
        <li>The system is designed for both mobile and desktop web.</li>
        <li>
          View the component code{" "}
          <ExternalLink
            href="https://github.com/haritssr/haritssr/tree/main/components"
            name="here"
          />
        </li>
        <li>
          Explore other variations in the{" "}
          <InternalLink href="/experiments/radix-ui">Radix UI</InternalLink> or{" "}
          <InternalLink href="/experiments/headless-ui">
            Headless UI
          </InternalLink>
        </li>
        <li className="text-zinc-500">
          Still evolving: typography, use cases, do&apos;s and don&apos;ts, and
          component-specific guidance are next.
        </li>
      </ExplanationList>
      <div className="mb-10" />
      <Section name="UI Components" />
      <Toast.Provider>
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <Box title="Switch">
            <Switch.Root
              aria-label="Enable notifications"
              className="block w-11 rounded-full bg-zinc-300 p-1 outline-hidden transition-colors focus-visible:outline-2 focus-visible:outline-action data-checked:bg-action"
              defaultChecked
              id="s1"
            >
              <Switch.Thumb className="block h-4 w-4 rounded-full bg-white shadow transition-transform duration-100 will-change-transform data-checked:translate-x-5" />
            </Switch.Root>
          </Box>
          <Box title="Accordion">
            <Accordion.Root className="w-full max-w-xs" multiple>
              <Accordion.Item value="item-1">
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-left font-medium text-sm text-zinc-800 outline-hidden transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-action data-panel-open:rounded-b-none data-panel-open:bg-zinc-100">
                    <span>What is an accordion?</span>
                    <ChevronDownIcon className="h-5 w-5 text-zinc-800 transition-transform duration-200 group-data-panel-open:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Panel className="rounded-b-lg border-zinc-300 border-r border-b border-l bg-white p-3 text-sm text-zinc-600">
                  An accordion reveals related content without taking permanent
                  space in the layout.
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion.Root>
          </Box>
          <Box title="Checkbox">
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
              <Checkbox.Root
                className="flex h-6 w-6 items-center justify-center rounded-md border border-zinc-400 bg-white shadow-sm outline-hidden hover:border-zinc-500 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-action data-checked:border-action data-checked:bg-action data-checked:shadow-blue-300"
                defaultChecked
                id="c1"
              >
                <Checkbox.Indicator className="text-white">
                  <CheckIcon className="h-5 w-5" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label className="select-none text-zinc-800" htmlFor="c1">
                Accept terms and conditions.
              </label>
            </div>
          </Box>
          <Box title="Popover">
            <Popover.Root>
              <Popover.Trigger render={<Button />}>
                Show Popover
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Positioner side="bottom" sideOffset={10}>
                  <Popover.Popup
                    aria-label="Popover example"
                    className="w-[min(80vw,24rem)] rounded-lg border border-zinc-300 bg-white p-4 text-sm text-zinc-700 shadow-xl outline-hidden"
                  >
                    Popovers are useful for short, contextual information.
                    <Popover.Close className="mt-3 block text-action text-sm hover:text-action-hover hover:underline focus-visible:outline-2 focus-visible:outline-action">
                      Close
                    </Popover.Close>
                    <Popover.Arrow className={POPOVER_ARROW_CLASS_NAME} />
                  </Popover.Popup>
                </Popover.Positioner>
              </Popover.Portal>
            </Popover.Root>
          </Box>
          <Box title="Table">
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[280px] border-collapse divide-y divide-zinc-300 border border-zinc-300 text-sm text-zinc-800">
                <caption className="sr-only">Example data table</caption>
                <thead>
                  <tr className="divide-x divide-zinc-300 bg-zinc-50">
                    <th className="px-3 py-2 text-left font-medium" scope="col">
                      Name
                    </th>
                    <th className="px-3 py-2 text-left font-medium" scope="col">
                      Role
                    </th>
                    <th className="px-3 py-2 text-left font-medium" scope="col">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  <tr className="divide-x divide-zinc-200">
                    <td className="px-3 py-2">Ada</td>
                    <td className="px-3 py-2">Engineer</td>
                    <td className="px-3 py-2">Active</td>
                  </tr>
                  <tr className="divide-x divide-zinc-200">
                    <td className="px-3 py-2">Grace</td>
                    <td className="px-3 py-2">Designer</td>
                    <td className="px-3 py-2">Away</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Box>
          <Box title="Tabs">
            <Tabs.Root
              className="flex w-full max-w-sm flex-col"
              defaultValue="tab1"
            >
              <Tabs.List
                aria-label="Account settings"
                className="flex shrink-0 gap-1 rounded-lg bg-zinc-100 p-1"
              >
                <Tabs.Tab
                  className="flex flex-1 cursor-pointer select-none items-center justify-center rounded-md border border-transparent bg-transparent px-3 py-1.5 font-medium text-sm text-zinc-500 outline-hidden hover:bg-white/70 focus-visible:outline-2 focus-visible:outline-action data-active:border-zinc-300 data-active:bg-white data-active:text-zinc-800 data-active:shadow"
                  value="tab1"
                >
                  Account
                </Tabs.Tab>
                <Tabs.Tab
                  className="flex flex-1 cursor-pointer select-none items-center justify-center rounded-md border border-transparent bg-transparent px-3 py-1.5 font-medium text-sm text-zinc-500 outline-hidden hover:bg-white/70 focus-visible:outline-2 focus-visible:outline-action data-active:border-zinc-300 data-active:bg-white data-active:text-zinc-800 data-active:shadow"
                  value="tab2"
                >
                  Password
                </Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel
                className="mt-2 grow rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-600 outline-hidden focus-visible:outline-2 focus-visible:outline-action"
                value="tab1"
              >
                Update your profile details and account preferences.
              </Tabs.Panel>
              <Tabs.Panel
                className="mt-2 grow rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-600 outline-hidden focus-visible:outline-2 focus-visible:outline-action"
                value="tab2"
              >
                Change your password and keep your account secure.
              </Tabs.Panel>
            </Tabs.Root>
          </Box>
          <ToastDemo />

          <Box title="Button: Primary">
            <Button>Button</Button>
          </Box>
          <Box title="Button: Loading">
            <Button loading={loading} onClick={handleLoadingClick}>
              Button
            </Button>
          </Box>
          <Box title="Button: Secondary">
            <Button variant="secondary">Button</Button>
          </Box>
          <Box title="Button: With Icon">
            <Button variant="secondary">
              <svg
                aria-hidden="true"
                className="h-[18px] w-[18px] text-zinc-800"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Bookmark</span>
            </Button>
          </Box>
          <Box title="Button: Only Icon">
            <Button aria-label="Bookmark" iconOnly variant="secondary">
              <svg
                aria-hidden="true"
                className="h-5 w-4 text-zinc-800"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </Box>
          <Box title="Button: Danger">
            <Button variant="danger">Delete</Button>
          </Box>
          <Box title="Button: Disabled">
            <Button disabled variant="secondary">
              Button
            </Button>
          </Box>
          <Box title="Internal Link">
            <InternalLink href="/">Internal Link</InternalLink>
          </Box>
          <Box title="External Link">
            <ExternalLink
              href="https://www.harislab.com"
              name="External Link"
            />
          </Box>
          <Box title="Input: Text">
            <label className="block w-full sm:max-w-xs">
              <span className="sr-only">Text input</span>
              <input
                className={FORM_CONTROL_CLASS_NAME}
                placeholder="Type something..."
                type="text"
              />
            </label>
          </Box>
          <Box title="Input: Search">
            <label className="block w-full sm:max-w-xs">
              <span className="sr-only">Search input</span>
              <input
                className={FORM_CONTROL_CLASS_NAME}
                placeholder="Search"
                type="search"
              />
            </label>
          </Box>
          <Box title="Input: Number">
            <label className="block w-full sm:max-w-xs">
              <span className="sr-only">Number input</span>
              <input
                className={FORM_CONTROL_CLASS_NAME}
                min="0"
                placeholder="0"
                type="number"
              />
            </label>
          </Box>
          <Box title="Box">
            <div className="w-[200px] overflow-hidden rounded-md border border-zinc-400/50 sm:w-[300px]">
              <div className="select-none border-zinc-400/50 border-b bg-zinc-50 px-3 py-2 font-medium text-zinc-800">
                Title
              </div>
              <div className="flex h-32 items-center justify-center p-5">
                Content
              </div>
            </div>
          </Box>
          <Box title="Text Area">
            <textarea
              className={FORM_CONTROL_CLASS_NAME}
              placeholder="Write something here..."
              rows={3}
            />
          </Box>
          <Box title="Toggle">
            <Toggle
              aria-label="Toggle example"
              className="select-none rounded-lg border border-zinc-300 bg-white px-3 py-1.5 font-medium text-sm text-zinc-800 shadow-sm outline-hidden hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-action data-pressed:border-blue-300 data-pressed:text-action data-pressed:shadow-blue-100"
              onPressedChange={setPressed}
              pressed={pressed}
            >
              {pressed ? "State: on" : "State: off"}
            </Toggle>
          </Box>
          <Box title="Breadcrumbs">
            <nav aria-label="Breadcrumb" className="text-sm">
              <ol className="flex flex-wrap items-center gap-1 text-zinc-500">
                <li>
                  <a className="hover:text-zinc-800 hover:underline" href="/">
                    home
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <a
                    className="hover:text-zinc-800 hover:underline"
                    href="/design"
                  >
                    design
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-zinc-800">
                  buttons
                </li>
              </ol>
            </nav>
          </Box>
          <Box title="Badges">
            <div className="flex flex-wrap gap-2">
              {BADGES.map((badge) => (
                <Badge className={badge.className} key={badge.name}>
                  {badge.name}
                </Badge>
              ))}
            </div>
          </Box>
          <Box title="Back Button">
            <div className="-mt-10">
              <BackButton href="/" name="Previous Page" />
            </div>
          </Box>
          <Box title="Tooltip">
            <Tooltip.Provider>
              <Tooltip.Root>
                <div className="flex space-x-1">
                  <div className="text-zinc-700">Tooltip</div>
                  <Tooltip.Trigger className="flex items-center rounded px-1 py-0.5 hover:bg-zinc-100 active:ring-1 active:ring-zinc-700">
                    <ExclamationCircleIcon
                      className="h-4 w-4 text-zinc-600 hover:text-zinc-700"
                      strokeWidth={2}
                    />
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Positioner align="center" side="top">
                      <Tooltip.Popup className="rounded-md bg-zinc-700 px-2.5 py-1.5 text-white shadow-xl">
                        <div>Hey, I am Tooltip!</div>
                        <Tooltip.Arrow className={TOOLTIP_ARROW_CLASS_NAME} />
                      </Tooltip.Popup>
                    </Tooltip.Positioner>
                  </Tooltip.Portal>
                </div>
              </Tooltip.Root>
            </Tooltip.Provider>
          </Box>
          <Box title="Logo">
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
              {LOGOS.map((logo) => (
                <div className="space-y-2 text-center" key={logo.name}>
                  <Image
                    alt={logo.alt}
                    className="mx-auto h-10 w-10"
                    height={40}
                    src={logo.src}
                    width={40}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm text-zinc-800 sm:text-base">
                      {logo.name}
                    </span>
                    <span className="text-sm text-zinc-400 sm:text-base">
                      {logo.url}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Box>
          <Box title="Modal">
            <Dialog.Root>
              <Dialog.Trigger render={<Button variant="secondary" />}>
                Open Modal
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Backdrop className="fixed inset-0 z-40 bg-zinc-950/50 backdrop-blur-[2px]" />
                <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 max-h-[85vh] w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border border-zinc-300 bg-white p-5 shadow-xl outline-hidden focus-visible:outline-2 focus-visible:outline-action sm:p-6">
                  <Dialog.Title className="font-semibold text-lg text-zinc-800">
                    Modal title
                  </Dialog.Title>
                  <Dialog.Description className="mt-2 mb-5 text-sm text-zinc-600 leading-normal">
                    Dialogs focus attention on a short task or decision.
                  </Dialog.Description>
                  <div className="rounded-lg bg-zinc-50 p-4 text-sm text-zinc-600">
                    Content stays inside the dialog while the page beneath it is
                    temporarily inert.
                  </div>
                  <div className="mt-5 flex justify-end gap-2">
                    <Dialog.Close render={<Button variant="secondary" />}>
                      Cancel
                    </Dialog.Close>
                    <Dialog.Close render={<Button />}>Continue</Dialog.Close>
                  </div>
                  <Dialog.Close
                    aria-label="Close"
                    className="absolute top-3 right-3 inline-flex h-8 w-8 appearance-none items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 focus-visible:outline-2 focus-visible:outline-action"
                  >
                    <XMarkIcon aria-hidden="true" className="h-4 w-4" />
                  </Dialog.Close>
                </Dialog.Popup>
              </Dialog.Portal>
            </Dialog.Root>
          </Box>
          <Box title="Select">
            <Select.Root defaultValue="design">
              <Select.Trigger
                aria-label="Choose a discipline"
                className="inline-flex min-w-40 items-center justify-between gap-3 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-800 shadow-sm outline-hidden hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-action"
              >
                <Select.Value placeholder="Choose one" />
                <Select.Icon>
                  <ChevronDownIcon className="h-4 w-4" />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Positioner sideOffset={4}>
                  <Select.Popup className="z-50 overflow-hidden rounded-lg border border-zinc-300 bg-white shadow-xl">
                    <Select.List className="p-1">
                      <Select.Item
                        className="relative flex cursor-pointer select-none items-center rounded-md py-1.5 pr-8 pl-2 text-sm text-zinc-700 outline-hidden data-highlighted:bg-zinc-100 data-highlighted:text-zinc-900"
                        value="design"
                      >
                        <Select.ItemText>Design</Select.ItemText>
                        <Select.ItemIndicator className="absolute right-2">
                          <CheckIcon className="h-4 w-4" />
                        </Select.ItemIndicator>
                      </Select.Item>
                      <Select.Item
                        className="relative flex cursor-pointer select-none items-center rounded-md py-1.5 pr-8 pl-2 text-sm text-zinc-700 outline-hidden data-highlighted:bg-zinc-100 data-highlighted:text-zinc-900"
                        value="engineering"
                      >
                        <Select.ItemText>Engineering</Select.ItemText>
                        <Select.ItemIndicator className="absolute right-2">
                          <CheckIcon className="h-4 w-4" />
                        </Select.ItemIndicator>
                      </Select.Item>
                    </Select.List>
                  </Select.Popup>
                </Select.Positioner>
              </Select.Portal>
            </Select.Root>
          </Box>
          <Box title="Bottom Navigation Mobile">
            <BottomBar preview />
          </Box>
          <Box title="Slider">
            <Slider.Root
              className="relative flex w-full max-w-sm select-none items-center"
              defaultValue={50}
              max={100}
              step={1}
            >
              <Slider.Control className="relative flex w-full touch-none items-center">
                <Slider.Track className="relative h-2 flex-1 rounded-full bg-zinc-200">
                  <Slider.Indicator className="absolute h-full rounded-full bg-action" />
                  <Slider.Thumb
                    aria-label="Volume"
                    className="block h-5 w-5 cursor-pointer rounded-full border border-zinc-300 bg-white shadow outline-hidden hover:border-zinc-400 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-action"
                  />
                </Slider.Track>
              </Slider.Control>
            </Slider.Root>
          </Box>
          <Box title="Context Menus">
            <ContextMenuDemo />
          </Box>
          <Box title="Date Picker">
            <label className="block w-full sm:max-w-xs">
              <span className="mb-1 block font-medium text-sm text-zinc-700">
                Choose a date
              </span>
              <input className={FORM_CONTROL_CLASS_NAME} type="date" />
            </label>
          </Box>
          <Box title="Main Colors">
            <div className="grid grid-cols-3 gap-5 sm:grid-cols-4">
              {MAIN_COLORS.map((color) => (
                <ColorSwatch
                  className={color.className}
                  key={color.name}
                  name={color.name}
                  value={color.value}
                />
              ))}
            </div>
          </Box>
          <Box title="Hierarchical Colors">
            <div className="grid grid-cols-4 gap-x-5 gap-y-1 sm:grid-cols-6 sm:gap-y-5">
              {ZINC_COLORS.map((color) => (
                <ColorSwatch
                  className={color.className}
                  key={color.name}
                  name={color.name}
                  value={color.value}
                />
              ))}
            </div>
          </Box>
        </section>
      </Toast.Provider>

      <div className="mt-10" />
      <Section name="Figma Design" />
      <div className="mt-5">
        <iframe
          allowFullScreen
          className="min-h-[32rem] w-full rounded-lg border border-zinc-300"
          height="450"
          loading="lazy"
          src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FmhfH2JaaCDzRSL71XcSnUw%2FHaris-Lab%3Ftype%3Ddesign%26node-id%3D1416%253A236%26mode%3Ddesign%26t%3DwxLQxcZHLYNHFvrj-1"
          title="Haris Lab Figma design"
          width="800"
        />
      </div>
    </>
  );
}

function ToastDemo() {
  return (
    <>
      <Box title="Toast">
        <ToastButton />
      </Box>
      <Toast.Portal>
        <Toast.Viewport className="fixed right-0 bottom-0 z-50 m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-2 p-3 outline-hidden sm:p-6">
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </>
  );
}

function ToastButton() {
  const toastManager = Toast.useToastManager();

  const handleShowToast = useCallback(() => {
    toastManager.add({
      description: "Your action was completed.",
      title: "Toast notification",
    });
  }, [toastManager]);

  return <Button onClick={handleShowToast}>Show Toast</Button>;
}

function ToastList() {
  const { toasts } = Toast.useToastManager();

  return toasts.map((toast) => (
    <Toast.Root
      className="rounded-lg border border-zinc-300 bg-white shadow-xl transition-[transform,opacity] duration-200 ease-out data-ending-style:translate-x-full data-starting-style:translate-x-full data-ending-style:opacity-0 data-starting-style:opacity-0"
      key={toast.id}
      swipeDirection="right"
      toast={toast}
    >
      <Toast.Content className="grid grid-cols-[auto_max-content] items-center gap-x-4 py-3 pr-4 pl-4 [grid-template-areas:'title_action'_'description_action']">
        <div>
          <Toast.Title className="font-medium text-sm text-zinc-800 [grid-area:title]" />
          <Toast.Description className="m-0 text-xs text-zinc-500 leading-[1.3] [grid-area:description]" />
        </div>
        <Toast.Close className="rounded px-2 py-1 text-action text-sm hover:bg-zinc-100 hover:text-action-hover focus-visible:outline-2 focus-visible:outline-action">
          OK
        </Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ));
}

function Badge({
  children,
  className,
}: {
  children: string;
  className: string;
}) {
  return (
    <span
      className={`w-fit select-none rounded-full border px-2.5 py-0.5 text-center font-medium text-sm ${className}`}
    >
      {children}
    </span>
  );
}

function ColorSwatch({
  className,
  name,
  value,
}: {
  className: string;
  name: string;
  value: string;
}) {
  return (
    <figure className="space-y-1">
      <div aria-hidden="true" className={`h-12 w-12 rounded ${className}`} />
      <figcaption className="text-[13px] text-zinc-500">
        <div>{name}</div>
        <div>{value}</div>
      </figcaption>
    </figure>
  );
}

function ContextMenuDemo() {
  const [action, setAction] = useState("Right-click the panel");

  return (
    <div className="space-y-2">
      <ContextMenu.Root>
        <ContextMenu.Trigger className="flex min-h-20 w-full max-w-xs items-center justify-center rounded-lg border border-zinc-300 border-dashed bg-zinc-50 px-3 text-sm text-zinc-600 outline-hidden hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-action">
          Right-click here
        </ContextMenu.Trigger>
        <ContextMenu.Portal>
          <ContextMenu.Positioner>
            <ContextMenu.Popup className="z-50 min-w-40 rounded-lg border border-zinc-300 bg-white p-1 shadow-xl">
              <ContextMenu.Item
                className="cursor-pointer rounded-md px-2 py-1.5 text-sm text-zinc-700 outline-hidden data-highlighted:bg-zinc-100"
                onClick={() => setAction("Edit selected")}
              >
                Edit
              </ContextMenu.Item>
              <ContextMenu.Item
                className="cursor-pointer rounded-md px-2 py-1.5 text-sm text-zinc-700 outline-hidden data-highlighted:bg-zinc-100"
                onClick={() => setAction("Duplicate selected")}
              >
                Duplicate
              </ContextMenu.Item>
            </ContextMenu.Popup>
          </ContextMenu.Positioner>
        </ContextMenu.Portal>
      </ContextMenu.Root>
      <p className="text-xs text-zinc-500">{action}</p>
    </div>
  );
}
