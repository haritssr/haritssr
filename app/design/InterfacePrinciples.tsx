"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { useState } from "react";
import type { ReactNode } from "react";

export default function InterfacePrinciples({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen} render={<li />}>
      <div className="flex items-center gap-2">
        <span>User Interface Principles</span>
        <Collapsible.Trigger className="text-muted hover:text-foreground focus-visible:outline-action cursor-pointer rounded-sm underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2">
          {open ? "Hide" : "Show"}
        </Collapsible.Trigger>
      </div>
      <Collapsible.Panel>{children}</Collapsible.Panel>
    </Collapsible.Root>
  );
}
