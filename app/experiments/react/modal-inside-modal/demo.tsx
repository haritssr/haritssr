"use client";

import { Dialog } from "@base-ui/react/dialog";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from "react";

import Button from "@/components/Button";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";

export default function ReactModalInsideModalDemo() {
  return (
    <>
      <SubTitle>Modal Inside Modal</SubTitle>
      <SourceCodeLink />
      <ProfileDialog title="Edit profile" fieldPrefix="outer">
        <ProfileDialog title="Another Edit profile" fieldPrefix="inner" />
      </ProfileDialog>
    </>
  );
}

function ProfileDialog({
  title,
  fieldPrefix,
  children,
}: {
  title: string;
  fieldPrefix: "outer" | "inner";
  children?: ReactNode;
}) {
  const backdropLayer = fieldPrefix === "inner" ? "z-60" : "z-40";
  const popupLayer = fieldPrefix === "inner" ? "z-70" : "z-50";
  return (
    <Dialog.Root>
      <Dialog.Trigger render={<Button variant="secondary" />}>
        {title}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop
          className={`bg-foreground/50 fixed inset-0 backdrop-blur-xs ${backdropLayer}`}
        />
        <Dialog.Popup
          className={`focus-visible:outline-action border-border fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border bg-white p-5 shadow-xl outline-hidden focus-visible:outline-2 sm:p-6 ${popupLayer}`}
        >
          <Dialog.Title className="text-foreground/90 text-lg font-semibold">
            {title}
          </Dialog.Title>
          <Dialog.Description className="text-muted mt-2 mb-5 text-sm leading-normal">
            Make changes to your profile here. Click save when you&apos;re done.
          </Dialog.Description>
          <div className="mb-5 space-y-4">
            <ProfileField
              id={`${fieldPrefix}-name`}
              label="Name"
              defaultValue="Pedro Duarte"
            />
            <ProfileField
              id={`${fieldPrefix}-username`}
              label="Username"
              defaultValue="@peduarte"
            />
          </div>
          {children}
          <div className="mt-5 flex justify-end">
            <Dialog.Close render={<Button />}>Save changes</Dialog.Close>
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

function ProfileField({
  id,
  label,
  defaultValue,
}: {
  id: string;
  label: string;
  defaultValue: string;
}) {
  return (
    <div className="flex items-center gap-5">
      <label
        className="text-foreground/90 w-24 shrink-0 text-right text-sm"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="form-control w-full min-w-0 rounded-md border px-3 py-2 text-sm"
        id={id}
        defaultValue={defaultValue}
      />
    </div>
  );
}
