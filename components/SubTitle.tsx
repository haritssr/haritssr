import type React from "react";

export default function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrap-break-words mb-8 space-y-1 pb-5 text-zinc-800">
      {children}
    </div>
  );
}
