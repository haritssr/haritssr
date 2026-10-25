"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
        className="border-foreground/10 bg-background/70 shadow-foreground/5 mx-auto w-full rounded-full border p-1 shadow-sm backdrop-blur-md [corner-shape:round] sm:max-w-[22.4rem]"
        data-mobile-tabbar-surface={preview ? undefined : pathname}
      >
        <div className="flex w-full items-center">
          {primaryNavigation.map(({ title, icon, href }) => (
            <IconWrapper
              href={href}
              key={title}
              icon={icon}
              to={title}
              current={navigationCurrent(pathname, href)}
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
}: {
  to: string;
  icon: (typeof primaryNavigation)[number]["icon"];
  href: string;
  current: "page" | "location" | undefined;
}) => {
  const appearance = current
    ? "bg-foreground/8 text-action"
    : "text-foreground/90 hover:bg-foreground/5";

  return (
    <Link
      aria-current={current}
      className={`focus-visible:outline-action flex min-h-11 min-w-0 flex-1 items-center justify-center rounded-full px-1 py-1 transition-colors duration-150 [corner-shape:round] focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 motion-reduce:transition-none ${appearance}`}
      href={href}
    >
      <div className="flex flex-col items-center justify-center">
        <Icon aria-hidden="true" className="size-6 shrink-0" />

        <div className="text-[11px] leading-3.75 font-medium">{to}</div>
      </div>
    </Link>
  );
};
