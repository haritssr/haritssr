"use client";

import { Popover } from "@base-ui/react/popover";
import { Bars3BottomRightIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { Button as AriaButton } from "react-aria-components/Button";
import { SheetTrigger } from "react-aria-components/Sheet";

import type useArticleContentsNavigation from "@/components/article/useArticleContentsNavigation";
import type { ArticleOutline } from "@/utils/content/articleTableOfContents";

import {
  TOP_BAR_CAPSULE_CLASS_NAME,
  topBarActionClassName,
} from "./TopBarAction";

const ContentsPanel = dynamic(
  async () => await import("../article/ArticleContentsPanel")
);

export default function TopBarContents({
  outline,
  navigation,
  topBarHeight,
}: {
  outline: ArticleOutline;
  navigation: ReturnType<typeof useArticleContentsNavigation>;
  topBarHeight: number;
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
  } = navigation;
  const triggerClassName = topBarActionClassName();
  const triggerContent = (
    <Bars3BottomRightIcon
      aria-hidden="true"
      className="pointer-events-none size-5"
    />
  );
  const panel = hasOpened ? (
    <ContentsPanel
      topBarHeight={topBarHeight}
      desktop={desktop}
      open={open}
      outline={outline}
      finalFocus={finalFocus}
      sheetRef={sheetRef}
      onSelect={selectEntry}
    />
  ) : null;

  return (
    <div data-topbar-contents="" className={TOP_BAR_CAPSULE_CLASS_NAME}>
      {desktop ? (
        <Popover.Root
          modal={false}
          onOpenChange={changeOpen}
          onOpenChangeComplete={finishClose}
          open={open}
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
        <SheetTrigger isOpen={open} onOpenChange={changeOpen}>
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
  );
}
