"use client";

import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

import Button from "@/components/Button";

import ClockDisplay from "./clock-display";

import styles from "./analog-clock.module.css";

export default function AnalogClock() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState(false);
  const clockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncFullscreen = () => {
      setIsFullscreen(document.fullscreenElement === clockRef.current);
    };
    document.addEventListener("fullscreenchange", syncFullscreen);
    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreen);
    };
  }, []);

  async function toggleFullscreen() {
    const clock = clockRef.current;
    if (clock === null) {
      return;
    }
    try {
      await (document.fullscreenElement === clock
        ? document.exitFullscreen()
        : clock.requestFullscreen());
      setFullscreenError(false);
    } catch {
      setFullscreenError(true);
    }
  }

  const fullscreenLabel = isFullscreen
    ? "Exit fullscreen"
    : "Expand clock to fullscreen";

  return (
    <div
      className={`${styles.viewer} border-border bg-foreground/2 relative flex flex-col items-center gap-8 rounded-2xl border px-5 py-14`}
      ref={clockRef}
    >
      <div className="absolute top-3 right-3">
        <Button
          aria-label={fullscreenLabel}
          iconOnly
          onClick={() => {
            void toggleFullscreen();
          }}
          title={fullscreenLabel}
          variant="secondary"
        >
          {isFullscreen ? (
            <ArrowsPointingInIcon aria-hidden="true" className="size-4" />
          ) : (
            <ArrowsPointingOutIcon aria-hidden="true" className="size-4" />
          )}
        </Button>
      </div>
      {fullscreenError ? (
        <output className="text-danger text-sm">
          Fullscreen is unavailable. Try again or check your browser’s
          fullscreen support.
        </output>
      ) : null}
      <ClockDisplay />
    </div>
  );
}
