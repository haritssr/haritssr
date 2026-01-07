"use client";

import {
  ChevronDownIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import {
  Accordion,
  Checkbox,
  Dialog,
  Popover,
  Switch,
  Tabs,
  Toast,
  Toggle,
  Tooltip,
} from "radix-ui";
import React, { Suspense, useState } from "react";
import BackButton from "@/components/BackButton";
import Box from "@/components/Box";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import InternalLink from "@/components/InternalLink";
import Section from "@/components/Section";
import { PageTitle } from "@/components/SubTitle";

// import { Metadata } from "next";
// can't do this, since metadata only possible on server, and this /pure is client, see "use client"
// possible solution: write all of the component below in their own client component
// export const metadata: Metadata = {
// 	title: "Pure",
// 	description: "Design system used in haritssr.com Haris Studio and Haris Lab",
// };

export default function DesignSystem() {
  const [pressed, setPressed] = useState(false);

  // Toast
  // -----------------------------------------------------
  const [open, setOpen] = React.useState(false);
  const eventDateRef = React.useRef(new Date());
  const timerRef = React.useRef(0);
  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  function oneWeekAway() {
    const now = new Date();
    const inOneWeek = now.setDate(now.getDate() + 7);
    return new Date(inOneWeek);
  }
  // -----------------------------------------------------

  const [loading, setLoading] = useState<boolean>(false);
  function handleClick() {
    // setTimeout(() => {
    // 	setLoading(false);
    // }, 2000);
    setLoading(!loading);
  }
  return (
    <>
      <PageTitle
        description={
          <>
            Design system used in{" "}
            <ExternalLink
              big
              href="https://www.haritssr.com"
              name="haritssr.com"
            />
            ,
            <ExternalLink
              big
              href="https://harisstudio.vercel.app"
              name="Haris Studio"
            />{" "}
            and{" "}
            <ExternalLink
              big
              href="https://www.harislab.com"
              name="Haris Lab"
            />
            .
          </>
        }
        title="Pure Design System"
      />
      <Section name="Design Principles" />
      <ExplanationList>
        <li>
          Design System is a set of specific rules of design principles or
          opiniated design that transcendence to the user interface that affect
          user experience as a whole.
        </li>
        <li>
          Design Principles explain <span className="font-semibold">why</span>{" "}
          we do specific things, now <span className="font-semibold">how</span>,{" "}
          <span className="font-semibold">how</span> part is the implementation
          of the code.
        </li>
        <li>
          Pure Design System mimicing the traditional (most cases) environment
          when student solving math and physics problem, like in paper, pencil,
          white board, pencil cases, etc, especially in Analysis (MAKI) process.
        </li>
        <li>Why called &quot;Pure&quot;?</li>
        <ul className="block list-outside list-disc space-y-1 pl-4">
          <li>Well, honestly, I have no idea on naming.</li>
          <li>
            Blue, black, gray, and white seems pure and minimalist color to me,
            and it actually my four favourite colors.
          </li>
          <li>
            The word &quot;Pure&quot; also not a long word so it can fit on the
            TabBars (bottom navigation on mobile-like apps) and top navigation
            bar at desktop).
          </li>
        </ul>
        <li>
          Distinguish between link and button, link to navigate, button for
          action.
        </li>
        <ul className="block list-outside list-disc space-y-1 pl-4">
          <li>
            Both link and button, they must be have hover and active state UI
            representation.
          </li>
          <li>
            Hover state mean you hovering the UI so you ready to act on it, but
            not acting on it yet, and active state is when you act on the UI and
            it doing their own functionality (navigate or doing action)
          </li>
        </ul>
        <li>
          Strive to only using basic color and UI components provided in design
          system to accelerate development, maintaining consistency, and
          familiarity.
        </li>
        <li>
          Each component already have hover, active, and focus state (not all
          component need that state though)
        </li>
        <li>
          This design system is accessible at mobile and desktop web (a.k.a
          responsive).
        </li>
        <li>
          You can see the component code{" "}
          <ExternalLink
            href="https://github.com/haritssr/haritssr/tree/main/components"
            name="here"
          />
        </li>
        <li>
          If you want to see other variation of these component you can see{" "}
          <InternalLink href="/experiments/radix-ui">here</InternalLink> or{" "}
          <InternalLink href="/experiments/headless-ui">here</InternalLink>
        </li>
        <li>
          There is a lot of work to be done in this design system, like:
          typography, use cases, example, do&apos;s and don&apos;t&apos;s,
          description to each UI component, and guidelines. Coming soon.
        </li>
      </ExplanationList>
      <div className="mb-10" />
      <Section name="UI Components" />
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Box title="Switch">
          <Switch.Root
            className="block w-[43px] rounded-full rdx-state-checked:bg-blue-600 rdx-state-unchecked:bg-zinc-600 p-1"
            defaultChecked
            id="s1"
          >
            <Switch.Thumb className="block h-4 w-4 rdx-state-checked:translate-x-[18px] rounded-full bg-white shadow duration-100 will-change-transform" />
          </Switch.Root>
        </Box>
        <Box title="Accordion">
          <Accordion.Root className="w-[200px]" type="multiple">
            <Accordion.Item value="item-1">
              <Accordion.Header className="group">
                <Accordion.Trigger className="flex w-full items-center justify-between rounded-t-md rounded-b-md border border-zinc-400 bg-zinc-200 px-2.5 py-2 text-left font-medium text-tiny text-zinc-800 hover:bg-zinc-100 group-rdx-state-open:rounded-b-none group-rdx-state-open:bg-zinc-100">
                  <div>Title</div>
                  <ChevronDownIcon className="h-5 w-5 text-zinc-800 duration-200 group-rdx-state-open:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className="w-[200px] rounded-b-md border-zinc-400 border-r border-b border-l bg-white p-2.5 text-tiny text-zinc-800 duration-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                reiciendis animi, error in rerum modi.
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </Box>
        <Box title="Checkbox">
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
            <Checkbox.Root
              className="flex h-6 w-6 items-center justify-center rounded-md border border-zinc-400 rdx-state-checked:border-action bg-white rdx-state-checked:bg-action shadow rdx-state-checked:shadow-blue-300 hover:border-zinc-500 hover:bg-zinc-100"
              // defaultChecked
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
            <Popover.Trigger>
              <div className="w-auto rounded-md bg-blue-600 px-3 py-1 text-white ring-1 ring-action hover:bg-[#2563eb]/90 active:ring-1 active:ring-blue-400 active:ring-offset-1">
                Show Popover
              </div>
            </Popover.Trigger>

            {/* <Popover.Anchor /> */}
            <Popover.Content
              className="w-[80vw] max-w-sm rounded-md border border-zinc-300 bg-white p-4 text-zinc-800 shadow-xl"
              side="bottom"
              sideOffset={10}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
              vel fugit ipsum est, perferendis animi accusantium molestiae
              impedit minima ea debitis.
              <Popover.Close />
              <Popover.Arrow className="fill-zinc-300" />
            </Popover.Content>
          </Popover.Root>
        </Box>
        <Box title="Table">
          <table className="w-[200px] divide-y divide-zinc-300 border border-zinc-300 text-zinc-800 sm:w-[300px]">
            <thead>
              <tr className="divide-x divide-zinc-300 border border-zinc-300 bg-zinc-50">
                <th className="font-medium">Title</th>
                <th className="font-medium">Title</th>
                <th className="font-medium">Title</th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x divide-zinc-300 border border-b">
                <td className="text-center">Data</td>
                <td className="text-center">Data</td>
                <td className="text-center">Data</td>
              </tr>
              <tr className="divide-x divide-zinc-300 border border-b">
                <td className="text-center">Data</td>
                <td className="text-center">Data</td>
                <td className="text-center">Data</td>
              </tr>
            </tbody>
          </table>
        </Box>
        <Box title="Tabs">
          <Tabs.Root
            className="flex w-full max-w-[300px] flex-col"
            defaultValue="tab1"
          >
            <Tabs.List
              aria-label="Manage your account"
              className="flex shrink-0 space-x-1 rounded-lg bg-zinc-100 p-1"
            >
              <Tabs.Trigger
                className="flex flex-1 cursor-pointer select-none items-center justify-center rounded-md border border-transparent bg-white py-1 font-medium text-zinc-500 outline-hidden hover:border-zinc-300 hover:bg-zinc-200/80 data-[state=active]:border-zinc-300 data-[state=active]:bg-white data-[state=active]:text-zinc-800 data-[state=active]:shadow data-[state=active]:focus:relative"
                value="tab1"
              >
                Account
              </Tabs.Trigger>
              <Tabs.Trigger
                className="flex flex-1 cursor-pointer select-none items-center justify-center rounded-md border border-transparent bg-white py-1 font-medium text-zinc-500 outline-hidden hover:border-zinc-300 hover:bg-zinc-200/80 data-[state=active]:border-zinc-300 data-[state=active]:bg-white data-[state=active]:text-zinc-800 data-[state=active]:shadow data-[state=active]:focus:relative"
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
                Account description. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Ut molestias veritatis ullam quae rem quis
                aliquam, accusantium debitis sint praesentium.
              </div>
            </Tabs.Content>
            <Tabs.Content
              className="mt-2 grow rounded-md border border-zinc-200 bg-white p-5 outline-hidden"
              value="tab2"
            >
              <div className="">
                Password description. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Ut molestias veritatis ullam quae rem quis
                aliquam, accusantium debitis sint praesentium.
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </Box>
        <Box title="Toast">
          <Toast.Provider swipeDirection="right">
            <button
              className="rounded-md bg-action px-3 py-1 text-white ring-1 ring-action hover:bg-[#2563eb]/90 active:ring-1 active:ring-blue-400 active:ring-offset-1"
              onClick={() => {
                setOpen(false);
                window.clearTimeout(timerRef.current);
                timerRef.current = window.setTimeout(() => {
                  eventDateRef.current = oneWeekAway();
                  setOpen(true);
                }, 100);
              }}
              type="button"
            >
              Show Toast
            </button>

            <Toast.Root
              className="grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-lg border border-zinc-300 bg-white/70 py-3 pr-6 pl-4 shadow-xl saturate-150 backdrop-blur-md [grid-template-areas:'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x) data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out]"
              onOpenChange={setOpen}
              open={open}
            >
              <div className="">
                <Toast.Title className="mb-[5px] font-medium text-[15px] text-slate12 [grid-area:title]">
                  Hai, I am Toast!
                </Toast.Title>
                <Toast.Description asChild>
                  <div className="m-0 text-[13px] text-zinc-500 leading-[1.3] [grid-area:description]">
                    Thanks for clicking me!
                  </div>
                </Toast.Description>
              </div>
              <Toast.Close className="text-action hover:text-[#2563eb]/90">
                OK
              </Toast.Close>
            </Toast.Root>
            <Toast.Viewport className="fixed right-0 bottom-0 z-2147483647 m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-3 outline-hidden sm:p-6" />
          </Toast.Provider>
        </Box>
        <Box title="Internal Link">
          <InternalLink href="/">Internal Link</InternalLink>
        </Box>
        <Box title="External Link">
          <ExternalLink href="https://www.harislab.com" name="External Link" />
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
                <Tooltip.Content
                  align="center"
                  className="rounded-md bg-zinc-700 px-2.5 py-1.5 text-white shadow-xl"
                  side="top"
                >
                  <div>Hey, I am Tooltip!</div>
                  <Tooltip.Arrow
                    className="fill-[#3F3F46]"
                    height={5}
                    offset={5}
                    width={10}
                  />
                </Tooltip.Content>
              </div>
            </Tooltip.Root>
          </Tooltip.Provider>
        </Box>
        <Box title="Button: Primary">
          <button
            className="select-none rounded-md bg-action px-3 py-1 text-white ring-1 ring-action hover:bg-[#2563eb]/90 active:ring-1 active:ring-blue-400 active:ring-offset-1"
            type="button"
          >
            Button
          </button>
        </Box>
        <Box title="Button: Loading">
          <button
            className="select-none rounded-md bg-action px-3 py-1 text-white ring-1 ring-action hover:bg-[#2563eb]/90 active:ring-1 active:ring-blue-400 active:ring-offset-1"
            onClick={handleClick}
            type="button"
          >
            {loading === true ? "Loading..." : "Button"}
          </button>
        </Box>
        <Box title="Button: Secondary">
          <button
            className="select-none rounded-md px-3 py-1 font-medium text-zinc-800 shadow ring-1 ring-zinc-950/20 hover:bg-zinc-50 focus:outline-hidden focus:ring-zinc-800 active:ring-1 active:ring-zinc-500 active:ring-offset-1"
            type="button"
          >
            Button
          </button>
        </Box>
        <Box title="Button: With Icon">
          <button
            className="flex select-none items-center space-x-1 rounded-md px-3 py-1 font-medium text-zinc-800 shadow ring-1 ring-zinc-950/20 hover:bg-zinc-50 focus:outline-hidden focus:ring-zinc-800 active:ring-1 active:ring-zinc-500 active:ring-offset-1"
            type="button"
          >
            <svg
              className="h-[18px] w-[18px] text-zinc-800"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>IDK</title>
              <path
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Bookmark</span>
          </button>
        </Box>
        <Box title="Button: Only Icon">
          <button
            className="flex select-none items-center space-x-1 rounded-md p-1.5 font-medium text-zinc-800 shadow ring-1 ring-zinc-950/20 hover:bg-zinc-50 focus:outline-hidden focus:ring-zinc-800 active:ring-1 active:ring-zinc-500 active:ring-offset-1"
            type="button"
          >
            <svg
              className="h-5 w-5 text-zinc-800"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>IDK</title>
              <path
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Box>
        <Box title="Button: Danger">
          <button
            className="select-none rounded-md px-3 py-1 font-medium text-red-600 shadow ring-1 ring-zinc-950/20 hover:bg-zinc-50 focus:outline-hidden focus:ring-zinc-600 active:ring-1 active:ring-red-500 active:ring-offset-1"
            type="button"
          >
            Button
          </button>
        </Box>
        <Box title="Button: Disabled">
          <button
            className="cursor-not-allowed select-none rounded-md bg-zinc-100 px-3 py-1 font-medium text-zinc-400"
            type="button"
          >
            Button
          </button>
        </Box>
        <Box title="Main Colors">
          <div className="grid grid-cols-3 gap-5 sm:grid-cols-4">
            <div>
              <div className="h-12 w-12 rounded bg-green-500" />
              <div className="text-[13px] text-zinc-400">Success</div>
              <div className="text-[13px] text-zinc-400">#34c759</div>
            </div>
            <div>
              <div className="h-12 w-12 rounded bg-yellow-500" />
              <div className="text-[13px] text-zinc-400">Attention</div>
              <div className="text-[13px] text-zinc-400">#eab308</div>
            </div>
            <div>
              <div className="h-12 w-12 rounded bg-red-500" />
              <div className="text-[13px] text-zinc-400">Danger</div>
              <div className="text-[13px] text-zinc-400">#ef4444</div>
            </div>
            <div>
              <div className="h-12 w-12 rounded bg-action" />
              <div className="text-[13px] text-zinc-400">Action</div>
              <div className="text-[13px] text-zinc-400">#2563eb</div>
            </div>
            <div>
              <div className="h-12 w-12 rounded bg-zinc-800" />
              <div className="text-[13px] text-zinc-400">Black</div>
              <div className="text-[13px] text-zinc-400">#27272a</div>
            </div>
            <div>
              <div className="h-12 w-12 rounded border bg-white" />
              <div className="text-[13px] text-zinc-400">Background</div>
              <div className="text-[13px] text-zinc-400">#fff</div>
            </div>
          </div>
        </Box>
        <Box title="Hierachical Colors">
          <div className="grid grid-cols-4 gap-x-5 gap-y-1 sm:grid-cols-6 sm:gap-y-5">
            <div>
              <div className="h-12 w-12 rounded border bg-white" />
              <div className="text-[13px] text-zinc-400">white</div>
              <div className="text-[13px] text-zinc-400">#fff</div>
            </div>
            <div>
              <div className="h-12 w-12 rounded border bg-zinc-50" />
              <div className="text-[13px] text-zinc-400">zinc-50</div>
              <div className="text-[13px] text-zinc-400">#fafafa</div>
            </div>
            <div>
              <div className="h-12 w-12 rounded bg-zinc-100" />
              <div className="text-[13px] text-zinc-400">zinc-100</div>
              <div className="text-[13px] text-zinc-400">#f4f4f5</div>
            </div>
            <div>
              <div className="h-12 w-12 rounded bg-zinc-200" />
              <div className="text-[13px] text-zinc-400">zinc-200</div>
              <div className="text-[13px] text-zinc-400">#e4e4e7</div>
            </div>
            <div>
              <div className="h-12 w-12 rounded bg-zinc-300" />
              <div className="text-[13px] text-zinc-400">zinc-300</div>
              <div className="text-[13px] text-zinc-400">#d4d4d8</div>
            </div>
            <div>
              <div className="h-12 w-12 rounded bg-zinc-400" />
              <div className="text-[13px] text-zinc-400">zinc-400</div>
              <div className="text-[13px] text-zinc-400">#a1a1aa</div>
            </div>
            <div>
              <div className="h-12 w-12 rounded bg-zinc-500" />
              <div className="text-[13px] text-zinc-400">zinc-500</div>
              <div className="text-[13px] text-zinc-400">#6b7280</div>
            </div>
            <div>
              <div className="h-12 w-12 rounded bg-zinc-600" />
              <div className="text-[13px] text-zinc-400">zinc-600</div>
              <div className="text-[13px] text-zinc-400">#52525b</div>
            </div>
            <div>
              <div className="h-12 w-12 rounded bg-zinc-700" />
              <div className="text-[13px] text-zinc-400">zinc-700</div>
              <div className="text-[13px] text-zinc-400">#3f3f46</div>
            </div>
            <div>
              <div className="h-12 w-12 rounded bg-zinc-800" />
              <div className="text-[13px] text-zinc-400">zinc-800</div>
              <div className="text-[13px] text-zinc-400">#27272a</div>
            </div>
            <div>
              <div className="h-12 w-12 rounded bg-zinc-900" />
              <div className="text-[13px] text-zinc-400">zinc-900</div>
              <div className="text-[13px] text-zinc-400">#18181b</div>
            </div>
            <div>
              <div className="h-12 w-12 rounded bg-black" />
              <div className="text-[13px] text-zinc-400">black</div>
              <div className="text-[13px] text-zinc-400">#000</div>
            </div>
          </div>
        </Box>
        <Box title="Input: Text">
          <input placeholder="Type something..." type="text" />
        </Box>
        <Box title="Input: Search">
          <input placeholder="Search" type="search" />
        </Box>
        <Box title="Input: Number">
          <input placeholder="0" type="number" />
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
            className="w-[200px] rounded-md p-2 shadow ring-1 ring-zinc-950/20 placeholder:text-zinc-400 focus:outline-hidden focus:ring-zinc-800 sm:w-[300px]"
            placeholder="Write something here..."
          />
        </Box>
        <Box title="Toggle">
          <Toggle.Root
            className="select-none rounded-md bg-white px-3 py-1 text-zinc-800 shadow ring-1 hover:bg-zinc-50 focus:outline-hidden focus:ring-action data-[state=on]:text-action data-[state=on]:shadow-blue-100 data-[state=off]:ring-zinc-950/20 data-[state=on]:ring-blue-300"
            onPressedChange={() => {
              setPressed(!pressed);
            }}
            pressed={pressed}
          >
            {pressed ? "State : ON" : "State : OFF"}
          </Toggle.Root>
        </Box>
        <Box title="Breadcrumbs">
          <span className="text-zinc-500">/main/trunk/leaf</span>
        </Box>
        <Box title="Badges">
          <div className="grid grid-cols-1 gap-5">
            <div className="w-fit select-none rounded-full border border-zinc-300 px-2.5 py-0.5 text-center font-medium text-sm text-zinc-600 hover:shadow-zinc-50">
              General
            </div>
            <div className="w-fit select-none rounded-full border border-green-300 px-2.5 py-0.5 text-center font-medium text-green-600 text-sm hover:shadow-green-50">
              Success
            </div>
            <div className="w-fit select-none rounded-full border border-red-300 px-2.5 py-0.5 text-center font-medium text-red-600 text-sm hover:shadow-red-50">
              Danger
            </div>
            <div className="w-fit select-none rounded-full border border-yellow-300 px-2.5 py-0.5 text-center font-medium text-sm text-yellow-600 hover:shadow-yellow-50">
              Attention
            </div>
            <div className="w-fit select-none rounded-full border border-purple-300 px-2.5 py-0.5 text-center font-medium text-purple-600 text-sm hover:shadow-purple-50">
              Information
            </div>
          </div>
        </Box>
        <Box title="Back Button">
          <BackButton href="/" name="Previous Page" />
        </Box>
        <Box title="Logo">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
            <div className="space-y-2">
              <Image
                alt="haritssr.com image"
                className="h-7 w-7 justify-self-center sm:h-10 sm:w-7"
                height={10}
                src="/Icons/haritssr.svg"
                width={10}
              />
              <div className="flex flex-col">
                <span className="justify-self-center text-gray-800 text-sm sm:text-base">
                  Harits Syah
                </span>
                <span className="justify-self-center text-gray-400 text-sm sm:text-base">
                  haritssr.com
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Image
                alt="Haris Lab image"
                className="h-7 w-7 justify-self-center sm:h-10 sm:w-7"
                height={10}
                src="/Icons/harislab.svg"
                width={10}
              />
              <div className="flex flex-col">
                <span className="justify-self-center text-gray-800 text-sm sm:text-base">
                  Haris Lab
                </span>
                <span className="justify-self-center text-gray-400 text-sm sm:text-base">
                  harislab.com
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Image
                alt="Haris Studio image"
                className="h-7 w-7 justify-self-center sm:h-10 sm:w-7"
                height={10}
                src="/Icons/harisstudio.svg"
                width={10}
              />
              <div className="flex flex-col">
                <span className="justify-self-center text-gray-800 text-sm sm:text-base">
                  Haris Studio
                </span>
                <span className="justify-self-center text-gray-400 text-sm sm:text-base">
                  harisstudio.com
                </span>
              </div>
            </div>
          </div>
        </Box>
        <Box title="Modal">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button
                className="select-none rounded-md px-3 py-1 font-medium text-zinc-800 shadow ring-1 ring-zinc-950/20 hover:bg-zinc-50 focus:outline-hidden focus:ring-zinc-800 active:ring-1 active:ring-zinc-500 active:ring-offset-1"
                type="button"
              >
                Open Modal
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-blackA9" />
              <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md border border-zinc-300 bg-white p-[25px] shadow-lg focus:outline-hidden">
                <Dialog.Title className="font-medium text-base text-zinc-800">
                  Title
                </Dialog.Title>
                <Dialog.Description className="mt-[10px] mb-5 text-[15px] text-mauve11 leading-normal">
                  Description
                </Dialog.Description>
                <div className="flex h-24 items-center justify-center">
                  Some content
                </div>
                <div className="mt-[25px] flex justify-end space-x-2">
                  <Dialog.Close asChild>
                    <button
                      className="select-none rounded border border-zinc-300 bg-zinc-100 px-3 py-1 font-medium text-zinc-800 hover:bg-zinc-200/70 active:ring-1 active:ring-zinc-500 active:ring-offset-1"
                      type="button"
                    >
                      Action
                    </button>
                  </Dialog.Close>
                  <Dialog.Close asChild>
                    <button
                      className="select-none rounded bg-action px-3 py-1 text-white hover:bg-[#2563eb]/90 active:ring-1 active:ring-blue-400 active:ring-offset-1"
                      type="button"
                    >
                      Action
                    </button>
                  </Dialog.Close>
                </div>
                <Dialog.Close asChild>
                  <button
                    aria-label="Close"
                    className="absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-hidden"
                    type="button"
                  >
                    <Cross2Icon />
                  </button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </Box>
        <Box title="Select">
          <ComingSoon />
        </Box>
        <Box title="Bottom Navigation Mobile">
          <ComingSoon />
        </Box>
        <Box title="Slider">
          <ComingSoon />
        </Box>
        <Box title="Context Menus">
          <ComingSoon />
        </Box>
        <Box title="Date Picker">
          <ComingSoon />
        </Box>
      </section>
      <div className="mt-10" />
      <Section name="Figma Design" />
      <Suspense fallback={`"Loading...`}>
        <div className="mt-5 space-y-20">
          <iframe
            allowFullScreen
            className="min-h-screen w-full border"
            height="450"
            src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FmhfH2JaaCDzRSL71XcSnUw%2FHaris-Lab%3Ftype%3Ddesign%26node-id%3D1416%253A236%26mode%3Ddesign%26t%3DwxLQxcZHLYNHFvrj-1"
            title="idk"
            width="800"
          />
        </div>
      </Suspense>
    </>
  );
}

function ComingSoon() {
  return (
    <div className="select-none rounded-full border border-purple-300 px-3 py-1 font-semibold text-purple-600 text-tiny hover:shadow-purple-50 hover:shadow-xl">
      Coming Soon
    </div>
  );
}
