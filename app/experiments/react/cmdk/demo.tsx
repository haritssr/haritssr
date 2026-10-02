"use client";

import { Command } from "cmdk";
import { Dialog } from "radix-ui";
import { useEffect, useState } from "react";

import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";

export default function ReactCmdkDemo() {
  const [open, setOpen] = useState(false);

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: {
      key: string;
      metaKey: unknown;
      ctrlKey: unknown;
      preventDefault: () => void;
    }) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((isOpen) => !isOpen);
      }
    };

    document.addEventListener("keydown", down);
    return () => {
      document.removeEventListener("keydown", down);
    };
  }, []);

  return (
    <>
      <SubTitle>Fast, composable, unstyled command menu for React.</SubTitle>
      <SourceCodeLink />
      <button
        className="text-action focus-visible:outline-action rounded-md border px-3 py-2 focus-visible:outline-2"
        onClick={() => {
          setOpen(true);
        }}
        type="button"
      >
        Open command menu
      </button>
      <Dialog.Root onOpenChange={setOpen} open={open}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-foreground/30 fixed inset-0 z-50" />
          <Dialog.Content className="bg-background border-border fixed top-[20vh] left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 rounded-xl border p-4 shadow-lg">
            <Dialog.Title className="sr-only">Command menu</Dialog.Title>
            <Dialog.Description className="sr-only">
              Search commands, use the arrow keys to navigate, and Escape to
              close.
            </Dialog.Description>
            <Command label="Command menu">
              <Command.Input
                aria-label="Search commands"
                className="border-border focus:border-action w-full rounded-md border px-3 py-2 outline-none"
                placeholder="Type some input"
              />
              <Command.List>
                <Command.Empty>No results found.</Command.Empty>

                <Command.Group heading="Letters">
                  <Command.Item className="data-[selected=true]:bg-interface-hover cursor-pointer rounded-md px-3 py-2">
                    a
                  </Command.Item>
                  <Command.Item className="data-[selected=true]:bg-interface-hover cursor-pointer rounded-md px-3 py-2">
                    b
                  </Command.Item>
                  <Command.Separator />
                  <Command.Item className="data-[selected=true]:bg-interface-hover cursor-pointer rounded-md px-3 py-2">
                    c
                  </Command.Item>
                </Command.Group>

                <Command.Item className="data-[selected=true]:bg-interface-hover cursor-pointer rounded-md px-3 py-2">
                  Apple
                </Command.Item>
              </Command.List>
            </Command>
            <Dialog.Close
              className="text-action focus-visible:outline-action mt-4 cursor-pointer rounded-sm hover:underline focus-visible:outline-2"
              type="button"
            >
              Close
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
