"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import SharePageProvider, {
  useSharePageUrl,
} from "@/components/SharePageProvider";
import { RSS_PATH } from "@/utils/metadata/site";

export default function SiteShortcuts() {
  return (
    <SharePageProvider>
      <ShortcutListener />
    </SharePageProvider>
  );
}

function ShortcutListener() {
  const router = useRouter();
  const share = useSharePageUrl();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.defaultPrevented ||
        event.repeat ||
        event.isComposing ||
        !event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        (event.target instanceof HTMLElement &&
          (event.target.isContentEditable ||
            event.target.closest("input, textarea, select, [role='textbox']")))
      ) {
        return;
      }

      switch (event.code) {
        case "KeyC": {
          const trigger = document.querySelector<HTMLButtonElement>(
            "[data-article-toc-trigger]"
          );
          if (trigger && trigger.getClientRects().length > 0) {
            event.preventDefault();
            trigger.click();
          }
          break;
        }
        case "KeyS": {
          event.preventDefault();
          void share();
          break;
        }
        case "KeyT": {
          event.preventDefault();
          router.push("/timer");
          break;
        }
        case "KeyR": {
          event.preventDefault();
          window.location.assign(RSS_PATH);
          break;
        }
        case "KeyI": {
          const trigger = document.querySelector<HTMLButtonElement>(
            "[data-install-trigger]"
          );
          if (trigger) {
            event.preventDefault();
            trigger.click();
          }
          break;
        }
        default: {
          break;
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [router, share]);

  return null;
}
