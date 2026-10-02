"use client";

import { Dialog } from "@base-ui/react/dialog";
import { XMarkIcon } from "@heroicons/react/24/outline";

import Button from "@/components/Button";

export default function ModalDemo() {
  return (
    <Dialog.Root>
      <Dialog.Trigger render={<Button variant="secondary" />}>
        Open Modal
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="bg-foreground/50 fixed inset-0 z-40 backdrop-blur-xs" />
        <Dialog.Popup className="focus-visible:outline-action border-border fixed top-1/2 left-1/2 z-50 max-h-[85vh] w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border bg-white p-5 shadow-xl outline-hidden focus-visible:outline-2 sm:p-6">
          <Dialog.Title className="text-foreground/90 text-lg font-semibold">
            Modal title
          </Dialog.Title>
          <Dialog.Description className="text-muted mt-2 mb-5 text-sm leading-normal">
            Dialogs focus attention on a short task or decision.
          </Dialog.Description>
          <div className="bg-foreground/5 text-muted rounded-lg p-4 text-sm">
            Content stays inside the dialog while the page beneath it is
            temporarily inert.
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <Dialog.Close render={<Button variant="secondary" />}>
              Cancel
            </Dialog.Close>
            <Dialog.Close render={<Button />}>Continue</Dialog.Close>
          </div>
          <Dialog.Close
            aria-label="Close"
            className="focus-visible:outline-action text-muted hover:bg-border hover:text-foreground/90 absolute top-3 right-3 inline-flex h-8 w-8 appearance-none items-center justify-center rounded-full focus-visible:outline-2"
          >
            <XMarkIcon aria-hidden="true" className="h-4 w-4" />
          </Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
