"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import capitalizeFirstLetter from "utils/capitalizeFirstLetter";

import TopBarSearch from "@/components/TopBarSearch";

const destinations = ["projects", "experiments", "blog", "design"] as const;

export default function TopBar() {
  return (
    <nav
      aria-label="Primary navigation"
      className="sticky top-0 z-30 bg-white/90 saturate-150 backdrop-blur-lg"
    >
      <div className="relative mx-auto flex max-w-5xl items-center justify-between py-1.5 pr-3 pl-5 sm:py-3.5 xl:px-0">
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

        <NavigationLinks />
        <TopBarSearch />
      </div>
    </nav>
  );
}

function NavigationLinks() {
  const [, currentSection] = usePathname().split("/");

  return (
    <ul
      className="absolute left-1/2 hidden -translate-x-1/2 gap-10 sm:flex"
      id="main-navigation"
    >
      {destinations.map((destination) => (
        <li key={destination}>
          <Link
            className={
              currentSection === destination
                ? "text-action"
                : "text-foreground hover:text-foreground/65"
            }
            href={`/${destination}`}
          >
            {capitalizeFirstLetter(destination)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
