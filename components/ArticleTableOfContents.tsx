"use client";

import { Popover } from "@base-ui/react/popover";
import { ArrowUpIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import type { RefObject } from "react";
import { Button as AriaButton } from "react-aria-components/Button";
import { SheetTrigger } from "react-aria-components/Sheet";

import Button from "@/components/Button";
import useArticleContentsNavigation, {
  scrollArticleToTop,
} from "@/components/useArticleContentsNavigation";
import useArticleOutline, {
  useActiveArticleSection,
} from "@/components/useArticleOutline";
import useFooterClearance from "@/components/useFooterClearance";

const ContentsPanel = dynamic(
  async () => await import("./ArticleContentsPanel")
);
const FLOATING_BUTTON_CLASS =
  "floating-surface hover:bg-surface/95! text-foreground/90! focus-visible:outline-action pointer-events-auto shrink-0 rounded-full! border text-base! saturate-150 backdrop-blur-lg select-none [corner-shape:round]!";

export default function ArticleTableOfContents({
  articleRef,
  minimumSections = 2,
  title,
}: {
  articleRef: RefObject<HTMLElement | null>;
  minimumSections?: number;
  title: string;
}) {
  const {
    desktop,
    open,
    hasOpened,
    triggerRef,
    sheetRef,
    changeOpen,
    finishClose,
    finalFocus,
    selectEntry,
    onOutlineChange,
  } = useArticleContentsNavigation(minimumSections);
  const outline = useArticleOutline(articleRef, title, onOutlineChange);
  const visible =
    outline !== null && outline.sections.length >= minimumSections;
  const activeId = useActiveArticleSection(outline, visible);
  const controlsRef = useFooterClearance(outline !== null);

  if (outline === null) {
    return null;
  }

  const triggerClassName = `${FLOATING_BUTTON_CLASS} h-9.5 px-3! py-1.5!`;
  const triggerContent = (
    <>
      <ListBulletIcon
        aria-hidden="true"
        className="pointer-events-none size-5"
      />
      Contents
    </>
  );
  const panel = hasOpened ? (
    <ContentsPanel
      activeId={activeId}
      desktop={desktop}
      entries={outline.entries[0].children}
      finalFocus={finalFocus}
      sheetRef={sheetRef}
      onSelect={selectEntry}
      title={title}
    />
  ) : null;

  const contentsTrigger = desktop ? (
    <Popover.Root
      modal={false}
      onOpenChange={changeOpen}
      onOpenChangeComplete={finishClose}
      open={visible && open}
    >
      <Popover.Trigger
        render={
          <Button
            className={triggerClassName}
            data-article-toc-trigger=""
            ref={triggerRef}
            variant="ghost"
          />
        }
      >
        {triggerContent}
      </Popover.Trigger>
      {panel}
    </Popover.Root>
  ) : (
    <SheetTrigger isOpen={visible && open} onOpenChange={changeOpen}>
      <AriaButton
        className={triggerClassName}
        data-article-toc-trigger=""
        ref={triggerRef}
        render={(props) => <Button {...props} variant="ghost" />}
      >
        {triggerContent}
      </AriaButton>
      {panel}
    </SheetTrigger>
  );

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-[calc(max(1.25rem,env(safe-area-inset-bottom))+var(--footer-overlap,0px))] z-40 mx-auto flex w-full max-w-5xl items-center justify-between gap-3 pr-[max(1.25rem,env(safe-area-inset-right))] pl-[max(1.25rem,env(safe-area-inset-left))] xl:pr-[env(safe-area-inset-right)] xl:pl-[env(safe-area-inset-left)]"
      ref={controlsRef}
    >
      <Button
        aria-label="To the top"
        data-article-back-to-top=""
        className={`${FLOATING_BUTTON_CLASS} size-9 p-0!`}
        iconOnly
        onClick={scrollArticleToTop}
        variant="ghost"
      >
        <ArrowUpIcon
          aria-hidden="true"
          className="pointer-events-none size-4.5 stroke-2"
        />
      </Button>
      {visible ? contentsTrigger : null}
    </div>
  );
}
