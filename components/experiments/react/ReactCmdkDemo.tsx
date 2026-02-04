"use client";

import { Command } from "cmdk";
import { useEffect, useState } from "react";
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
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <SubTitle>Fast, composable, unstyled command menu for React.</SubTitle>
      <Command.Dialog
        label="Global Command Menu"
        onOpenChange={setOpen}
        open={open}
      >
        <Command.Input>Type some input</Command.Input>
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>

          <Command.Group heading="Letters">
            <Command.Item>a</Command.Item>
            <Command.Item>b</Command.Item>
            <Command.Separator />
            <Command.Item>c</Command.Item>
          </Command.Group>

          <Command.Item>Apple</Command.Item>
        </Command.List>
      </Command.Dialog>
    </>
  );
}
