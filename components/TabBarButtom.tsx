"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { primaryNavigation } from "@/data/navigation";

export default function TabBarButtom({
  preview = false,
}: {
  preview?: boolean;
} = {}) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const sectionPath = `/${segments[0] ?? ""}`;

  if (
    !preview &&
    (segments.length > 2 ||
      (segments[0] === "writing" && segments.length > 1) ||
      !primaryNavigation.some(({ href }) => href === sectionPath))
  ) {
    return null;
  }

  return (
    <nav
      aria-label="Mobile navigation"
      data-mobile-tabbar={preview ? undefined : ""}
      className={`${preview ? "relative block" : "sticky bottom-0 block pb-[max(0.75rem,env(safe-area-inset-bottom))]! sm:hidden"} px-3.5 pb-3`}
    >
      <div
        className="bg-background/70 w-full rounded-xl border px-1.25 py-1 backdrop-blur-md"
        data-mobile-tabbar-surface={preview ? undefined : pathname}
      >
        <div className="flex w-full items-center">
          {primaryNavigation.map(({ title, icon, href }) => (
            <IconWrapper href={href} key={title} icon={icon} to={title} />
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
}: {
  to: string;
  icon: (typeof primaryNavigation)[number]["icon"];
  href: string;
}) => {
  const pathname = usePathname();
  const isCurrentPage = pathname === href;
  const isCurrentSection =
    isCurrentPage || (href !== "/" && pathname.startsWith(`${href}/`));

  const color = isCurrentSection ? "text-action" : "text-muted";
  const currentLocation = isCurrentPage ? "page" : "location";

  return (
    <Link
      aria-current={isCurrentSection ? currentLocation : undefined}
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
