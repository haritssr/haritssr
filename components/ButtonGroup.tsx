"use client";

import { Button as BaseButton } from "@base-ui/react/button";
import type { ComponentProps } from "react";

// A fieldset's anonymous content box interferes with joined button layout.
/* oxlint-disable jsx-a11y/prefer-tag-over-role */
export function ButtonGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={`isolate inline-flex w-fit shrink-0 items-center ${className ?? ""}`}
      role="group"
    />
  );
}
/* oxlint-enable jsx-a11y/prefer-tag-over-role */

export function ButtonGroupItem({
  className,
  activeStyle = "default",
  ...props
}: Omit<ComponentProps<typeof BaseButton>, "className"> & {
  className?: string;
  activeStyle?: "default" | "action";
}) {
  return (
    <BaseButton
      {...props}
      className={`corner-squircle border-border text-foreground ${activeStyle === "action" ? "aria-pressed:bg-action aria-pressed:hover:bg-action-hover" : "aria-pressed:bg-foreground/10"} hover:bg-foreground/5 focus-visible:outline-foreground relative -ml-px inline-flex min-h-8.5 cursor-pointer items-center justify-center gap-1 border px-2 py-1.5 text-sm transition-colors duration-150 first:ml-0 first:rounded-l-md last:rounded-r-md focus-visible:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 data-disabled:cursor-not-allowed data-disabled:opacity-50 supports-[corner-shape:squircle]:first:rounded-l-xl supports-[corner-shape:squircle]:last:rounded-r-xl motion-reduce:transition-none ${className ?? ""}`}
    />
  );
}
