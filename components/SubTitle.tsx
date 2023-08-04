import React from "react";

export default function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 space-y-1 break-words pb-5 text-zinc-800">
      {children}
    </div>
  );
}

export function PageTitle({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-4xl font-bold text-zinc-800 mt-16">{title}</div>
      <div className="mt-4 mb-10 break-words text-zinc-700">{children}</div>
    </div>
  );
}
