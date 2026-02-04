"use client";

import { useCallback, useEffect, useState } from "react";
import SubTitle from "@/components/SubTitle";

function formatTime(second: number) {
  const minute = Math.floor(second / 60);

  return `${`${minute}`.padStart(2, "0")}:${`${second % 60}`.padStart(2, "0")}`;
}

export default function ReactCounterDemo() {
  const [second, setSecond] = useState(0);
  const [play, setPlay] = useState(false);
  useEffect(() => {
    if (!play) {
      return;
    }
    const interval = setInterval(() => {
      setSecond((prev) => prev + 1);
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, [play]);

  const onToggle = useCallback(() => {
    setPlay((play) => !play);
  }, []);
  const onReset = useCallback(() => {
    setSecond(0);
    setPlay(false);
  }, []);

  let label: string;

  if (play) {
    label = "Stop";
  } else if (second > 0) {
    label = "Continue";
  } else {
    label = "Start";
  }

  return (
    <>
      <SubTitle>Counter</SubTitle>
      <div>{formatTime(second)}</div>
      <div>{second}</div>
      <button
        className="cursor-pointer select-none hover:text-action"
        onClick={onToggle}
        onKeyDown={onToggle}
        tabIndex={0}
        type="button"
      >
        {label}
      </button>
      <button
        className="cursor-pointer select-none hover:text-action"
        onClick={onReset}
        onKeyDown={onReset}
        type="button"
      >
        Reset
      </button>
    </>
  );
}
