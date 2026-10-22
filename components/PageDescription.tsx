import type { ReactNode } from "react";

export default function PageDescription({
  as: Element = "p",
  children,
}: {
  as?: "p" | "div";
  children: ReactNode;
}) {
  return (
    <Element className="text-foreground/70 wrap-break-word sm:text-lg">
      {children}
    </Element>
  );
}
