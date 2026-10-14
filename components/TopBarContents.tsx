"use client";

import { Popover } from "@base-ui/react/popover";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { Button as AriaButton } from "react-aria-components/Button";
import { SheetTrigger } from "react-aria-components/Sheet";

import useArticleContentsNavigation from "@/components/useArticleContentsNavigation";
import useArticleOutline, {
  useActiveArticleSection,
} from "@/components/useArticleOutline";

const ContentsPanel = dynamic(
  async () => await import("./ArticleContentsPanel")
);

export default function TopBarContents() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current = document.querySelector<HTMLElement>("#main-content");
  }, []);
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
  } = useArticleContentsNavigation(1);
  const outline = useArticleOutline(mainRef, "Contents", onOutlineChange);
  const visible =
    outline !== null &&
    outline.sections.some(
      (entry) =>
        entry.target.matches("[data-section-heading]") ||
        entry.target.querySelector("[data-section-heading]") !== null
    );
  const activeId = useActiveArticleSection(outline, visible);

  if (!visible || outline === null) {
    return null;
  }

  const triggerClassName =
    "focus-visible:outline-action text-foreground flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg hover:opacity-65 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98]";
  const triggerContent = (
    <ListBulletIcon aria-hidden="true" className="pointer-events-none size-5" />
  );
  const panel = hasOpened ? (
    <ContentsPanel
      activeId={activeId}
      desktop={desktop}
      entries={outline.entries[0].children}
      finalFocus={finalFocus}
      sheetRef={sheetRef}
      onSelect={selectEntry}
      title={outline.entries[0].label.map((part) => part.value).join("")}
    />
  ) : null;

  return (
    <div className="floating-surface flex shrink-0 items-center rounded-full border saturate-150 backdrop-blur-lg">
      {desktop ? (
        <Popover.Root
          modal={false}
          onOpenChange={changeOpen}
          onOpenChangeComplete={finishClose}
          open={visible && open}
        >
          <Popover.Trigger
            render={
              <button
                type="button"
                aria-label="Contents"
                title="Contents"
                className={triggerClassName}
                data-article-toc-trigger=""
                ref={triggerRef}
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
            aria-label="Contents"
            className={triggerClassName}
            data-article-toc-trigger=""
            ref={triggerRef}
            render={(props) => (
              <button {...props} title="Contents" type="button" />
            )}
          >
            {triggerContent}
          </AriaButton>
          {panel}
        </SheetTrigger>
      )}
    </div>
  );
}
