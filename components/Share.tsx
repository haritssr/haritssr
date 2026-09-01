"use client";

import { usePathname } from "next/navigation";
import { Toast } from "radix-ui";
import React from "react";

import { SITE_URL } from "@/utils/site";

async function handleCopy(page: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(page);
    return true;
  } catch (error: unknown) {
    console.error("Unable to copy the page URL.", error);
    return false;
  }
}

export default function Share() {
  const [open, setOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState(
    "Link copied to clipboard"
  );
  const timerRef = React.useRef(0);

  React.useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    []
  );

  const pathname = usePathname();
  const shareUrl = new URL(pathname, SITE_URL).toString();

  const handleButtonClick = async () => {
    const copied = await handleCopy(shareUrl);
    setToastMessage(
      copied ? "Link copied to clipboard" : "Unable to copy link"
    );
    setOpen(false);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setOpen(true);
    }, 100);
  };

  return (
    <Toast.Provider swipeDirection="right">
      <button
        className="cursor-pointer text-zinc-500 select-none hover:text-zinc-800"
        onClick={() => {
          void handleButtonClick();
        }}
        type="button"
      >
        Share
      </button>
      <div className="fixed right-0 bottom-0 z-2147483647">
        <Toast.Root
          className="data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-lg border border-zinc-300 bg-white/70 py-2 pr-4 pl-4 shadow-xl saturate-150 backdrop-blur-md [grid-template-areas:'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x)"
          onOpenChange={setOpen}
          open={open}
        >
          <div className="">
            <Toast.Title className="text-slate12 mb-[5px] text-[15px] font-medium [grid-area:title]">
              {toastMessage}
            </Toast.Title>
            <Toast.Description asChild>
              <div className="m-0 text-[13px] leading-[1.3] text-zinc-500 [grid-area:description]">
                {shareUrl}
              </div>
            </Toast.Description>
          </div>
          <Toast.Close className="text-action hover:text-action-hover h-12 w-12">
            OK
          </Toast.Close>
        </Toast.Root>
        <Toast.Viewport className="m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-2.5 p-3 outline-hidden sm:p-6" />
      </div>
    </Toast.Provider>
  );
}
