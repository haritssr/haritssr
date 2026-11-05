"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import type { Period } from "../utils/timer";
import { firstFutureSlot } from "./timelineSelection";

import styles from "./TaskTimeline.module.css";

const NOTICE_MS = 3000;

type TimelineStyle = CSSProperties & Record<`--timeline-${string}`, string>;

/**
 * Shades the part of today's timeline that can no longer hold a new task. A
 * press, tap, or touch there explains why instead of doing nothing, so it works
 * the same with a mouse and on touchscreens.
 */
export default function PastTimeShade({
  editable,
  now,
  bounds,
  view,
}: {
  editable: boolean;
  now: number;
  bounds: { start: number; end: number };
  view: Period;
}) {
  const [notice, setNotice] = useState(false);
  const timer = useRef(0);
  useEffect(
    () => () => {
      window.clearTimeout(timer.current);
    },
    []
  );
  const explain = () => {
    window.clearTimeout(timer.current);
    setNotice(true);
    timer.current = window.setTimeout(() => {
      setNotice(false);
    }, NOTICE_MS);
  };
  // Today's time up to the next quarter hour can no longer hold a new task.
  const until =
    now >= bounds.start && now < bounds.end
      ? Math.min(
          view.until,
          firstFutureSlot((now - bounds.start) / 60_000) * 15
        )
      : view.from;
  if (!editable || until <= view.from) {
    return null;
  }
  const geometry: TimelineStyle = {
    "--timeline-position": "0%",
    "--timeline-left": "0%",
    "--timeline-width": "100%",
    "--timeline-height": `${((until - view.from) / (view.until - view.from)) * 100}%`,
  };
  return (
    <>
      <div
        aria-hidden="true"
        className={`${styles.event} bg-foreground/5 absolute cursor-not-allowed select-none`}
        style={geometry}
        onPointerDown={explain}
      />
      <output
        aria-live="polite"
        className={`bg-foreground absolute inset-x-0 top-1 z-40 mx-auto w-fit max-w-full rounded-full px-3 py-1 text-center text-sm text-white ${notice ? "" : "sr-only"}`}
      >
        {notice ? "Can't plan in the past. Pick a time after now." : ""}
      </output>
    </>
  );
}
