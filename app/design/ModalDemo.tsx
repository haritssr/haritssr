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
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-zinc-950/50 backdrop-blur-[2px]" />
        <Dialog.Popup className="focus-visible:outline-action fixed top-1/2 left-1/2 z-50 max-h-[85vh] w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border border-zinc-300 bg-white p-5 shadow-xl outline-hidden focus-visible:outline-2 sm:p-6">
          <Dialog.Title className="text-lg font-semibold text-zinc-800">
            Modal title
          </Dialog.Title>
          <Dialog.Description className="mt-2 mb-5 text-sm leading-normal text-zinc-600">
            Dialogs focus attention on a short task or decision.
          </Dialog.Description>
          <div className="rounded-lg bg-zinc-50 p-4 text-sm text-zinc-600">
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
            className="focus-visible:outline-action absolute top-3 right-3 inline-flex h-8 w-8 appearance-none items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 focus-visible:outline-2"
          >
            <XMarkIcon aria-hidden="true" className="h-4 w-4" />
          </Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
