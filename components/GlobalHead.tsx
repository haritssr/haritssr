import Link from "next/link";
import { GitHubIcon } from "./Icons";

export default function GlobalHead() {
  return (
    <div className="sticky top-0 z-30 border-b border-zinc-300  bg-apple-gray6/60 saturate-150 backdrop-blur-lg">
      <div className="mx-auto flex max-w-5xl flex-row items-center justify-between px-3 py-2.5 lg:px-0">
        <Link
          href="/"
          className=" text-zinc-800 font-medium hover:text-zinc-500"
          aria-label="site logo"
        >
          Harits Syah
        </Link>
        <a
          className="flex items-center space-x-2 hover:text-zinc-500 text-zinc-800"
          title="Whole site source code"
          href="https://www.github.com/haritssr/haritssr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-sm sm:text-base">Source</span>
          <GitHubIcon className="h-5 w-5 cursor-pointer" />
        </a>
      </div>
    </div>
  );
}
