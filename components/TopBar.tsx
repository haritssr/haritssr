import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import Destination from "@/components/Destination";
import { GitHubIcon } from "./Icons";

export default function TopBar() {
  return (
    <nav className="sticky top-0 z-30 border-zinc-200 border-b bg-white/90 saturate-150 backdrop-blur-lg">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-3 py-2.5 lg:px-0">
        {/* Harits Syah */}
        <div className="group flex items-center space-x-2">
          <Image
            alt="Harits Syah"
            className="h-5 w-5"
            height={20}
            priority
            src="/Icons/haritssr.svg"
            width={20}
          />
          <Link aria-label="site logo" className="text-zinc-800" href="/">
            Harits Syah
          </Link>
        </div>

        {/* Links */}
        <div className="hidden sm:block">
          <ul className="flex space-x-10">
            {links.map((link) => {
              return <Destination key={link} link={link} />;
            })}
          </ul>
        </div>

        <div className="flex items-center space-x-3">
          <div title="Search: Coming soon">
            <MagnifyingGlassIcon className="h-5 w-5 cursor-pointer text-zinc-800 hover:text-zinc-400" />
          </div>
          {/* Source to GitHub */}
          <a
            className="group flex items-center space-x-2"
            href="https://www.github.com/haritssr/haritssr"
            rel="noopener noreferrer"
            target="_blank"
            title="Whole Site Source Code"
          >
            <GitHubIcon className="h-5 w-5 cursor-pointer text-zinc-800 group-hover:text-zinc-400" />
          </a>
        </div>
      </div>
    </nav>
  );
}

const links = ["experiences", "experiments", "blog", "pure"];
