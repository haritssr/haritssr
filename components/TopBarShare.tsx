"use client";

import { Toast } from "@base-ui/react/toast";
import { LinkIcon } from "@heroicons/react/24/outline";

const SHARE_TOAST_ID = "share-toast";

export default function TopBarShare() {
  return (
    <Toast.Provider>
      <ShareButton />
      <Toast.Portal>
        <Toast.Viewport className="pointer-events-none fixed right-0 bottom-0 z-2147483647 m-0 flex w-97.5 max-w-[100vw] list-none flex-col gap-2.5 p-3 outline-hidden sm:p-6">
          <ShareToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

function ShareButton() {
  const toastManager = Toast.useToastManager();

  const handleShare = async () => {
    const pageUrl = window.location.href;
    let copied = false;

    try {
      await navigator.clipboard.writeText(pageUrl);
      copied = true;
    } catch (error: unknown) {
      console.error("Unable to copy the page URL.", error);
    }

    toastManager.add({
      description: pageUrl,
      id: SHARE_TOAST_ID,
      title: copied ? "Link copied to clipboard" : "Unable to copy link",
    });
  };

  return (
    <button
      aria-label="Share this page"
      title="Share this page"
      className="focus-visible:outline-action flex size-10 cursor-pointer items-center justify-center rounded-lg hover:opacity-65 focus-visible:outline-2 focus-visible:outline-offset-2 sm:size-9"
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

function ShareToastList() {
  const { toasts } = Toast.useToastManager();

  return toasts.map((toast) => (
    <Toast.Root
      className="data-ending-style:animate-out data-ending-style:fade-out data-ending-style:slide-out-to-right data-starting-style:animate-in data-starting-style:fade-in data-starting-style:slide-in-from-right border-border pointer-events-auto rounded-lg border bg-white/70 shadow-xl saturate-150 backdrop-blur-md transition-[transform,opacity] duration-200 ease-out"
      key={toast.id}
      swipeDirection="right"
      toast={toast}
    >
      <Toast.Content className="grid grid-cols-[auto_max-content] items-center gap-x-3.75 py-2 pr-4 pl-4 [grid-template-areas:'title_action'_'description_action']">
        <div>
          <Toast.Title className="text-foreground mb-1.25 text-[15px] font-medium [grid-area:title]" />
          <Toast.Description className="text-muted m-0 text-[13px] leading-[1.3] [grid-area:description]" />
        </div>
        <Toast.Close className="text-action hover:text-action-hover focus-visible:outline-action h-12 w-12 cursor-pointer rounded-sm focus-visible:outline-2">
          OK
        </Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ));
}
