import type { ComponentProps } from "react";

export default function Table({
  className = "",
  children,
  ...props
}: ComponentProps<"table">) {
  return (
    <div className="border-border w-full overflow-hidden rounded-md border">
      <div className="scrollbar-subtle w-full overflow-x-auto">
        <table
          className={`divide-border text-foreground/80 w-full border-collapse divide-y text-sm ${className}`}
          {...props}
        >
          {children}
        </table>
      </div>
    </div>
  );
}
