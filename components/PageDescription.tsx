import type React from "react";

export default function PageDescription({ description }: { description: string | React.ReactNode }) {
  return <div className="wrap-break-words mt-4 mb-10 text-lg text-zinc-500 sm:text-xl">{description}</div>;
}
