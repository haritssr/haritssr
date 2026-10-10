"use client";

import { Dialog } from "@base-ui/react/dialog";
import {
  AcademicCapIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  DocumentIcon,
  MagnifyingGlassIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

import SourceCodeLink from "@/components/SourceCodeLink";

export default function GlobalModalDemo() {
  return (
    <Dialog.Root>
      <SourceCodeLink />
      <Dialog.Trigger className="rounded-md bg-zinc-100 p-2 hover:bg-zinc-200 data-popup-open:ring-2 data-popup-open:ring-blue-600">
        <MagnifyingGlassIcon className="h-5 w-5 text-zinc-700" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-gray-900/70" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 h-auto max-h-[90vh] w-5/6 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md bg-white sm:w-[400px]">
          <section className="border-apple-gray4 flex items-center border-b bg-zinc-100 px-4 py-2">
            <div className="text-apple-gray6 w-1/3">asdf</div>
            <Dialog.Title className="w-1/3 text-center text-lg font-semibold text-gray-700">
              Pencarian{" "}
            </Dialog.Title>
            <div className="flex w-1/3 justify-end">
              <Dialog.Close className="text-action text-end hover:text-blue-700">
                Selesai
              </Dialog.Close>
            </div>
          </section>
          <section className="mx-auto h-[90vh] px-5 sm:h-[50vh]">
            <div className="mt-5 flex items-center rounded-md bg-zinc-100 py-1.5 pr-1 pl-2">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-zinc-700"
                strokeWidth={2}
              />
              <input
                className="focus:ring-apple-gray6 w-full border-0 bg-zinc-100 py-0 pl-1 caret-blue-600 outline-hidden ring-inset placeholder:text-zinc-500 focus:outline-hidden focus:placeholder:text-zinc-700"
                id=""
                name=""
                placeholder="Cari Variabel, Bab, Rumus..."
                type="search"
              />
            </div>
            <div className="mt-5 mb-1 pl-2 text-zinc-500">LINK CEPAT</div>
            <div className="space-y-1 overflow-y-auto">
              {quickLinks.map(({ icon, name }) => (
                <Link
                  className="flex items-center space-x-1 rounded-md px-2 py-1 text-zinc-800 hover:bg-zinc-100"
                  href="/"
                  key={name}
                >
                  <span>{icon}</span>
                  <p>{name}</p>
                </Link>
              ))}
            </div>
          </section>
          <Dialog.Description />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const quickLinks = [
  {
    icon: <BookOpenIcon className="h-5 w-5 text-zinc-400" />,
    name: "Matematika",
  },
  {
    icon: <BookOpenIcon className="h-5 w-5 text-zinc-400" />,
    name: "Fisika",
  },
  {
    icon: <ScaleIcon className="h-5 w-5 text-zinc-400" />,
    name: "Analisis",
  },
  {
    icon: <ClipboardDocumentListIcon className="h-5 w-5 text-zinc-400" />,
    name: "Latihan",
  },
  {
    icon: <AcademicCapIcon className="h-5 w-5 text-zinc-400" />,
    name: "Bimbel",
  },
  {
    icon: <DocumentIcon className="h-5 w-5 text-zinc-400" />,
    name: "About",
  },
];
