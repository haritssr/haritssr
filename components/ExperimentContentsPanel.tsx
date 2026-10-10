"use client";

import "katex/dist/katex.min.css";
import { Drawer } from "@base-ui/react/drawer";
import { Popover } from "@base-ui/react/popover";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { memo } from "react";
import type { MouseEvent } from "react";

import Button from "@/components/Button";
import InternalLink from "@/components/InternalLink";
import type {
  ContentsEntry,
  ContentsLabelPart,
} from "@/utils/experimentTableOfContents";
import katexify from "@/utils/katexify";

import styles from "./ExperimentContentsPanel.module.css";

interface ContentsListProps {
  activeId: string;
  entries: ContentsEntry[];
  onSelect: (entry: ContentsEntry, focus: boolean) => void;
}

const ContentsLabel = memo(({ parts }: { parts: ContentsLabelPart[] }) =>
  parts.map((part, index) => (
    <span key={`${part.kind}-${index}`}>
      {part.kind === "math" ? katexify(part.value, false) : part.value}
    </span>
  ))
);
ContentsLabel.displayName = "ContentsLabel";

function ContentsList({ activeId, entries, onSelect }: ContentsListProps) {
  function select(event: MouseEvent<HTMLAnchorElement>, entry: ContentsEntry) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey
    ) {
      return;
    }
    event.preventDefault();
    onSelect(entry, event.detail === 0);
  }

  return (
    <ul className="space-y-4 [&_li]:space-y-4">
      {entries.map((entry) => (
        <li key={entry.id}>
          <InternalLink
            aria-current={activeId === entry.id ? "location" : undefined}
            className={`focus-visible:outline-action block! w-full! rounded-xl text-sm! leading-6! wrap-anywhere hover:underline focus-visible:outline-2 focus-visible:-outline-offset-2 ${activeId === entry.id ? "text-action!" : "text-foreground/90!"} ${entry.level === 1 ? "font-semibold" : ""}`}
            href={`#${encodeURIComponent(entry.id)}`}
            onClick={(event) => {
              select(event, entry);
            }}
            variant="inline"
          >
            <ContentsLabel parts={entry.label} />
          </InternalLink>
          {entry.children.length > 0 ? (
            <div className="ml-3 pl-2">
              <ContentsList
                activeId={activeId}
                entries={entry.children}
                onSelect={onSelect}
              />
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export default function ExperimentContentsPanel({
  activeId,
  desktop,
  entries,
  finalFocus,
  onSelect,
  title,
}: ContentsListProps & {
  desktop: boolean;
  finalFocus: () => false | HTMLElement | null;
  title: string;
}) {
  const Title = desktop ? Popover.Title : Drawer.Title;
  const Close = desktop ? Popover.Close : Drawer.Close;
  const content = (
    <>
      <div className="border-middle-hover flex shrink-0 items-center justify-between gap-3 border-b py-1.5 pr-2 pl-4">
        <Title className="text-foreground font-semibold">{title}</Title>
        <Close
          aria-label="Close contents"
          render={
            <Button
              className="size-11 rounded-full! p-0! [corner-shape:round]!"
              iconOnly
              variant="ghost"
            />
          }
        >
          <XMarkIcon
            aria-hidden="true"
            className="pointer-events-none size-5"
          />
        </Close>
      </div>
      <nav
        aria-label="Table of contents"
        className="min-h-0 overflow-x-hidden overflow-y-auto overscroll-contain p-4"
      >
        <ContentsList
          activeId={activeId}
          entries={entries}
          onSelect={onSelect}
        />
      </nav>
    </>
  );
  const appearance =
    "border-middle-hover text-foreground flex flex-col overflow-hidden border bg-white/50 shadow-xl saturate-150 backdrop-blur-lg outline-hidden";

  if (desktop) {
    return (
      <Popover.Portal>
        <Popover.Positioner
          align="end"
          className="z-50"
          collisionAvoidance={{ side: "none", align: "shift" }}
          positionMethod="fixed"
          side="top"
          sideOffset={12}
        >
          <Popover.Popup
            className={`${styles.popover} ${appearance} rounded-2xl`}
            finalFocus={finalFocus}
          >
            {content}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    );
  }

  return (
    <Drawer.Portal>
      <Drawer.Backdrop className="bg-foreground/30 fixed inset-0 z-40 backdrop-blur-xs transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
      <Drawer.Viewport className={`${styles.sheetViewport} z-50`}>
        <Drawer.Popup
          className={`${styles.sheet} ${appearance} rounded-t-3xl`}
          finalFocus={finalFocus}
        >
          <div
            aria-hidden="true"
            className="bg-border mx-auto mt-3 h-1 w-10 shrink-0 rounded-full"
          />
          <Drawer.Content className="flex min-h-0 flex-col">
            {content}
          </Drawer.Content>
        </Drawer.Popup>
      </Drawer.Viewport>
    </Drawer.Portal>
  );
}
