"use client";

import GitHubIcon from "@/components/GitHubIcon";
import ThemeSwitcher from "@/components/ThemeSwitcher";
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
      className={
        list
          ? "flex flex-col p-1"
          : "floating-surface flex w-fit items-center space-x-1 border"
      }
    >
      <TopBarSearch onSearch={onSearch} showLabel={list} />
      <ThemeSwitcher showLabel={list} />
      {list ? <ShareButton showLabel /> : <TopBarShare />}
      <a
        aria-label="View this page's source on GitHub (opens in a new tab)"
        className={
          list
            ? "focus-visible:outline-action hover:bg-foreground/5 flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-sm focus-visible:outline-2 focus-visible:-outline-offset-2"
            : "focus-visible:outline-action flex size-10 items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 sm:size-9 hover:[&>svg]:opacity-50"
        }
        href={pageSourceUrl(pathname)}
        rel="noopener noreferrer"
        target="_blank"
        title="View page source on GitHub"
      >
        <GitHubIcon
          aria-hidden="true"
          className="text-foreground size-5 shrink-0 sm:size-4.5"
        />
        {list ? <span>View Source</span> : null}
      </a>
    </div>
  );
}
