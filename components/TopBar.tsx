"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import capitalizeFirstLetter from "utils/capitalizeFirstLetter";

import BackButton from "@/components/BackButton";
import TopBarActions from "@/components/TopBarActions";
import TopBarContents from "@/components/TopBarContents";
import { scrollArticleToTop } from "@/components/useArticleContentsNavigation";
import useScrolledPageHeader from "@/components/useScrolledPageHeader";

import styles from "./TopBar.module.css";

const destinations = ["projects", "experiments", "writing", "design"] as const;

export default function TopBar() {
  const pathname = usePathname();
  const navigationRef = useRef<HTMLElement>(null);
  const header = useScrolledPageHeader(pathname, navigationRef);
  const isNestedRoute = pathname.split("/").filter(Boolean).length > 1;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScrolled = () => {
      setScrolled(window.scrollY > 0);
    };
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScrolled);
    };
  }, []);

  return (
    <nav
      aria-label="Primary navigation"
      className={`${styles.navigation} sticky top-0 z-30 select-none`}
      data-scrolled={scrolled}
      ref={navigationRef}
    >
      <div className="relative mx-auto flex max-w-5xl items-center justify-between gap-2 px-4 pt-4 xl:px-0">
        {pathname === "/" ? (
          <Link
            className="floating-surface text-foreground/90 flex min-h-10 min-w-0 items-center border py-1.5 pr-3 pl-3.5 sm:min-h-0 hover:[&>span]:opacity-50"
            href="/"
          >
            <span className="truncate">Harits Syah</span>
          </Link>
        ) : (
          <BackButton
            compact={scrolled}
            href={header?.href ?? "/"}
            name={header?.backLabel ?? "Home"}
          />
        )}
        {pathname !== "/" && header?.scrolled === true ? (
          <Link
            className={`floating-surface flex min-h-10 w-fit min-w-0 items-center border px-4 py-1.5 sm:absolute sm:left-1/2 sm:mx-0 sm:min-h-0 sm:max-w-[calc(100%-20rem)] sm:-translate-x-1/2 ${isNestedRoute ? "absolute left-1/2 max-w-[calc(100%-9rem)] -translate-x-1/2" : "mr-auto ml-2"}`}
            href={pathname}
            onNavigate={(event) => {
              event.preventDefault();
              scrollArticleToTop();
            }}
            prefetch={false}
            title={header.title}
          >
            <p className="truncate">{header.title}</p>
          </Link>
        ) : null}
        {pathname !== "/" && header?.scrolled !== true ? (
          <NavigationLinks />
        ) : null}
        <HeaderActions
          key={pathname}
          pathname={pathname}
          compact={header?.scrolled === true}
        />
      </div>
    </nav>
  );
}

function HeaderActions({
  pathname,
  compact,
}: {
  pathname: string;
  compact: boolean;
}) {
  const isNestedRoute = pathname.split("/").filter(Boolean).length > 1;

  return (
    <div className="flex shrink-0 items-center gap-2">
      {isNestedRoute ? (
        <TopBarContents pathname={pathname} compact={compact} />
      ) : (
        <TopBarActions pathname={pathname} />
      )}
    </div>
  );
}

function NavigationLinks() {
  const currentSection = usePathname().split("/")[1] || "home";

  return (
    <ul
      className="floating-surface absolute left-1/2 hidden -translate-x-1/2 border p-1.5 [--floating-pressed-scale:1] sm:flex"
      id="main-navigation"
    >
      {destinations.map((destination) => (
        <li key={destination}>
          <Link
            className={` ${currentSection === destination ? "text-action" : "text-foreground/90 hover:opacity-50"} rounded-full px-3 py-1`}
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
