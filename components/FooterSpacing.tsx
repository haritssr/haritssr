"use client";

import { usePathname } from "next/navigation";

export default function FooterSpacing({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const spacing = pathname === "/" ? "mt-52 mb-3" : "mb-3";

  return <div className={spacing}>{children}</div>;
}
