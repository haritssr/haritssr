"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** The footer element; the Timer app sits closer to it than other pages. */
export default function FooterFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const inTimer = pathname === "/timer" || pathname.startsWith("/timer/");
  return (
    <footer
      className={`text-foreground/50 ${inTimer ? "mt-10" : "mt-30"} mb-(--floating-footer-clearance,1rem) hidden w-full text-[15px] sm:mb-3 md:block`}
    >
      {children}
    </footer>
  );
}
