"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import capitalizeFirstLetter from "utils/capitalizeFirstLetter";

import TopBarSearch from "@/components/TopBarSearch";

const destinations = ["projects", "experiments", "blog", "design"] as const;

export default function TopBar() {
  return (
    <nav aria-label="Primary navigation" className="sticky top-0 z-30">
      <div className="relative mx-auto flex max-w-5xl items-center justify-between px-5 pt-5 sm:py-3.5 xl:px-0">
        {/* Harits Syah */}
        <div className="group border-middle-hover flex items-center space-x-1.5 rounded-full border bg-white/50 py-1.5 pr-3 pl-2.5 backdrop-blur-lg">
          <Image
            alt=""
            className="h-5 w-5"
            height={20}
            priority
            src="/icons/haritssr.svg"
            width={20}
          />
          <Link className="text-foreground/90" href="/">
            Harits Syah
          </Link>
        </div>

        <NavigationLinks />
        <SearchAndSourceLinks />
      </div>
    </nav>
  );
}

function SearchAndSourceLinks() {
  return (
    <div className="border-middle-hover flex shrink-0 items-center space-x-1 rounded-full border bg-white/50 saturate-150 backdrop-blur-lg">
      <TopBarSearch />
      <GitHubLink />
    </div>
  );
}

function GitHubLink() {
  return (
    <a
      aria-label="View this site's source on GitHub (opens in a new tab)"
      className="focus-visible:outline-action flex size-9 items-center justify-center rounded-lg hover:opacity-65 focus-visible:outline-2 focus-visible:outline-offset-2"
      href="https://github.com/haritssr/haritssr"
      rel="noopener noreferrer"
      target="_blank"
      title="Repository"
    >
      <Image
        alt=""
        className="size-4.5"
        height={18}
        src="/icons/github.jpg"
        width={18}
      />
    </a>
  );
}

function NavigationLinks() {
  const [, currentSection] = usePathname().split("/");

  return (
    <ul
      className="border-middle-hover absolute left-1/2 hidden -translate-x-1/2 rounded-full border bg-white/50 p-1.5 saturate-150 backdrop-blur-lg sm:flex"
      id="main-navigation"
    >
      {destinations.map((destination) => (
        <li key={destination}>
          <Link
            className={` ${currentSection === destination ? "text-action" : "text-foreground/90"} hover:bg-middle-hover/50 rounded-full px-3 py-1`}
            aria-current={currentSection === destination ? "page" : undefined}
            href={`/${destination}`}
          >
            {capitalizeFirstLetter(destination)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
