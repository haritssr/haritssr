"use client";

import { useEffect, useState } from "react";

import SourceCodeLink from "@/components/SourceCodeLink";

export default function Stopwatch() {
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);

  useEffect(() => {
    if (!running) {
      return;
    }

    const interval = setInterval(() => {
      setRunning(true);
      setTime((elapsedTime) => elapsedTime + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [running]);

  const buttonStyle = "border px-2 py-1 rounded-lg hover:bg-zinc-50";

  return (
    <>
      <SourceCodeLink />
      <div>{time}</div>
      <div className="space-x-3">
        <button
          className={buttonStyle}
          onClick={() => {
            setRunning(true);
          }}
          type="button"
        >
          Start
        </button>
        <button
          className={buttonStyle}
          onClick={() => {
            setRunning(false);
          }}
          type="button"
        >
          Stop
        </button>
        <button
          className={buttonStyle}
          onClick={() => {
            setRunning(false);
            setTime(0);
          }}
          type="button"
        >
          Reset
        </button>
      </div>
    </>
  );
}
