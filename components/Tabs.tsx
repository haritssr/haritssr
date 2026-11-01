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
      className={`bg-middle-hover flex w-full max-w-full gap-1 overflow-x-auto rounded-full p-1 ${className}`}
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
      className={`text-foreground/70 hover:text-foreground data-active:text-foreground focus-visible:outline-action flex min-h-9 min-w-fit flex-1 cursor-pointer items-center justify-center rounded-full px-3 text-sm font-medium whitespace-nowrap outline-hidden transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 data-active:bg-white data-active:shadow-sm motion-reduce:transition-none ${className}`}
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
