"use client";

import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from "react";

export default function Accordion({
  children,
  className = "w-full",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <BaseAccordion.Root className={className} multiple>
      {children}
    </BaseAccordion.Root>
  );
}

export function AccordionItem({
  children,
  excludeFromContents = false,
  panelClassName = "",
  title,
  trailing,
  triggerClassName = "",
  value,
}: {
  children: ReactNode;
  excludeFromContents?: boolean;
  panelClassName?: string;
  title: ReactNode;
  trailing?: ReactNode;
  triggerClassName?: string;
  value: string;
}) {
  return (
    <BaseAccordion.Item value={value}>
      <BaseAccordion.Header
        data-toc-ignore={excludeFromContents ? "" : undefined}
      >
        <BaseAccordion.Trigger
          className={`group corner-squircle focus-visible:outline-action border-border text-foreground flex w-full cursor-pointer items-center justify-between gap-3 rounded-md border px-3 py-2.5 text-left text-sm outline-hidden focus-visible:outline-2 data-panel-open:rounded-b-none data-panel-open:[border-bottom-style:dashed] supports-[corner-shape:squircle]:rounded-xl ${triggerClassName}`}
        >
          <span className="min-w-0 flex-1">{title}</span>
          {trailing}
          <PlusIcon
            aria-hidden="true"
            className="text-foreground size-5 shrink-0 group-data-panel-open:hidden"
          />
          <MinusIcon
            aria-hidden="true"
            className="text-foreground hidden size-5 shrink-0 group-data-panel-open:block"
          />
        </BaseAccordion.Trigger>
      </BaseAccordion.Header>
      <BaseAccordion.Panel
        className={`corner-squircle border-border text-foreground/70 rounded-b-md border-r border-b border-l p-3 text-base supports-[corner-shape:squircle]:rounded-b-xl ${panelClassName}`}
      >
        {children}
      </BaseAccordion.Panel>
    </BaseAccordion.Item>
  );
}
