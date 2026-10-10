"use client";

import { Dialog } from "@base-ui/react/dialog";
import { QueueListIcon, XMarkIcon } from "@heroicons/react/24/outline";

import SourceCodeLink from "@/components/SourceCodeLink";

export default function ContextModalDemo() {
  return (
    <Dialog.Root>
      <SourceCodeLink />
      <Dialog.Trigger className="rounded-md bg-zinc-100 p-2 hover:bg-zinc-200 data-popup-open:ring-2 data-popup-open:ring-blue-600">
        <QueueListIcon className="h-5 w-5 text-zinc-700" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-gray-900/70" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 h-auto max-h-[90vh] w-5/6 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-white sm:w-100">
          <section className="border-apple-gray4 flex items-center justify-between border-b px-5 py-2.5">
            <div className="-space-y-0.5">
              <Dialog.Title className="text-xl font-bold text-gray-800">
                Title
              </Dialog.Title>
              <Dialog.Description className="text-sm font-medium text-zinc-500">
                Description
              </Dialog.Description>
            </div>

            <div className="flex w-1/3 justify-end">
              <Dialog.Close className="rounded-full bg-zinc-100 p-1.5 text-end hover:bg-zinc-200/50">
                <XMarkIcon className="h-4 w-4 text-zinc-700" strokeWidth={3} />
              </Dialog.Close>
            </div>
          </section>
          <section className="space-y-1 p-5">
            <div className="text-action cursor-pointer rounded-md bg-zinc-100 px-3 py-1">
              Section
            </div>
            <div className="ml-5 cursor-pointer rounded-md px-3 py-1 hover:bg-zinc-100">
              SubSection
            </div>
          </section>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
