import Image from "next/image";
import Link from "next/link";

import Destination from "@/components/Destination";
import TopBarSearch from "@/components/TopBarSearch";

export default function TopBar() {
  return (
    <nav
      aria-label="Primary navigation"
      className="sticky top-0 z-30 bg-white/90 saturate-150 backdrop-blur-lg"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-3 py-2.5 sm:py-3.5 xl:px-0">
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
              {["projects", "experiments", "writing", "design"].map((link) => (
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
