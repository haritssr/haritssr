"use client";

import { Accordion } from "@base-ui/react/accordion";
import { Switch } from "@base-ui/react/switch";
import { Tooltip } from "@base-ui/react/tooltip";
import {
  ChevronDownIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

import SourceCodeLink from "@/components/SourceCodeLink";

export default function InlineMakiDemo() {
  return (
    <div className="mx-auto my-20 max-w-xs space-y-2">
      <SourceCodeLink />
      <InlineMAKI value="1" />
      <InlineMAKI value="2" />
      <InlineMAKI value="3" />
      <InlineMAKI value="4" />
      <InlineMAKI value="5" />
    </div>
  );
}

function InlineMAKI({ value }: { value: string }) {
  return (
    <Accordion.Root multiple>
      <Accordion.Item value={value}>
        <Accordion.Header
          render={(props) => <h2 {...props}>{props.children}</h2>}
          className="group"
        >
          <Accordion.Trigger className="w-full">
            <span className="text-tiny flex w-full items-center justify-between rounded-md border border-zinc-200 bg-zinc-50/50 px-3 py-1 group-data-panel-open:rounded-b-none group-data-panel-open:border-b-0">
              <span className="text-zinc-400">Nomor Soal {value}</span>
              <span className="text-action">Kerjakan</span>
            </span>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>
          <div className="space-y-2 rounded-b-md border-r border-b border-l border-zinc-200 bg-zinc-50 px-2 pt-0.5 pb-2">
            <Section title="Masalah" />
            <Section title="Abstraksi" />
            <Section title="Kalkulasi" />
            <div className="flex items-center space-x-1 text-zinc-400">
              <PlusIcon className="h-3 w-3 stroke-2" />
              <span className="text-xs select-none">Interpretasi</span>
            </div>
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  );
}

function Section({ title }: { title: string }) {
  return (
    <Accordion.Root multiple>
      <Accordion.Item className="rounded-md bg-white shadow" value="s">
        <div className="flex w-full items-center justify-between overflow-hidden rounded border border-zinc-400 bg-zinc-100 py-1 pr-3 pl-2 text-sm font-medium">
          <Accordion.Header className="group flex-1">
            <Accordion.Trigger className="flex w-full items-center justify-between text-zinc-700">
              <span>{title}</span>
              <ChevronDownIcon
                aria-hidden="true"
                className="h-4 w-4 stroke-2 text-zinc-500 group-data-panel-open:rotate-180"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger
                aria-label={`Help for ${title}`}
                className="flex items-center rounded px-1 py-0.5 hover:bg-zinc-100 active:ring-1 active:ring-zinc-700"
              >
                <QuestionMarkCircleIcon
                  aria-hidden="true"
                  className="h-4 w-4 text-zinc-400"
                  strokeWidth={2}
                />
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Positioner
                  align="center"
                  side="top"
                  sideOffset={6}
                  className="z-50"
                >
                  <Tooltip.Popup className="rounded-md bg-zinc-700 px-2.5 py-1.5 text-white shadow-xl">
                    Mozilla Developer Network
                    <Tooltip.Arrow
                      render={
                        <svg viewBox="0 0 10 5" width="10" height="5">
                          <path d="M0 0h10L5 5Z" />
                        </svg>
                      }
                      className="absolute top-full left-1/2 -translate-x-1/2 fill-zinc-700"
                    />
                  </Tooltip.Popup>
                </Tooltip.Positioner>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
          <Switch.Root
            aria-label={`Enable ${title}`}
            className="block w-[34px] items-center rounded-full p-[3px] data-checked:bg-green-600 data-unchecked:bg-zinc-600"
          >
            <Switch.Thumb className="block h-3.5 w-3.5 rounded-full bg-white shadow duration-100 will-change-transform data-checked:translate-x-[14px] data-checked:bg-white" />
          </Switch.Root>
        </div>
        <Accordion.Panel className="rounded-b-md border border-zinc-400 duration-100">
          <textarea
            aria-label={title}
            className="h-auto w-full px-2 py-1 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            placeholder="Empty"
            rows={1}
          />
          <div className="flex items-center space-x-2 overscroll-auto border-t border-zinc-400 p-2">
            <ActionButton />
            <ActionButton />
            <ActionButton />
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  );
}

function ActionButton() {
  return (
    <button
      className="flex items-center space-x-1 rounded border border-zinc-400 py-0.5 pr-2 pl-1 text-zinc-700 shadow-sm shadow-zinc-200 duration-100 hover:bg-zinc-50 active:translate-y-px"
      type="button"
    >
      <PlusIcon className="h-3 w-3 stroke-2" />
      <span className="text-xs select-none">Action</span>
    </button>
  );
}
