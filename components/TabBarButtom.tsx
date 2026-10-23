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
      className={`${preview ? "relative block" : "sticky bottom-0 block pb-[max(0.75rem,env(safe-area-inset-bottom))]! lg:hidden"} px-3.5 pb-3`}
    >
      <div
        className="bg-background/70 mx-auto w-full rounded-xl border px-1.25 py-1 backdrop-blur-md sm:max-w-[22.4rem]"
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
  const color = current ? "text-action" : "text-muted";

  return (
    <Link
      aria-current={current}
      className="focus-visible:outline-action block min-h-10 min-w-0 flex-1 py-0.5 focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2"
      href={href}
    >
      <div className="flex flex-col items-center justify-center">
        <Icon
          aria-hidden="true"
          className={`h-6 w-6 ${color}`}
          strokeWidth={1.5}
        />

        <div className={`text-[11px] leading-3.75 ${color}`}>{to}</div>
      </div>
    </Link>
  );
};
