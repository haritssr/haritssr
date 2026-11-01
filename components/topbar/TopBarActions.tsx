"use client";

import { CodeBracketIcon } from "@heroicons/react/24/outline";
import type { RefObject } from "react";

import { showsMobileNavigation } from "@/utils/navigation/navigationState";
import pageSourceUrl from "@/utils/navigation/pageSourceUrl";

import TopBarAccount from "./TopBarAccount";
import {
  TOP_BAR_CAPSULE_CLASS_NAME,
  topBarActionClassName,
} from "./TopBarAction";
import TopBarSearch from "./TopBarSearch";
import TopBarShare from "./TopBarShare";

export default function TopBarActions({
  pathname,
  onSearch,
  layout = "pill",
  accountPortalContainer,
}: {
  pathname: string;
  layout?: "pill" | "list" | "sheet";
  accountPortalContainer?: RefObject<HTMLElement | null>;
  onSearch?: (trigger: HTMLButtonElement) => void;
}) {
  const list = layout === "list";
  let className = `${TOP_BAR_CAPSULE_CLASS_NAME} lg:gap-0.75`;
  if (list) {
    className = "flex flex-col p-1";
  } else if (layout === "sheet") {
    className =
      "bg-background border-border border-hairline shadow-foreground/10 flex w-fit items-center gap-1 rounded-full p-1 shadow-lg [corner-shape:round]";
  }

  return (
    <div className={className}>
      <TopBarSearch
        className={
          showsMobileNavigation(pathname) ? "hidden lg:flex" : undefined
        }
        onSearch={onSearch}
        showLabel={list}
      />
      <TopBarShare showLabel={list} />
      <a
        aria-label="View this page's source code (opens in a new tab)"
        className={topBarActionClassName(list)}
        href={pageSourceUrl(pathname)}
        rel="noopener noreferrer"
        target="_blank"
        title="View Source"
      >
        <CodeBracketIcon
          aria-hidden="true"
          className="size-5 shrink-0 stroke-[1.5]"
        />
        {list ? <span>View Source</span> : null}
      </a>
      <div className={list ? "w-full" : "flex shrink-0 items-center"}>
        <TopBarAccount
          showLabel={list}
          portalContainer={accountPortalContainer}
        />
      </div>
    </div>
  );
}
