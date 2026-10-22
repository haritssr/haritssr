"use client";

import { Popover } from "@base-ui/react/popover";
import { Bars3BottomRightIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { Button as AriaButton } from "react-aria-components/Button";
import { SheetTrigger } from "react-aria-components/Sheet";

import useArticleContentsNavigation from "@/components/article/useArticleContentsNavigation";
import useArticleOutline from "@/components/article/useArticleOutline";

import TopBarActionMenu from "./TopBarActionMenu";
import TopBarActions from "./TopBarActions";
import { useGlobalSearch } from "./TopBarSearch";

const ContentsPanel = dynamic(
  async () => await import("../article/ArticleContentsPanel")
);

export default function TopBarContents({
  mobile,
  pathname,
}: {
  mobile: boolean;
  pathname: string;
}) {
  const mainRef = useRef<HTMLElement>(null);
  const { openSearch } = useGlobalSearch();

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
    runAfterClose,
    onOutlineChange,
  } = useArticleContentsNavigation(1);
  const outline = useArticleOutline(mainRef, "Contents", onOutlineChange);
  const visible = outline !== null && outline.sections.length > 0;
  const collapseActions = mobile && visible;

  if (!visible || outline === null) {
    return <TopBarActionMenu mobile={mobile} pathname={pathname} />;
  }

  const triggerClassName =
    "focus-visible:outline-action text-foreground/70 flex shrink-0 cursor-pointer items-center justify-center rounded-lg hover:[&>svg]:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2";
  const triggerContent = (
    <Bars3BottomRightIcon
      aria-hidden="true"
      className="pointer-events-none size-5"
    />
  );
  const panel = hasOpened ? (
    <ContentsPanel
      desktop={desktop}
      open={open}
      outline={outline}
      finalFocus={finalFocus}
      sheetRef={sheetRef}
      onSelect={selectEntry}
      mobileActions={
        collapseActions ? (
          <TopBarActions
            pathname={pathname}
            onSearch={(trigger) => {
              runAfterClose(() => {
                openSearch(triggerRef.current ?? trigger);
              });
            }}
          />
        ) : undefined
      }
    />
  ) : null;

  return (
    <>
      {collapseActions ? null : (
        <div className="hidden sm:block">
          <TopBarActions pathname={pathname} />
        </div>
      )}
      <div
        className={`flex shrink-0 items-center ${open ? "border-action!" : ""}`}
      >
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
                  aria-label="Table of Contents"
                  aria-keyshortcuts="Alt+C"
                  title="Table of Contents"
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
              aria-label="Table of Contents"
              aria-keyshortcuts="Alt+C"
              className={triggerClassName}
              data-article-toc-trigger=""
              ref={triggerRef}
              render={(props) => (
                <button {...props} title="Table of Contents" type="button" />
              )}
            >
              {triggerContent}
            </AriaButton>
            {panel}
          </SheetTrigger>
        )}
      </div>
    </>
  );
}
