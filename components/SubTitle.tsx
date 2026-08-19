import type React from "react";

export default function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrap-break-words mb-3 space-y-1 text-zinc-800">
      {children}
    </div>
  );
}
