"use client";

import { Button as BaseButton } from "@base-ui/react/button";
import type { ComponentProps } from "react";

// A fieldset's anonymous content box interferes with joined button layout.
/* oxlint-disable jsx-a11y/prefer-tag-over-role */
// Joins plain child buttons, such as dialog triggers, to look like ButtonGroupItems.
const JOINED_CHILDREN_CLASS =
  "[&>button]:relative [&>button]:-ml-px [&>button]:rounded-none [&>button:first-child]:ml-0 [&>button:first-child]:rounded-l-md [&>button:first-child]:supports-[corner-shape:squircle]:rounded-l-xl [&>button:focus-visible]:z-20 [&>button:last-child]:rounded-r-md [&>button:last-child]:supports-[corner-shape:squircle]:rounded-r-xl";

export function ButtonGroup({
  className,
  joinChildren = false,
  ...props
}: ComponentProps<"div"> & { joinChildren?: boolean }) {
  return (
    <div
      {...props}
      className={`isolate inline-flex w-fit shrink-0 items-center ${joinChildren ? JOINED_CHILDREN_CLASS : ""} ${className ?? ""}`}
      role="group"
    />
  );
}
/* oxlint-enable jsx-a11y/prefer-tag-over-role */

// Pressed colors: the action blue, or a task kind's light fill and text.
const PRESSED_CLASS = {
  action: "aria-pressed:text-action",
  work: "aria-pressed:bg-work-surface aria-pressed:text-work-foreground",
  leisure:
    "aria-pressed:bg-leisure-surface aria-pressed:text-leisure-foreground",
};

export function ButtonGroupItem({
  className,
  tone = "action",
  ...props
}: Omit<ComponentProps<typeof BaseButton>, "className"> & {
  className?: string;
  tone?: keyof typeof PRESSED_CLASS;
}) {
  return (
    <BaseButton
      {...props}
      className={`corner-squircle border-border text-foreground ${PRESSED_CLASS[tone]} hover:bg-interface-hover focus-visible:outline-foreground relative -ml-px inline-flex min-h-8.5 cursor-pointer items-center justify-center gap-1 border px-2 py-1.5 text-sm transition-colors duration-150 first:ml-0 first:rounded-l-md last:rounded-r-md focus-visible:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 data-disabled:cursor-not-allowed data-disabled:opacity-50 supports-[corner-shape:squircle]:first:rounded-l-xl supports-[corner-shape:squircle]:last:rounded-r-xl motion-reduce:transition-none ${className ?? ""}`}
    />
  );
}
