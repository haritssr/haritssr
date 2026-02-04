"use client";

import { QueueListIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog } from "radix-ui";

export default function ContextModalDemo() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md bg-zinc-100 p-2 rdx-state-open:ring-2 rdx-state-open:ring-blue-600 hover:bg-zinc-200">
        <QueueListIcon className="h-5 w-5 text-zinc-700" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-gray-900/70" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 h-auto max-h-[90vh] w-5/6 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-white sm:w-[400px]">
          <section className="flex items-center justify-between border-apple-gray4 border-b px-5 py-2.5">
            <div className="-space-y-0.5">
              <Dialog.Title className="font-bold text-gray-800 text-xl">
                Title
              </Dialog.Title>
              <Dialog.Description className="font-medium text-sm text-zinc-500">
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
            <div className="cursor-pointer rounded-md bg-zinc-100 px-3 py-1 text-action">
              Section
            </div>
            <div className="ml-5 cursor-pointer rounded-md px-3 py-1 hover:bg-zinc-100">
              SubSection
            </div>
          </section>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
