"use client";

import { Toast } from "@base-ui/react/toast";
import { useCallback } from "react";

import Box from "@/components/Box";
import Button from "@/components/Button";

export default function ToastDemo() {
  return (
    <Toast.Provider>
      <Box name="Toast" title="Toast">
        <ToastButton />
      </Box>
      <Toast.Portal>
        <Toast.Viewport className="fixed right-0 bottom-0 z-50 m-0 flex w-97.5 max-w-[100vw] list-none flex-col gap-2 p-3 outline-hidden sm:p-6">
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

function ToastButton() {
  const toastManager = Toast.useToastManager();

  const handleShowToast = useCallback(() => {
    toastManager.add({
      description: "Your action was completed.",
      title: "Toast notification",
    });
  }, [toastManager]);

  return <Button onClick={handleShowToast}>Show Toast</Button>;
}

function ToastList() {
  const { toasts } = Toast.useToastManager();

  return toasts.map((toast) => (
    <Toast.Root
      className="rounded-lg border border-zinc-300 bg-white shadow-xl transition-[transform,opacity] duration-200 ease-out data-ending-style:translate-x-full data-ending-style:opacity-0 data-starting-style:translate-x-full data-starting-style:opacity-0"
      key={toast.id}
      swipeDirection="right"
      toast={toast}
    >
      <Toast.Content className="grid grid-cols-[auto_max-content] items-center gap-x-4 py-3 pr-4 pl-4 [grid-template-areas:'title_action'_'description_action']">
        <div>
          <Toast.Title className="text-sm font-medium text-zinc-800 [grid-area:title]" />
          <Toast.Description className="m-0 text-xs leading-[1.3] text-zinc-500 [grid-area:description]" />
        </div>
        <Toast.Close className="text-action hover:text-action-hover focus-visible:outline-action rounded px-2 py-1 text-sm hover:bg-zinc-100 focus-visible:outline-2">
          OK
        </Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ));
}
