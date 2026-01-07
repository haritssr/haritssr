"use client";

import { TitleAndPathData } from "data/TitleAndPathData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";

export default function GlobalNavigationMobile() {
  return (
    <div className="sticky bottom-0 block w-full border-zinc-200 border-t bg-white/90 saturate-150 backdrop-blur-lg sm:hidden">
      <div className="flex w-full items-center">
        {TitleAndPathData.map(({ title, path }) => (
          <IconWrapper key={title} path={path} to={`/${title}`} />
        ))}
      </div>
    </div>
  );
}

function capitalizeFirstLetter(to: string): string {
  const capitalize = to.substring(1).charAt(0).toUpperCase() + to.slice(2);
  return capitalize;
}

const IconWrapper = ({ to, path }: { to: string; path: React.ReactNode }) => {
  const pathname = usePathname();
  const CurrentPageBaseRoute = pathname?.split("/")[1];

  let color: string;
  if (pathname === to) {
    color = "text-action";
  } else if (pathname === "/" && to === "/home") {
    color = "text-action";
  } else if (CurrentPageBaseRoute === to.substring(1)) {
    color = "text-action";
  } else {
    color = "text-zinc-600";
  }

  return (
    <Link
      className="block w-1/5 active:scale-95"
      href={`${to === "/home" ? "/" : to}`}
    >
      <div className="flex flex-col items-center justify-center py-[5px]">
        <svg
          className={`h-6 w-6 ${color}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>{to}</title>
          {path}
        </svg>

        <div className={`-mt-px text-[11px] leading-[15px] ${color}`}>
          {capitalizeFirstLetter(to)}
        </div>
      </div>
    </Link>
  );
};
