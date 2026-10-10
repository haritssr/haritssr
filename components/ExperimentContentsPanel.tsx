"use client";

import "katex/dist/katex.min.css";
import { Popover } from "@base-ui/react/popover";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { memo } from "react";
import type { MouseEvent, Ref } from "react";
import { Button as AriaButton } from "react-aria-components/Button";
import { Heading } from "react-aria-components/Heading";
import {
  Sheet,
  SheetBackdrop,
  SheetContent,
  SheetOverlay,
} from "react-aria-components/Sheet";

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
  sheetRef,
  title,
}: ContentsListProps & {
  desktop: boolean;
  finalFocus: () => false | HTMLElement | null;
  sheetRef: Ref<HTMLDivElement>;
  title: string;
}) {
  const closeIcon = (
    <XMarkIcon aria-hidden="true" className="pointer-events-none size-5" />
  );
  const closeClassName = "size-11 rounded-full! p-0! [corner-shape:round]!";
  const content = (
    <>
      <div className="border-middle-hover flex shrink-0 items-center justify-between gap-3 border-b py-1.5 pr-2 pl-4">
        {desktop ? (
          <Popover.Title className="text-foreground font-semibold">
            {title}
          </Popover.Title>
        ) : (
          <Heading
            className="text-foreground font-semibold"
            level={2}
            slot="title"
          >
            {title}
          </Heading>
        )}
        {desktop ? (
          <Popover.Close
            aria-label="Close contents"
            render={
              <Button className={closeClassName} iconOnly variant="ghost" />
            }
          >
            {closeIcon}
          </Popover.Close>
        ) : (
          <AriaButton
            aria-label="Close contents"
            className={closeClassName}
            render={(props) => <Button {...props} iconOnly variant="ghost" />}
            slot="close"
          >
            {closeIcon}
          </AriaButton>
        )}
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
    <SheetOverlay className="z-50" position="bottom" ref={sheetRef}>
      <SheetBackdrop
        className="bg-foreground/30 backdrop-blur-xs"
        swipeAnimation={styles.backdropFade}
      />
      <Sheet className={`${styles.sheet} ${appearance} rounded-t-3xl`}>
        <SheetContent className="flex min-h-0 flex-col outline-hidden">
          <div
            aria-hidden="true"
            className="bg-border mx-auto mt-3 h-1 w-10 shrink-0 rounded-full"
          />
          {content}
        </SheetContent>
      </Sheet>
    </SheetOverlay>
  );
}
