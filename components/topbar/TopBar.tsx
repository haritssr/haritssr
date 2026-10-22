"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useEffect, useRef, useState, useSyncExternalStore } from "react";

import { scrollArticleToTop } from "@/components/article/useArticleContentsNavigation";
import BackButton from "@/components/BackButton";
import useScrolledPageHeader from "@/components/useScrolledPageHeader";
import { primaryNavigation } from "@/data/navigation";

import TopBarActionMenu from "./TopBarActionMenu";
import TopBarContents from "./TopBarContents";

import styles from "./TopBar.module.css";

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
      <div className="relative mx-auto flex max-w-5xl items-center justify-between gap-2 px-4 py-4 sm:py-5 xl:px-0">
        {pathname === "/" ? (
          <Link
            className="text-foreground sm:text-foreground/70 flex min-w-0 items-center"
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
              className="text-foreground flex w-fit max-w-full min-w-0 items-center px-4 font-medium"
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
          <TabBarTop pathname={pathname} />
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
      <div className="flex shrink-0 items-center gap-4">
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

function TabBarTop({ pathname }: { pathname: string }) {
  return (
    <ul
      className="absolute left-1/2 hidden -translate-x-1/2 items-center space-x-7 lg:flex"
      id="main-navigation"
    >
      {primaryNavigation.map(({ title, href }) => {
        const exact = pathname === href;
        const current =
          exact || (href !== "/" && pathname.startsWith(`${href}/`));
        const currentLocation = exact ? "page" : "location";
        return (
          <li className="flex h-full items-center space-x-3" key={href}>
            <Link
              className="group flex h-full items-center rounded-full"
              aria-current={current ? currentLocation : undefined}
              href={href}
            >
              <span
                className={current ? "text-foreground" : "text-foreground/70"}
              >
                {title}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
