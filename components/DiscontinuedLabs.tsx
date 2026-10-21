"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { useState } from "react";
import type { ReactNode } from "react";

import { SectionHeading } from "@/components/Section";

export default function DiscontinuedLabs({
  children,
  className = "",
  count,
}: {
  children: ReactNode;
  className?: string;
  count: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      render={<section aria-label={`${count} discontinued labs`} />}
      className={`space-y-3 ${className}`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <SectionHeading as="h3" variant="toolbar">
          Discontinued
        </SectionHeading>
        <Collapsible.Trigger className="text-muted hover:text-foreground focus-visible:outline-action cursor-pointer rounded-sm text-sm underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2">
          {open ? "Hide" : "View"}
        </Collapsible.Trigger>
      </div>
      <Collapsible.Panel>{children}</Collapsible.Panel>
    </Collapsible.Root>
  );
}
