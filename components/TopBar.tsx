import Image from "next/image";
import Link from "next/link";

import Destination from "@/components/Destination";

export default function TopBar() {
  return (
    <nav className="sticky top-0 z-30 border-b border-zinc-200 bg-white/90 saturate-150 backdrop-blur-lg">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-3 py-2.5 sm:py-3.5 xl:px-0">
        {/* Harits Syah */}
        <div className="group flex items-center space-x-2">
          <Image
            alt="Harits Syah"
            className="h-5 w-5"
            height={20}
            priority
            src="/icons/haritssr.svg"
            width={20}
          />
          <Link aria-label="site logo" className="text-zinc-800" href="/">
            Harits Syah
          </Link>
        </div>

        <div className="flex items-center sm:space-x-10">
          <div className="hidden sm:block">
            <ul className="flex space-x-10">
              {["projects", "experiments", "writing", "design"].map((link) => (
                <Destination key={link} link={link} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
