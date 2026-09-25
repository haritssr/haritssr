import type React from "react";

export default function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-foreground/80 mb-3 text-lg wrap-break-word">
      {children}
    </div>
  );
}
