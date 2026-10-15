"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import capitalizeFirstLetter from "utils/capitalizeFirstLetter";

import BackButton from "@/components/BackButton";
import TopBarActions from "@/components/TopBarActions";
import TopBarContents from "@/components/TopBarContents";
import useScrolledPageHeader from "@/components/useScrolledPageHeader";

import styles from "./TopBar.module.css";

const destinations = ["projects", "experiments", "writing", "design"] as const;

export default function TopBar() {
  const pathname = usePathname();
  const navigationRef = useRef<HTMLElement>(null);
  const header = useScrolledPageHeader(pathname, navigationRef);
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
        {header ? (
          <>
            <BackButton
              href={header.href}
              name={header.backLabel}
              variant="topbar"
            />
            <div
              className="floating-surface text-action mx-auto w-fit min-w-0 rounded-full border px-4 py-1.5 backdrop-blur-lg sm:absolute sm:left-1/2 sm:mx-0 sm:max-w-[calc(100%-20rem)] sm:-translate-x-1/2"
              title={header.title}
            >
              <p className="truncate">{header.title}</p>
            </div>
          </>
        ) : (
          <>
            <Link
              className="floating-surface hover:bg-surface/95 text-foreground/90 hover:text-foreground/80 flex items-center rounded-full border py-1.5 pr-3 pl-3.5 backdrop-blur-lg active:scale-[0.98]"
              href="/"
            >
              Harits Syah
            </Link>

            {pathname === "/" ? null : <NavigationLinks />}
          </>
        )}
        <HeaderActions
          key={pathname}
          pathname={pathname}
          compact={header !== null}
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
  const [, currentSection] = usePathname().split("/");

  return (
    <ul
      className="floating-surface absolute left-1/2 hidden -translate-x-1/2 rounded-full border p-1.5 saturate-150 backdrop-blur-lg sm:flex"
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
