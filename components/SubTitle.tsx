import type React from "react";

export default function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-foreground mb-3 space-y-1 wrap-break-word">
      {children}
    </div>
  );
}
