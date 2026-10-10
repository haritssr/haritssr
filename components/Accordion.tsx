"use client";

import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
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
  panelClassName = "bg-white",
  title,
  trailing,
  value,
}: {
  children: ReactNode;
  excludeFromContents?: boolean;
  panelClassName?: string;
  title: ReactNode;
  trailing?: ReactNode;
  value: string;
}) {
  return (
    <BaseAccordion.Item value={value}>
      <BaseAccordion.Header
        data-toc-ignore={excludeFromContents ? "" : undefined}
      >
        <BaseAccordion.Trigger className="group focus-visible:outline-action border-border bg-foreground/5 text-foreground hover:bg-foreground/10 data-panel-open:bg-foreground/10 flex w-full items-center justify-between gap-3 rounded-lg border p-3 text-left text-sm font-medium outline-hidden transition-colors focus-visible:outline-2 data-panel-open:rounded-b-none">
          <span className="min-w-0 flex-1">{title}</span>
          {trailing}
          <ChevronDownIcon
            aria-hidden="true"
            className="text-foreground h-5 w-5 shrink-0 transition-transform duration-200 group-data-panel-open:rotate-180"
          />
        </BaseAccordion.Trigger>
      </BaseAccordion.Header>
      <BaseAccordion.Panel
        className={`border-border text-foreground/70 rounded-b-lg border-r border-b border-l p-3 text-sm ${panelClassName}`}
      >
        {children}
      </BaseAccordion.Panel>
    </BaseAccordion.Item>
  );
}
