"use client";

import { CodeBracketIcon } from "@heroicons/react/24/outline";

import pageSourceUrl from "@/utils/navigation/pageSourceUrl";

import TopBarAccount from "./TopBarAccount";
import { topBarActionClassName } from "./TopBarAction";
import TopBarSearch from "./TopBarSearch";
import TopBarShare from "./TopBarShare";

export default function TopBarActions({
  pathname,
  onSearch,
  layout = "pill",
}: {
  pathname: string;
  layout?: "pill" | "list";
  onSearch?: (trigger: HTMLButtonElement) => void;
}) {
  const list = layout === "list";

  return (
    <div
      className={
        list ? "flex flex-col p-1" : "flex w-fit items-center gap-0 sm:gap-4"
      }
    >
      <TopBarSearch onSearch={onSearch} showLabel={list} />
      <TopBarShare showLabel={list} />
      <a
        aria-label="View this page's source code (opens in a new tab)"
        className={topBarActionClassName(list)}
        href={pageSourceUrl(pathname)}
        rel="noopener noreferrer"
        target="_blank"
        title="View Source"
      >
        <CodeBracketIcon aria-hidden="true" className="size-5 shrink-0" />
        {list ? <span>View Source</span> : null}
      </a>
      <div className={list ? "w-full" : "flex shrink-0 items-center"}>
        <TopBarAccount showLabel={list} />
      </div>
    </div>
  );
}
