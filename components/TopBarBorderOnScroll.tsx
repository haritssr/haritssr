"use client";

import { useEffect, useState } from "react";
import TopBar from "@/components/TopBar";

function useIsNotAtTop() {
  const [isNotAtTop, setIsNotAtTop] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsNotAtTop(window.scrollY !== 0);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isNotAtTop;
}

export default function TopBarBorderOnScroll() {
  const isNotAtTop = useIsNotAtTop();

  return (
    <div className={`sticky top-0 z-30 ${isNotAtTop ? "" : "lg:[&>nav]:border-b-0"}`}>
      <TopBar />
    </div>
  );
}
