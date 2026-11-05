"use client";

import { useEffect, useState } from "react";

/** Cmd/Ctrl+B (blur) toggles a blurred grayscale layer over the page; Esc or a click closes it. */
export default function SquintOverlay() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.isComposing) {
        return;
      }
      if (
        (event.metaKey || event.ctrlKey) &&
        !event.altKey &&
        !event.shiftKey &&
        event.code === "KeyB"
      ) {
        event.preventDefault();
        if (!event.repeat) {
          setOpen((current) => !current);
        }
        return;
      }
      if (event.key === "Escape" && open) {
        // Capture phase, so dialogs underneath stay open.
        event.preventDefault();
        event.stopImmediatePropagation();
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown, true);
    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="bg-background/70 supports-[backdrop-filter]:bg-background/20 fixed inset-0 z-100 supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-grayscale"
      onClick={() => {
        setOpen(false);
      }}
    />
  );
}
