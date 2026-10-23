"use client";

import { LinkIcon } from "@heroicons/react/24/outline";

import { useSharePageUrl } from "../SharePageProvider";
import TopBarAction from "./TopBarAction";

export default function TopBarShare({
  showLabel = false,
}: {
  showLabel?: boolean;
}) {
  const handleShare = useSharePageUrl();

  return (
    <TopBarAction
      aria-label="Share this page"
      aria-keyshortcuts="Alt+S"
      title="Share this page"
      showLabel={showLabel}
      onClick={() => {
        void handleShare();
      }}
    >
      <LinkIcon aria-hidden="true" className="size-5 shrink-0" />
      {showLabel ? <span>Copy URL</span> : null}
    </TopBarAction>
  );
}
