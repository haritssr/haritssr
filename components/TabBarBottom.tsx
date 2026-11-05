"use client";

import { MagnifyingGlassIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import { useMobileControls } from "@/components/floating/MobileControlsProvider";
import { useGlobalSearch } from "@/components/topbar/TopBarSearch";
import { primaryNavigation } from "@/data/navigation";
import {
  navigationCurrent,
  showsMobileNavigation,
} from "@/utils/navigation/navigationState";

import styles from "./TabBarBottom.module.css";

export default function TabBarBottom({
  preview = false,
}: {
  preview?: boolean;
} = {}) {
  const pathname = usePathname();
  if (!preview && !showsMobileNavigation(pathname)) {
    return null;
  }
  return <MobileTabBar key={pathname} pathname={pathname} preview={preview} />;
}

function MobileTabBar({
  pathname,
  preview,
}: {
  pathname: string;
  preview: boolean;
}) {
  const { openSearch, prepareSearch } = useGlobalSearch();
  const [previewPath, setPreviewPath] = useState(pathname);
  const activePath = preview ? previewPath : pathname;
  const activeIndex = primaryNavigation.findIndex(({ href }) =>
    navigationCurrent(activePath, href)
  );
  const activeTab =
    activeIndex === -1 ? undefined : primaryNavigation.at(activeIndex);
  const CompactIcon = activeTab?.icon ?? Squares2X2Icon;
  const controls = useMobileControls();
  const collapsed = !preview && controls.collapsed;
  const { expand } = controls;
  const navigationRef = useRef<HTMLElement>(null);
  const restoreFocus = useRef(false);
  const expandRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!collapsed && restoreFocus.current) {
      restoreFocus.current = false;
      const tab =
        navigationRef.current?.querySelector<HTMLAnchorElement>(
          "a[aria-current]"
        ) ?? navigationRef.current?.querySelector<HTMLAnchorElement>("a[href]");
      tab?.focus({ preventScroll: true });
    }
  }, [collapsed, navigationRef]);
  const indicatorStyle: CSSProperties & Record<`--${string}`, number> = {
    "--active-index": activeIndex,
    "--tab-count": primaryNavigation.length,
  };

  return (
    <nav
      aria-label="Mobile navigation"
      data-mobile-tabbar={preview ? undefined : ""}
      data-mobile-collapse-region=""
      ref={navigationRef}
      onFocusCapture={(event) => {
        if (collapsed && event.target !== expandRef.current) {
          expand();
        }
      }}
      className={`${preview ? "relative block pb-2" : "sticky bottom-0 block pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden"} px-2 pt-2`}
    >
      <div className={styles.frame}>
        <div
          className={`${styles.row} mx-auto flex w-full items-stretch justify-between gap-1 sm:max-w-[22.4rem]`}
          data-mobile-tabbar-surface={preview ? undefined : pathname}
          data-collapsed={collapsed}
        >
          <div
            className={`${styles.pill} border-border bg-background/70 shadow-foreground/10 border-hairline flex min-w-0 shrink-0 items-center rounded-full p-0.5 shadow-lg backdrop-blur-md sm:shadow-xl`}
            data-collapsed={collapsed}
          >
            <div
              className={`${styles.tabs} relative grid grid-cols-5 items-center`}
              inert={collapsed}
              aria-hidden={collapsed || undefined}
            >
              {activeIndex === -1 ? null : (
                <div
                  aria-hidden="true"
                  className="bg-foreground/8 pointer-events-none absolute inset-y-0.5 left-0.5 w-[calc((100%_-_0.25rem)/var(--tab-count))] translate-x-[calc(var(--active-index)*100%)] rounded-full transition-transform duration-200 ease-out motion-reduce:transition-none"
                  style={indicatorStyle}
                />
              )}
              {primaryNavigation.map(({ title, icon, href }) => (
                <IconWrapper
                  href={href}
                  key={title}
                  icon={icon}
                  to={title}
                  current={navigationCurrent(activePath, href)}
                  onPreviewSelect={preview ? setPreviewPath : undefined}
                />
              ))}
            </div>
            <button
              aria-label="Expand navigation"
              aria-expanded={!collapsed}
              aria-hidden={!collapsed || undefined}
              inert={!collapsed}
              ref={expandRef}
              className={`${styles.expand} ${activeTab === undefined ? "text-foreground" : "text-action"} focus-visible:outline-action flex cursor-pointer items-center justify-center rounded-full focus-visible:outline-2 focus-visible:-outline-offset-2`}
              type="button"
              onClick={() => {
                restoreFocus.current = true;
                expand();
              }}
            >
              <CompactIcon
                aria-hidden="true"
                className={`${styles.icon} shrink-0`}
              />
            </button>
          </div>
          {preview ? null : (
            <div
              aria-hidden="true"
              data-mobile-player-slot={pathname}
              className={
                collapsed ? "h-10 min-w-0 flex-1 self-center" : "hidden"
              }
            />
          )}
          <button
            aria-label="Search"
            aria-haspopup="dialog"
            className={`${styles.search} border-border bg-background/70 text-foreground/90 shadow-foreground/10 focus-visible:outline-action hover:bg-foreground/5 border-hairline flex shrink-0 items-center justify-center rounded-full shadow-lg backdrop-blur-md focus-visible:outline-2 focus-visible:outline-offset-2 sm:shadow-xl`}
            onClick={(event) => {
              openSearch(event.currentTarget);
            }}
            onFocus={prepareSearch}
            onPointerEnter={prepareSearch}
            type="button"
          >
            <MagnifyingGlassIcon
              aria-hidden="true"
              className={`${styles.icon} shrink-0 stroke-current stroke-[0.5]`}
            />
          </button>
        </div>
      </div>
    </nav>
  );
}

const IconWrapper = ({
  to,
  icon: Icon,
  href,
  current,
  onPreviewSelect,
}: {
  to: string;
  icon: (typeof primaryNavigation)[number]["icon"];
  href: string;
  current: "page" | "location" | undefined;
  onPreviewSelect?: (href: string) => void;
}) => {
  const appearance = current
    ? "text-action"
    : "text-foreground/90 hover:text-muted";

  return (
    <Link
      aria-current={current}
      className={`focus-visible:outline-action relative flex min-h-11.75 items-center justify-center rounded-full py-0.5 transition-[color,background-color,scale] duration-150 focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 motion-safe:active:scale-95 motion-reduce:transition-none ${appearance}`}
      href={href}
      onClick={(event) => {
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          event.currentTarget.animate(
            [{ transform: "scale(0.88)" }, { transform: "scale(1)" }],
            { duration: 300, easing: "ease-out" }
          );
        }
        if (onPreviewSelect) {
          event.preventDefault();
          onPreviewSelect(href);
        }
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <Icon aria-hidden="true" className="size-6 shrink-0" />

        <div className="text-[11px] leading-3.75 font-medium">{to}</div>
      </div>
    </Link>
  );
};
