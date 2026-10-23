import type { ComponentPropsWithRef } from "react";

export function topBarActionClassName(showLabel = false): string {
  const base =
    "focus-visible:outline-action flex shrink-0 cursor-pointer items-center rounded-lg focus-visible:outline-2";
  return showLabel
    ? `${base} text-foreground hover:bg-foreground/5 w-full gap-3 px-3 py-2 text-left text-sm focus-visible:-outline-offset-2`
    : `${base} text-foreground/70 hover:text-foreground justify-center focus-visible:outline-offset-2 max-sm:min-h-10 max-sm:min-w-10`;
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
