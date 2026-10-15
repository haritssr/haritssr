"use client";

import GitHubIcon from "@/components/GitHubIcon";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import TopBarSearch from "@/components/TopBarSearch";
import TopBarShare from "@/components/TopBarShare";
import pageSourceUrl from "@/utils/pageSourceUrl";

export default function TopBarActions({
  pathname,
  onSearch,
}: {
  pathname: string;
  onSearch?: (trigger: HTMLButtonElement) => void;
}) {
  return (
    <div className="floating-surface flex w-fit items-center space-x-1 border">
      <TopBarSearch onSearch={onSearch} />
      <ThemeSwitcher />
      <TopBarShare />
      <a
        aria-label="View this page's source on GitHub (opens in a new tab)"
        className="focus-visible:outline-action flex size-10 items-center justify-center rounded-lg hover:opacity-65 focus-visible:outline-2 focus-visible:outline-offset-2 sm:size-9"
        href={pageSourceUrl(pathname)}
        rel="noopener noreferrer"
        target="_blank"
        title="View page source on GitHub"
      >
        <GitHubIcon
          aria-hidden="true"
          className="text-foreground size-5 sm:size-4.5"
        />
      </a>
    </div>
  );
}
