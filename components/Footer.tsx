import { RSS_PATH } from "@/utils/site";

import FooterActions from "./FooterActions";

export default function Footer() {
  return (
    <footer
      className="text-muted mx-auto mt-30 mb-5 flex max-w-5xl justify-between gap-5 px-5 text-xs sm:text-sm xl:px-0"
      data-site-footer=""
    >
      <div className="shrink-0">
        &#169; <span> 2021-2026</span>
      </div>
      <FooterActions rssPath={RSS_PATH} />
    </footer>
  );
}
