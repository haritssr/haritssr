import Link from "next/link";
import { GitHubIcon } from "./Icons";

export default function GlobalNavigation() {
  return (
    <div className="sticky top-0 z-30 border-b border-zinc-300  bg-white/60 saturate-150 backdrop-blur-lg">
      <div className="mx-auto flex max-w-5xl flex-row items-center justify-between px-3 py-2.5 lg:px-0">
        <Link
          href="/"
          className=" text-zinc-800 hover:text-zinc-400 text-tiny sm:text-base"
          aria-label="site logo"
        >
          Harits Syah
        </Link>
        <a
          className="flex items-center space-x-2 group"
          title="Whole site source code"
          href="https://www.github.com/haritssr/haritssr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-tiny sm:text-base group-hover:text-zinc-400 text-zinc-800">
            Source
          </span>
          <GitHubIcon className="h-5 w-5 cursor-pointer text-zinc-800 group-hover:text-zinc-400" />
        </a>
      </div>
    </div>
  );
}
