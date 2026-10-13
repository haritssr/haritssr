"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import capitalizeFirstLetter from "utils/capitalizeFirstLetter";

import BackButton from "@/components/BackButton";
import GitHubIcon from "@/components/GitHubIcon";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import TopBarSearch from "@/components/TopBarSearch";
import useScrolledArticle from "@/components/useScrolledArticle";
import pageSourceUrl from "@/utils/pageSourceUrl";

const destinations = ["projects", "experiments", "writing", "design"] as const;

export default function TopBar() {
  const pathname = usePathname();
  const navigationRef = useRef<HTMLElement>(null);
  const article = useScrolledArticle(pathname, navigationRef);

  return (
    <nav
      aria-label="Primary navigation"
      className="sticky top-0 z-30 select-none"
      ref={navigationRef}
    >
      <div className="relative mx-auto flex max-w-5xl items-center justify-between gap-2 px-5 pt-5 sm:py-5 xl:px-0">
        {article ? (
          <>
            <BackButton
              href={article.href}
              name={article.backLabel}
              variant="topbar"
            />
            <div
              className="floating-surface text-foreground/90 min-w-0 flex-1 rounded-full border px-4 py-1.5 backdrop-blur-lg sm:absolute sm:left-1/2 sm:max-w-[calc(100%-20rem)] sm:-translate-x-1/2"
              title={article.title}
            >
              <p className="truncate">{article.title}</p>
            </div>
          </>
        ) : (
          <>
            {/* Harits Syah */}
            <div className="floating-surface hover:bg-surface/95 group flex items-center space-x-1.5 rounded-full border py-1.5 pr-3 pl-2.5 backdrop-blur-lg has-[a:active]:scale-[0.98]">
              <Image
                alt=""
                className="h-5 w-5"
                height={20}
                priority
                src="/icons/haritssr.svg"
                width={20}
              />
              <Link className="text-foreground/90" href="/">
                Harits Syah
              </Link>
            </div>

            <NavigationLinks />
          </>
        )}
        <HeaderActions pathname={pathname} />
      </div>
    </nav>
  );
}

function HeaderActions({ pathname }: { pathname: string }) {
  return (
    <div className="floating-surface hover:bg-surface/95 flex shrink-0 items-center space-x-1 rounded-full border saturate-150 backdrop-blur-lg">
      <TopBarSearch />
      <ThemeSwitcher />
      <GitHubLink pathname={pathname} />
    </div>
  );
}

function GitHubLink({ pathname }: { pathname: string }) {
  return (
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
  );
}

function NavigationLinks() {
  const [, currentSection] = usePathname().split("/");

  return (
    <ul
      className="floating-surface hover:bg-surface/95 absolute left-1/2 hidden -translate-x-1/2 rounded-full border p-1.5 saturate-150 backdrop-blur-lg sm:flex"
      id="main-navigation"
    >
      {destinations.map((destination) => (
        <li key={destination}>
          <Link
            className={` ${currentSection === destination ? "text-action" : "text-foreground/90"} hover:bg-middle-hover/50 rounded-full px-3 py-1 active:scale-[0.98]`}
            aria-current={currentSection === destination ? "page" : undefined}
            href={`/${destination}`}
          >
            {capitalizeFirstLetter(destination)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
