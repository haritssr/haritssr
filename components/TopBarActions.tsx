"use client";

import { CodeBracketIcon } from "@heroicons/react/24/outline";

import TopBarAccount from "@/components/TopBarAccount";
import TopBarSearch from "@/components/TopBarSearch";
import TopBarShare, { ShareButton } from "@/components/TopBarShare";
import pageSourceUrl from "@/utils/pageSourceUrl";

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
      className={list ? "flex flex-col p-1" : "flex w-fit items-center gap-4"}
    >
      <TopBarSearch onSearch={onSearch} showLabel={list} />
      {list ? <ShareButton showLabel /> : <TopBarShare />}
      <a
        aria-label="View this page's source code (opens in a new tab)"
        className={
          list
            ? "focus-visible:outline-action hover:bg-foreground/5 flex items-center gap-3 rounded-lg px-3 py-2 text-sm focus-visible:outline-2 focus-visible:-outline-offset-2"
            : "focus-visible:outline-action text-foreground/70 hover:text-foreground flex items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2"
        }
        href={pageSourceUrl(pathname)}
        rel="noopener noreferrer"
        target="_blank"
        title="View Source"
      >
        <CodeBracketIcon
          aria-hidden="true"
          className="size-5 shrink-0 sm:size-4.5"
        />
        {list ? <span>View Source</span> : null}
      </a>
      <div className={list ? "w-full" : "flex shrink-0 items-center"}>
        <TopBarAccount showLabel={list} />
      </div>
    </div>
  );
}
