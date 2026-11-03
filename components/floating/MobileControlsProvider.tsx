"use client";

import { usePathname } from "next/navigation";
import { createContext, use, useMemo } from "react";
import type { ReactNode } from "react";

import useMobileNavigationCollapse from "@/components/useMobileNavigationCollapse";
import { showsMobileNavigation } from "@/utils/navigation/navigationState";

const MobileControlsContext = createContext({
  collapsed: false,
  playersDocked: false,
  expand: () => {
    // Standalone previews stay expanded without a provider.
  },
});

export function useMobileControls() {
  return use(MobileControlsContext);
}

export default function MobileControlsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const { collapsed, expand } = useMobileNavigationCollapse(pathname);
  const playersDocked = collapsed && showsMobileNavigation(pathname);
  const value = useMemo(
    () => ({ collapsed, playersDocked, expand }),
    [collapsed, playersDocked, expand]
  );
  return (
    <MobileControlsContext value={value}>{children}</MobileControlsContext>
  );
}
