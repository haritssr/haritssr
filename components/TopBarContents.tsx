"use client";

import { Popover } from "@base-ui/react/popover";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { Button as AriaButton } from "react-aria-components/Button";
import { SheetTrigger } from "react-aria-components/Sheet";

import TopBarActionMenu from "@/components/TopBarActionMenu";
import TopBarActions from "@/components/TopBarActions";
import { useGlobalSearch } from "@/components/TopBarSearch";
import useArticleContentsNavigation from "@/components/useArticleContentsNavigation";
import useArticleOutline from "@/components/useArticleOutline";

const ContentsPanel = dynamic(
  async () => await import("./ArticleContentsPanel")
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
    "focus-visible:outline-action text-foreground flex size-10 sm:size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg hover:[&>svg]:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2";
  const triggerContent = (
    <ListBulletIcon aria-hidden="true" className="pointer-events-none size-5" />
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
        className={`floating-surface flex shrink-0 items-center border ${open ? "border-action!" : ""}`}
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
