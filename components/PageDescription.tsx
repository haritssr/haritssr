import type { ReactNode } from "react";

export default function PageDescription({ children }: { children: ReactNode }) {
  return (
    <div className="wrap-break-words mt-4 mb-10 text-lg text-zinc-500">
      {children}
    </div>
  );
}
