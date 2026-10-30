"use client";

import { Dialog } from "@base-ui/react/dialog";

import Button from "@/components/Button";

export default function Modal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger render={<Button variant="primary" />}>
        Open
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="bg-foreground/40 fixed inset-0 z-90" />
        <Dialog.Popup className="corner-squircle border-border bg-background text-foreground shadow-floating fixed inset-x-0 bottom-0 z-90 flex max-h-[90dvh] flex-col gap-5 overflow-y-auto overscroll-contain rounded-t-2xl border p-4 outline-hidden supports-[corner-shape:squircle]:rounded-t-4xl sm:inset-auto sm:top-1/2 sm:left-1/2 sm:w-[calc(100%-2rem)] sm:max-w-sm sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg sm:supports-[corner-shape:squircle]:rounded-2xl">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div className="grid w-22 justify-self-start">
              <Dialog.Close
                render={<Button className="w-full" variant="secondary" />}
              >
                Cancel
              </Dialog.Close>
            </div>
            <Dialog.Title className="text-center font-medium">
              Modal title
            </Dialog.Title>
            <div className="grid w-22 justify-self-end">
              <Dialog.Close render={<Button className="w-full" />}>
                Continue
              </Dialog.Close>
            </div>
          </div>
          <Dialog.Description className="text-muted text-sm">
            Dialogs focus attention on a short task or decision.
          </Dialog.Description>
          <div className="bg-foreground/5 text-muted rounded-lg p-4 text-sm">
            Content stays inside the dialog while the page beneath it is
            temporarily inert.
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
