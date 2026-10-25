import type { ComponentPropsWithRef } from "react";

export const TOP_BAR_CAPSULE_CLASS_NAME =
  "border-foreground/10 bg-background/70 shadow-foreground/5 flex w-fit shrink-0 items-center gap-0.25 rounded-full border p-1 shadow-sm backdrop-blur-md [corner-shape:round]";

export function topBarActionClassName(showLabel = false): string {
  const base =
    "focus-visible:outline-action flex shrink-0 cursor-pointer items-center focus-visible:outline-2";
  return showLabel
    ? `${base} rounded-lg text-foreground hover:bg-foreground/5 w-full gap-3 px-3 py-2 text-left text-sm focus-visible:-outline-offset-2`
    : `${base} text-foreground hover:text-action hover:bg-foreground/8 aria-expanded:text-action aria-expanded:bg-foreground/8 size-8 justify-center rounded-full transition-colors duration-150 [corner-shape:round] focus-visible:-outline-offset-2 motion-reduce:transition-none`;
}

export default function TopBarAction({
  showLabel = false,
  className = "",
  ...props
}: Omit<ComponentPropsWithRef<"button">, "type"> & { showLabel?: boolean }) {
  return (
    <button
      {...props}
      className={`${topBarActionClassName(showLabel)} ${className}`}
      type="button"
    />
  );
}
