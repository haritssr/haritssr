"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";

export default function BottomBar() {
  return (
    <div className="sticky bottom-0 block w-full border-zinc-200 border-t bg-white/90 saturate-150 backdrop-blur-lg sm:hidden">
      <div className="flex w-full items-center">
        {TitleAndPathData.map(({ title, path }) => (
          <IconWrapper key={title} path={path} to={title} />
        ))}
      </div>
    </div>
  );
}

const IconWrapper = ({ to, path }: { to: string; path: React.ReactNode }) => {
  const pathname = usePathname();
  const CurrentPageBaseRoute = pathname?.split("/")[1];

  let color: string;
  if (pathname === `/${to.charAt(0).toLowerCase()}${to.slice(1)}`) {
    color = "text-action";
  } else if (pathname === "/" && to === "Home") {
    color = "text-action";
  } else if (CurrentPageBaseRoute === to.substring(1)) {
    color = "text-action";
  } else {
    color = "text-zinc-600";
  }

  return (
    <Link
      className="block w-1/5 active:scale-95"
      href={`${to === "Home" ? "/" : `/${to.charAt(0).toLowerCase()}${to.slice(1)}`}`}
    >
      <div className="flex flex-col items-center justify-center py-1.25">
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

        <div className={`-mt-px text-[11px] leading-3.75 ${color}`}>{to}</div>
      </div>
    </Link>
  );
};

const TitleAndPathData = [
  {
    title: "Home",
    path: (
      <>
        <path
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },

  {
    title: "Projects",
    path: (
      <>
        <path
          d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },

  {
    title: "Blog",
    path: (
      <>
        <path
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },

  {
    title: "Experiments",
    path: (
      <>
        <path
          d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },

  {
    title: "Task",
    path: (
      <>
        <path
          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
];
