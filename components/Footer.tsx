import { RSS_PATH } from "@/utils/site";

import FooterActions from "./FooterActions";

export default function Footer() {
  return (
    <footer className="text-foreground/60 mx-auto flex max-w-5xl justify-between px-5 py-2 text-sm xl:px-0">
      <div>
        <span> 2021-{new Date().getFullYear()}</span> &#169;{" "}
        <a
          className="hover:text-foreground cursor-pointer select-none"
          href="https://x.com/intent/follow?screen_name=haritssr"
          rel="noopener noreferrer"
          target="_blank"
        >
          Harits Syah
        </a>
      </div>
      <FooterActions rssPath={RSS_PATH} />
    </footer>
  );
}
