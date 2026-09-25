import type { ReactNode } from "react";

export default function TopLevelSectionPageDescription({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="text-foreground/80 mt-4 mb-10 text-lg wrap-break-word">
      {children}
    </div>
  );
}
