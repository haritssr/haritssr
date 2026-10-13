import type { ComponentProps } from "react";

export default function Table({
  className = "",
  children,
  variant = "default",
  ...props
}: ComponentProps<"table"> & { variant?: "default" | "embedded" }) {
  return (
    <div
      className={
        variant === "embedded"
          ? "w-full overflow-hidden"
          : "border-border w-full overflow-hidden rounded-md border"
      }
    >
      <div className="scrollbar-subtle w-full overflow-x-auto">
        <table
          className={`divide-border text-foreground/90 w-full border-collapse divide-y text-sm ${className}`}
          {...props}
        >
          {children}
        </table>
      </div>
    </div>
  );
}
