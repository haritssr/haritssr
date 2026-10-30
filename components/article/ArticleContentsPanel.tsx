"use client";

import { Popover } from "@base-ui/react/popover";
import { XMarkIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
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
import type { ContentsLabelPart } from "@/utils/content/articleHeadingLabels";
import type {
  ArticleOutline,
  ContentsEntry,
} from "@/utils/content/articleTableOfContents";

import { useActiveArticleSection } from "./useArticleOutline";

import styles from "./ArticleContentsPanel.module.css";

interface ContentsListProps {
  activeId: string;
  entries: ContentsEntry[];
  depth?: number;
  onSelect: (entry: ContentsEntry, focus: boolean) => void;
}

const ContentsMath = dynamic(async () => await import("./ContentsMath"));

const ContentsLabel = memo(({ parts }: { parts: ContentsLabelPart[] }) =>
  parts.map((part, index) => (
    <span key={`${part.kind}-${index}`}>
      {part.kind === "math" ? <ContentsMath tex={part.value} /> : part.value}
    </span>
  ))
);
ContentsLabel.displayName = "ContentsLabel";

function ContentsList({
  activeId,
  entries,
  onSelect,
  depth = 0,
}: ContentsListProps) {
  const entryColor = depth === 0 ? "text-foreground" : "text-foreground/65";
  const List = depth === 0 ? "ol" : "ul";

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
    <List
      className={`marker:text-foreground/70 text-base [&_li]:space-y-3 ${depth === 0 ? "list-decimal space-y-3 pl-8" : "list-disc space-y-1.5 pl-5"}`}
    >
      {entries.map((entry) => (
        <li
          className={
            depth === 0 && activeId === entry.id ? "marker:text-action" : ""
          }
          key={entry.id}
        >
          <InternalLink
            aria-current={activeId === entry.id ? "location" : undefined}
            className={`focus-visible:outline-action rounded-sm wrap-anywhere hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 ${activeId === entry.id ? "text-action" : entryColor} ${entry.level === 1 ? "font-semibold" : ""}`}
            href={`#${encodeURIComponent(entry.id)}`}
            onClick={(event) => {
              select(event, entry);
            }}
            variant="contents"
          >
            <ContentsLabel parts={entry.label} />
          </InternalLink>
          {entry.children.length > 0 ? (
            <div className="mt-1">
              <ContentsList
                activeId={activeId}
                depth={depth + 1}
                entries={entry.children}
                onSelect={onSelect}
              />
            </div>
          ) : null}
        </li>
      ))}
    </List>
  );
}

export default function ArticleContentsPanel({
  desktop,
  open,
  outline,
  finalFocus,
  onSelect,
  sheetRef,
  topBarHeight,
}: Pick<ContentsListProps, "onSelect"> & {
  topBarHeight: number;
  desktop: boolean;
  open: boolean;
  outline: ArticleOutline;
  finalFocus: () => false | HTMLElement | null;
  sheetRef: Ref<HTMLDivElement>;
}) {
  const activeId = useActiveArticleSection(outline, open, topBarHeight);
  const closeIcon = (
    <XMarkIcon
      aria-hidden="true"
      className="pointer-events-none size-5"
      strokeWidth={2.5}
    />
  );
  const content = (
    <>
      <div className="border-middle-hover flex shrink-0 items-center justify-between gap-2 border-b py-1.5 pr-1.5 pl-3">
        {desktop ? (
          <Popover.Title className="text-foreground text-base font-medium">
            Table of Contents
          </Popover.Title>
        ) : (
          <Heading
            className="text-foreground text-base font-medium"
            level={2}
            slot="title"
          >
            Table of Contents
          </Heading>
        )}
        {desktop ? (
          <Popover.Close
            aria-label="Close contents"
            render={<Button size="icon-circle-contents" variant="secondary" />}
          >
            {closeIcon}
          </Popover.Close>
        ) : (
          <AriaButton
            aria-label="Close contents"
            render={(props) => (
              <Button
                {...props}
                size="icon-circle-contents"
                variant="secondary"
              />
            )}
            slot="close"
          >
            {closeIcon}
          </AriaButton>
        )}
      </div>
      <nav
        aria-label="Table of contents"
        className={`scrollbar-subtle min-h-0 overflow-x-hidden overflow-y-auto overscroll-contain px-2 py-3 sm:px-3 ${desktop ? "" : styles.mobileScroll}`}
      >
        <ContentsList
          activeId={activeId}
          entries={outline.entries[0].children}
          onSelect={onSelect}
        />
      </nav>
    </>
  );
  const appearance =
    "text-foreground flex flex-col overflow-hidden outline-hidden";

  if (desktop) {
    return (
      <Popover.Portal>
        <Popover.Positioner
          align="end"
          className="z-50"
          collisionAvoidance={{ side: "none", align: "shift" }}
          positionMethod="fixed"
          side="bottom"
          sideOffset={12}
        >
          <Popover.Popup
            className={`${styles.popover} ${appearance} floating-material rounded-xl`}
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
      <Sheet
        className={`${styles.sheet} ${appearance} corner-squircle border-border border-hairline bg-background shadow-foreground/10 rounded-t-lg shadow-lg supports-[corner-shape:squircle]:rounded-t-2xl`}
      >
        <SheetContent className="flex min-h-0 flex-col outline-hidden">
          {content}
        </SheetContent>
      </Sheet>
    </SheetOverlay>
  );
}
