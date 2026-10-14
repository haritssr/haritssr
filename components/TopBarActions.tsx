"use client";

import GitHubIcon from "@/components/GitHubIcon";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import TopBarSearch from "@/components/TopBarSearch";
import pageSourceUrl from "@/utils/pageSourceUrl";

import styles from "./TopBar.module.css";

export default function TopBarActions({
  pathname,
  onSearch,
}: {
  pathname: string;
  onSearch?: (trigger: HTMLButtonElement) => void;
}) {
  return (
    <div
      className={`${styles.actionPill} floating-surface flex w-fit items-center space-x-1 rounded-full border saturate-150 backdrop-blur-lg`}
    >
      <TopBarSearch onSearch={onSearch} />
      <ThemeSwitcher />
      <a
        aria-label="View this page's source on GitHub (opens in a new tab)"
        className="focus-visible:outline-action flex size-9 items-center justify-center rounded-lg hover:opacity-65 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98]"
        href={pageSourceUrl(pathname)}
        rel="noopener noreferrer"
        target="_blank"
        title="View page source on GitHub"
      >
        <GitHubIcon aria-hidden="true" className="text-foreground size-4.5" />
      </a>
    </div>
  );
}
