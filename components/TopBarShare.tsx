"use client";

import { LinkIcon } from "@heroicons/react/24/outline";

import SharePageProvider, { useSharePageUrl } from "./SharePageProvider";

export default function TopBarShare({
  showLabel = false,
}: {
  showLabel?: boolean;
}) {
  return (
    <SharePageProvider>
      <ShareButton showLabel={showLabel} />
    </SharePageProvider>
  );
}

export function ShareButton({ showLabel }: { showLabel: boolean }) {
  const handleShare = useSharePageUrl();

  return (
    <button
      aria-label="Share this page"
      aria-keyshortcuts="Alt+S"
      title="Share this page"
      className={
        showLabel
          ? "focus-visible:outline-action text-foreground hover:bg-foreground/5 flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left text-sm focus-visible:outline-2 focus-visible:-outline-offset-2"
          : "focus-visible:outline-action text-foreground/70 hover:text-foreground flex cursor-pointer items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2"
      }
      onClick={() => {
        void handleShare();
      }}
      type="button"
    >
      <LinkIcon aria-hidden="true" className="size-5 shrink-0" />
      {showLabel ? <span>Copy URL</span> : null}
    </button>
  );
}
