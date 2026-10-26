import {
  ArrowDownTrayIcon,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  DocumentTextIcon,
  LinkIcon,
  MagnifyingGlassIcon,
  PauseIcon,
  RssIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import type { ReactNode } from "react";

import InstallButton from "@/components/InstallButton";

const PREVIEW_PANEL =
  "border-border bg-background shadow-foreground/5 w-full min-w-0 rounded-xl border text-sm shadow-lg";

const features = [
  {
    title: "Search",
    shortcut: "⌘P/Ctrl+P",
    description: "Find pages across the site and run global commands.",
    preview: <SearchPreview />,
  },
  {
    title: "Contents",
    shortcut: "Opt+C/Alt+C",
    description: "Jump to sections within articles and nested pages.",
    preview: <ContentsPreview />,
  },
  {
    title: "Share",
    shortcut: "Opt+S/Alt+S",
    description: "Copy the current page URL, including its section link.",
    preview: <SharePreview />,
  },
  {
    title: "Timer",
    shortcut: "Opt+T/Alt+T",
    description: "Track tasks and keep a timer running across pages.",
    preview: <TimerPreview />,
  },
  {
    title: "RSS",
    shortcut: "Opt+R/Alt+R",
    description: "Subscribe to new writing in your feed reader.",
    preview: <FeedPreview />,
  },
  {
    title: "Install",
    shortcut: "Opt+I/Alt+I",
    description: "Add the site to your home screen for quick access.",
    preview: <InstallPreview />,
  },
];

export default function Features() {
  return (
    <ul className="grid grid-cols-1 overflow-hidden rounded-2xl sm:grid-cols-2 md:grid-cols-3">
      {features.map(({ title, shortcut, description, preview }) => (
        <li
          className="border-border bg-foreground/2 flex min-w-0 flex-col border-b border-dashed px-6 py-8 last:border-b-0 sm:max-md:not-nth-[2n]:border-r sm:max-md:nth-last-[-n+2]:border-b-0 md:not-nth-[3n]:border-r md:nth-last-[-n+3]:border-b-0"
          key={title}
        >
          <div
            aria-hidden={title === "Install" ? undefined : true}
            className="mb-6 flex min-h-60 min-w-0 items-center justify-center p-5"
          >
            {preview}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <h3 className="text-foreground font-medium">{title}</h3>
            <kbd className="text-foreground/70 text-sm whitespace-nowrap">
              {shortcut}
            </kbd>
          </div>
          <p className="text-muted mt-1">{description}</p>
        </li>
      ))}
    </ul>
  );
}

function PanelHeading({ children }: { children: ReactNode }) {
  return (
    <div className="border-border text-foreground flex items-center gap-2 border-b px-3 py-2.5 font-medium">
      {children}
    </div>
  );
}

function SearchPreview() {
  return (
    <div className={PREVIEW_PANEL}>
      <PanelHeading>
        <MagnifyingGlassIcon className="text-muted size-4 shrink-0" />
        <span className="flex-1">Search pages…</span>
        <span className="text-muted text-xs">⌘P</span>
      </PanelHeading>
      <div className="space-y-1 p-2">
        <div className="bg-action/10 text-action flex items-center gap-2 rounded-md px-2 py-2">
          <DocumentTextIcon className="size-4 shrink-0" />
          <span>Writing</span>
          <span className="ml-auto">↵</span>
        </div>
        <div className="text-muted flex items-center gap-2 px-2 py-2">
          <ClockIcon className="size-4 shrink-0" />
          <span>Open Timer</span>
        </div>
      </div>
    </div>
  );
}

function ContentsPreview() {
  return (
    <div className={PREVIEW_PANEL}>
      <PanelHeading>
        <span className="flex-1">Contents</span>
        <ChevronDownIcon className="size-4" />
      </PanelHeading>
      <div className="space-y-1 p-2">
        <div className="text-muted px-2 py-1.5">Introduction</div>
        <div className="border-action bg-action/10 text-action border-l-2 px-2 py-1.5 font-medium">
          How this works
        </div>
        <div className="text-muted px-2 py-1.5">Details</div>
      </div>
    </div>
  );
}

function SharePreview() {
  return (
    <div className="w-full min-w-0 space-y-3">
      <div className={`${PREVIEW_PANEL} flex items-center gap-2 px-3 py-3`}>
        <LinkIcon className="text-muted size-4 shrink-0" />
        <span className="text-muted min-w-0 flex-1 truncate">
          haritssr.com/music#logics
        </span>
      </div>
      <div className="border-border bg-background text-foreground mx-auto flex w-fit items-center gap-2 rounded-full border px-3 py-2 text-sm shadow-sm">
        <CheckIcon className="text-success size-4" />
        Link copied
      </div>
    </div>
  );
}

function TimerPreview() {
  return (
    <div className="border-foreground/10 bg-background/70 shadow-foreground/10 flex w-full min-w-0 items-center gap-2 rounded-full border py-2 pr-2 pl-5 shadow-lg backdrop-blur-md [corner-shape:round]">
      <div className="min-w-0 flex-1 space-y-2">
        <div className="text-foreground flex min-w-0 items-center justify-between gap-2 text-xs">
          <span className="truncate font-medium">Focused work</span>
          <span className="text-muted shrink-0 tabular-nums">12:30</span>
        </div>
        <div className="bg-foreground/15 h-1.5 rounded-full">
          <div className="bg-foreground h-full w-3/5 rounded-full" />
        </div>
      </div>
      <span className="border-border text-foreground flex size-8 shrink-0 items-center justify-center rounded-full border">
        <CheckIcon className="size-4" />
      </span>
      <span className="bg-foreground text-background flex size-8 shrink-0 items-center justify-center rounded-full">
        <PauseIcon className="size-4" />
      </span>
    </div>
  );
}

function FeedPreview() {
  return (
    <div className={PREVIEW_PANEL}>
      <PanelHeading>
        <RssIcon className="size-4" />
        <span>Latest writing</span>
      </PanelHeading>
      <div className="divide-border divide-y px-3">
        {["Notes on building", "Learning through practice"].map((title) => (
          <div className="space-y-1.5 py-3" key={title}>
            <div className="text-foreground text-xs font-medium">{title}</div>
            <div className="bg-foreground/10 h-1 w-4/5 rounded-full" />
            <div className="bg-foreground/10 h-1 w-3/5 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

function InstallPreview() {
  return (
    <div className={PREVIEW_PANEL}>
      <PanelHeading>
        <ArrowDownTrayIcon aria-hidden="true" className="size-4" />
        <span className="flex-1">Install app</span>
      </PanelHeading>
      <div className="space-y-4 p-3">
        <div className="flex min-w-0 items-center gap-3">
          <Image alt="" height={36} src="/icons/haritssr.svg" width={36} />
          <div className="min-w-0">
            <div className="text-foreground font-medium">Harits Syah</div>
            <div className="text-muted text-xs">haritssr.com</div>
          </div>
        </div>
        <InstallButton placement="feature" />
      </div>
    </div>
  );
}
