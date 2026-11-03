import type { ReactNode } from "react";

export default function FloatingPlayer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      data-floating-task=""
      className={`translucent-material border-border shadow-foreground/10 border-hairline relative flex h-10 w-full min-w-0 items-center rounded-full pr-1.5 pl-3 shadow-lg sm:shadow-xl ${className}`}
    >
      {children}
    </div>
  );
}
