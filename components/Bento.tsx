"use client";

import { Dialog } from "@base-ui/react/dialog";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from "react";

import Button from "@/components/Button";

const CONTROL_CLASS_NAME =
  "flex size-8 shrink-0 items-center justify-center rounded-full transition-colors motion-reduce:transition-none";

export default function Bento({
  title,
  children,
  variant = "default",
  shape = "round",
  width,
  controlColor,
  trigger = "bento",
  modalSize = "regular",
}: {
  title: string;
  children: ReactNode;
  variant?: "default" | "contained";
  shape?: "round" | "squircle";
  width?: "fit" | "full";
  controlColor?: "dark" | "action";
  trigger?: "bento" | "secondary";
  modalSize?: "regular" | "wide";
}) {
  return (
    <Dialog.Root>
      {trigger === "secondary" ? (
        <Dialog.Trigger render={<Button variant="secondary" />}>
          {title}
        </Dialog.Trigger>
      ) : (
        <Dialog.Trigger
          data-bento-trigger=""
          className={`text-foreground/90 focus-visible:outline-action flex max-w-full cursor-pointer items-center justify-between gap-2 py-1.5 pr-1.5 pl-4 text-left font-medium focus-visible:outline-2 focus-visible:outline-offset-2 ${shape === "squircle" ? "corner-squircle rounded-2xl" : "rounded-full"} ${variant === "contained" ? "bg-middle-hover" : "bg-interface-hover"} ${(width ?? (variant === "contained" ? "full" : "fit")) === "full" ? "w-full" : "w-fit"}`}
        >
          <span>{title}</span>
          <span
            aria-hidden="true"
            className={`${CONTROL_CLASS_NAME} ${(controlColor ?? (variant === "contained" ? "dark" : "action")) === "dark" ? "bg-foreground/90" : "bg-action"} text-white/90 hover:text-white`}
          >
            <PlusIcon className="size-5" strokeWidth={3} />
          </span>
        </Dialog.Trigger>
      )}
      <Dialog.Portal>
        <Dialog.Backdrop className="bg-foreground/30 fixed inset-0 z-90 backdrop-blur-xs transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none" />
        <Dialog.Popup
          aria-describedby={undefined}
          className={`corner-squircle text-foreground fixed top-1/2 left-1/2 z-90 flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl bg-white shadow-xl outline-hidden transition-[scale,opacity] duration-200 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none ${modalSize === "wide" ? "max-w-5xl" : "max-w-[32.4rem]"}`}
        >
          <div className="relative flex min-h-16 items-center justify-center px-14 py-4">
            <Dialog.Title className="text-center text-xl font-medium sm:text-lg">
              {title}
            </Dialog.Title>
            <Dialog.Close
              aria-label="Close"
              className={`${CONTROL_CLASS_NAME} text-foreground/90 focus-visible:outline-action hover:bg-middle-hover absolute top-3 right-3 size-10.5 cursor-pointer bg-[color-mix(in_srgb,var(--color-interface-hover)_50%,var(--color-middle-hover))] focus-visible:outline-2 focus-visible:outline-offset-2`}
            >
              <XMarkIcon
                aria-hidden="true"
                className="size-5"
                strokeWidth={3}
              />
            </Dialog.Close>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
            {children}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
