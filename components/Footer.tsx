import { RSS_PATH } from "@/utils/site";
import PWAInstallPrompt from "./PWAInstallPrompt";
import Share from "./Share";

export default function Footer() {
  return (
    <footer className="mx-auto flex max-w-5xl flex-col justify-between space-y-2 px-5 py-2 text-sm sm:flex-row sm:space-y-0 xl:px-0">
      <div className="text-zinc-400">
        <span className=""> 2021-{new Date().getFullYear()}</span> &#169;{" "}
        <a
          className="cursor-pointer select-none text-zinc-400 hover:text-zinc-800"
          href="https://x.com/intent/follow?screen_name=haritssr"
          rel="noopener noreferrer"
          target="_blank"
        >
          Harits Syah
        </a>
      </div>
      <div className="flex items-center gap-4">
        <PWAInstallPrompt />
        <a
          className="cursor-pointer select-none text-zinc-400 hover:text-zinc-800"
          href={RSS_PATH}
        >
          RSS
        </a>
        <Share />
      </div>
    </footer>
  );
}
