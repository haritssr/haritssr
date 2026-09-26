import { RSS_PATH } from "@/utils/site";

import FooterActions from "./FooterActions";

export default function Footer() {
  return (
    <footer className="text-foreground/60 mx-auto mt-30 flex max-w-5xl justify-between px-5 py-2 text-sm xl:px-0">
      <div>
        &#169; <span> 2021-{new Date().getFullYear()}</span>
      </div>
      <FooterActions rssPath={RSS_PATH} />
    </footer>
  );
}
