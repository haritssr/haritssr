"use client";

import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { ComponentProps } from "react";

export const TabsRoot = BaseTabs.Root;

export function TabsList({
  className = "",
  ...props
}: Omit<ComponentProps<typeof BaseTabs.List>, "className"> & {
  className?: string;
}) {
  return (
    <BaseTabs.List
      className={`bg-interface-hover flex h-8.5 w-full max-w-full gap-0 overflow-x-auto rounded-[7px] p-0.75 sm:gap-1 ${className}`}
      {...props}
    />
  );
}

export function TabsTab({
  className = "",
  ...props
}: Omit<ComponentProps<typeof BaseTabs.Tab>, "className"> & {
  className?: string;
}) {
  return (
    <BaseTabs.Tab
      className={`text-foreground/50 hover:text-foreground data-active:text-foreground focus-visible:outline-action flex min-h-0 min-w-fit flex-1 cursor-pointer items-center justify-center rounded px-1.5 text-sm font-normal whitespace-nowrap outline-hidden transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 data-active:bg-white data-active:shadow-sm data-active:shadow-black/20 motion-reduce:transition-none sm:px-3 ${className}`}
      {...props}
    />
  );
}

export function TabsPanel({
  className = "",
  ...props
}: Omit<ComponentProps<typeof BaseTabs.Panel>, "className"> & {
  className?: string;
}) {
  return (
    <BaseTabs.Panel
      className={`text-foreground/70 focus-visible:outline-action pt-4 text-sm outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`}
      {...props}
    />
  );
}
