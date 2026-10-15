"use client";

import { LinkIcon } from "@heroicons/react/24/outline";

import SharePageProvider, { useSharePageUrl } from "./SharePageProvider";

export default function TopBarShare() {
  return (
    <SharePageProvider>
      <ShareButton />
    </SharePageProvider>
  );
}

function ShareButton() {
  const handleShare = useSharePageUrl();

  return (
    <button
      aria-label="Share this page"
      title="Share this page"
      className="focus-visible:outline-action flex size-10 cursor-pointer items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 sm:size-9 hover:[&>svg]:opacity-50"
      onClick={() => {
        void handleShare();
      }}
      type="button"
    >
      <LinkIcon
        aria-hidden="true"
        className="text-foreground size-5 sm:size-4.5"
      />
    </button>
  );
}
