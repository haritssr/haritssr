"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";

import type { Period } from "../utils/timer";
import { firstFutureSlot } from "./timelineSelection";

import styles from "./TaskTimeline.module.css";

const NOTICE_MS = 3000;

type TimelineStyle = CSSProperties & Record<`--timeline-${string}`, string>;
type NoticeStyle = CSSProperties & Record<"--notice-top", string>;

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
  const [noticeTop, setNoticeTop] = useState(0);
  const timer = useRef(0);
  useEffect(
    () => () => {
      window.clearTimeout(timer.current);
    },
    []
  );
  const explain = (event: PointerEvent<HTMLDivElement>) => {
    // Show the notice just above the press so it is visible wherever it lands.
    const parent = event.currentTarget.offsetParent;
    const top = parent?.getBoundingClientRect().top ?? 0;
    setNoticeTop(Math.max(event.clientY - top - 48, 4));
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
  const noticeStyle: NoticeStyle = { "--notice-top": `${noticeTop}px` };
  return (
    <>
      <div
        aria-hidden="true"
        className={`${styles.event} bg-foreground/3 lg:corner-squircle absolute cursor-not-allowed select-none lg:rounded-r-sm lg:supports-[corner-shape:squircle]:rounded-r-xl`}
        style={geometry}
        onPointerDown={explain}
      />
      <output
        aria-live="polite"
        style={noticeStyle}
        className={`bg-foreground corner-squircle absolute inset-x-0 top-(--notice-top) z-20 mx-auto w-fit max-w-full rounded-lg px-3 py-1 text-center text-sm whitespace-nowrap text-white supports-[corner-shape:squircle]:rounded-2xl ${notice ? "" : "sr-only"}`}
      >
        {notice ? (
          <>
            <span className="md:hidden">Can&apos;t plan in the past.</span>
            <span className="hidden md:inline">
              Can&apos;t plan in the past. Pick a time after now.
            </span>
          </>
        ) : (
          ""
        )}
      </output>
    </>
  );
}
