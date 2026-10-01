import { RSS_PATH } from "@/utils/site";

import FooterActions from "./FooterActions";

const copyrightYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="text-foreground/40 mx-auto mt-30 flex max-w-5xl justify-between px-5 text-xs sm:py-5 sm:text-sm xl:px-0">
      <div>
        &#169; <span> 2021-{copyrightYear}</span>
      </div>
      <FooterActions rssPath={RSS_PATH} />
    </footer>
  );
}
