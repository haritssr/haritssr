"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import capitalizeFirstLetter from "utils/capitalizeFirstLetter";

import TopBarSearch from "@/components/TopBarSearch";

function Destination({ link }: { link: string }) {
  const pathname = usePathname();

  const [, CurrentPageBaseRoute] = pathname.split("/");

  let color: string;

  if (pathname === `/${link}`) {
    color = "text-action";
  } else if (CurrentPageBaseRoute === link) {
    color = "text-action";
  } else {
    color = "text-zinc-800 hover:text-zinc-500";
  }

  return (
    <li>
      <Link className={color} href={`/${link}`}>
        {capitalizeFirstLetter(link)}
      </Link>
    </li>
  );
}

export default function TopBar() {
  return (
    <nav
      aria-label="Primary navigation"
      className="sticky top-0 z-30 bg-white/90 saturate-150 backdrop-blur-lg"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-3 py-1.5 sm:py-3.5 xl:px-0">
        {/* Harits Syah */}
        <div className="group flex items-center space-x-2">
          <Image
            alt=""
            className="h-5 w-5"
            height={20}
            priority
            src="/icons/haritssr.svg"
            width={20}
          />
          <Link className="text-foreground" href="/">
            Harits Syah
          </Link>
        </div>

        <div className="flex items-center sm:space-x-4">
          <div className="hidden sm:block">
            <ul className="flex space-x-10">
              {["projects", "experiments", "blog", "design"].map((link) => (
                <Destination key={link} link={link} />
              ))}
            </ul>
          </div>
          <TopBarSearch />
        </div>
      </div>
    </nav>
  );
}
