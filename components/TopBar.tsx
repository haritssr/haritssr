"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useEffect, useRef, useState, useSyncExternalStore } from "react";
import capitalizeFirstLetter from "utils/capitalizeFirstLetter";

import BackButton from "@/components/BackButton";
import TopBarActionMenu from "@/components/TopBarActionMenu";
import TopBarContents from "@/components/TopBarContents";
import { scrollArticleToTop } from "@/components/useArticleContentsNavigation";
import useScrolledPageHeader from "@/components/useScrolledPageHeader";

import styles from "./TopBar.module.css";

const destinations = [
  "home",
  "projects",
  "labs",
  "writing",
  "design",
  "commits",
] as const;

let mobileMedia: MediaQueryList | undefined;

function getMobileMedia() {
  mobileMedia ??= window.matchMedia("(width < 40rem)");
  return mobileMedia;
}

function subscribeToMobile(onChange: () => void) {
  const media = getMobileMedia();
  media.addEventListener("change", onChange);
  return () => {
    media.removeEventListener("change", onChange);
  };
}

function getMobileSnapshot() {
  return getMobileMedia().matches;
}

function getServerMobileSnapshot() {
  return false;
}

export default function TopBar() {
  const pathname = usePathname();
  const mobile = useSyncExternalStore(
    subscribeToMobile,
    getMobileSnapshot,
    getServerMobileSnapshot
  );
  const navigationRef = useRef<HTMLElement>(null);
  const header = useScrolledPageHeader(pathname, navigationRef);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let previous = false;
    const updateScrolled = () => {
      const next = window.scrollY > 0;
      if (next !== previous) {
        previous = next;
        setScrolled(next);
      }
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
            className="floating-surface text-foreground/90 flex h-10 min-w-0 items-center border pr-3 pl-3.5 sm:h-9 hover:[&>span]:opacity-60"
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
          // TitleWhileScroll
          <div className="flex min-w-0 flex-1 justify-center">
            <Link
              className="floating-surface flex h-10.5 w-fit max-w-full min-w-0 items-center border px-4 sm:h-9.5"
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
          </div>
        ) : (
          <NavigationLinks currentSection={pathname.split("/")[1] || "home"} />
        )}
        <HeaderActions
          key={pathname}
          mobile={mobile}
          pathname={pathname}
          scrolled={scrolled}
        />
      </div>
    </nav>
  );
}

const HeaderActions = memo(
  ({
    mobile,
    pathname,
    scrolled,
  }: {
    mobile: boolean;
    pathname: string;
    scrolled: boolean;
  }) => {
    const isNestedRoute = pathname.split("/").filter(Boolean).length > 1;

    return (
      <div className="flex shrink-0 items-center gap-2">
        {isNestedRoute ? (
          <TopBarContents mobile={mobile} pathname={pathname} />
        ) : (
          <TopBarActionMenu
            compact={scrolled}
            mobile={mobile}
            pathname={pathname}
          />
        )}
      </div>
    );
  }
);
HeaderActions.displayName = "HeaderActions";

function NavigationLinks({ currentSection }: { currentSection: string }) {
  return (
    <ul
      className="floating-surface absolute left-1/2 hidden h-9.5 -translate-x-1/2 items-center border px-1.5 [--floating-pressed-scale:1] lg:flex"
      id="main-navigation"
    >
      {destinations.map((destination) => (
        <li className="flex h-full items-center" key={destination}>
          <Link
            className={` ${currentSection === destination ? "text-action" : "text-foreground/90 hover:opacity-60"} flex h-full items-center rounded-full px-3`}
            aria-current={currentSection === destination ? "page" : undefined}
            href={destination === "home" ? "/" : `/${destination}`}
          >
            {capitalizeFirstLetter(destination)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
