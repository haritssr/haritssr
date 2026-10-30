"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { CSSProperties } from "react";

import { primaryNavigation } from "@/data/navigation";
import {
  navigationCurrent,
  showsMobileNavigation,
} from "@/utils/navigation/navigationState";

export default function TabBarButtom({
  preview = false,
}: {
  preview?: boolean;
} = {}) {
  const pathname = usePathname();
  const [previewPath, setPreviewPath] = useState(pathname);
  const activePath = preview ? previewPath : pathname;
  const activeIndex = primaryNavigation.findIndex(({ href }) =>
    navigationCurrent(activePath, href)
  );
  const indicatorStyle: CSSProperties & Record<`--${string}`, number> = {
    "--active-index": activeIndex,
    "--tab-count": primaryNavigation.length,
  };
  if (!preview && !showsMobileNavigation(pathname)) {
    return null;
  }

  return (
    <nav
      aria-label="Mobile navigation"
      data-mobile-tabbar={preview ? undefined : ""}
      className={`${preview ? "relative block" : "sticky bottom-0 block pb-[max(0.5rem,env(safe-area-inset-bottom))]! lg:hidden"} p-2`}
    >
      <div
        className="border-border bg-background/70 shadow-foreground/5 border-hairline mx-auto w-full rounded-full p-1 shadow-sm backdrop-blur-md sm:max-w-[22.4rem]"
        data-mobile-tabbar-surface={preview ? undefined : pathname}
      >
        <div className="relative flex w-full items-center gap-0.5">
          {activeIndex === -1 ? null : (
            <div
              aria-hidden="true"
              className="bg-foreground/8 pointer-events-none absolute inset-y-0 left-0 w-[calc((100%_+_0.125rem)/var(--tab-count)_-_0.125rem)] translate-x-[calc(var(--active-index)*(100%_+_0.125rem))] rounded-full transition-transform duration-200 ease-out motion-reduce:transition-none"
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
    : "text-foreground/90 hover:bg-foreground/5";

  return (
    <Link
      aria-current={current}
      className={`focus-visible:outline-action relative flex min-h-11 min-w-0 flex-1 items-center justify-center rounded-full px-1 py-1 transition-[color,background-color,scale] duration-150 focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 motion-safe:active:scale-95 motion-reduce:transition-none ${appearance}`}
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
