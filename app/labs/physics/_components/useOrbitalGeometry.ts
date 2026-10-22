import { useEffect, useRef, useState } from "react";

import type { OrbitalRequest, OrbitalResponse } from "./orbital-worker";

export default function useOrbitalGeometry(
  shell: number,
  azimuthal: number,
  order: number
) {
  const workerRef = useRef<Worker | null>(null);
  const [result, setResult] = useState<OrbitalResponse | null>(null);
  const key = `${shell}:${azimuthal}:${order}`;
  useEffect(
    () => () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    },
    []
  );
  useEffect(() => {
    let worker: Worker;
    try {
      worker =
        workerRef.current ??
        new Worker(new URL("orbital-worker.ts", import.meta.url), {
          type: "module",
        });
      workerRef.current = worker;
    } catch {
      // oxlint-disable-next-line react/set-state-in-effect -- Surface an external worker-construction failure as a recoverable viewer error.
      setResult({ key, error: true });
      return () => {
        /* Worker support is unavailable. */
      };
    }
    function receive(event: MessageEvent<OrbitalResponse>) {
      if (event.data.key === key) {
        setResult(event.data);
      }
    }
    function fail() {
      worker.terminate();
      workerRef.current = null;
      setResult({ key, error: true });
    }
    worker.addEventListener("message", receive);
    worker.addEventListener("error", fail);
    const request: OrbitalRequest = { key, shell, azimuthal, order };
    // oxlint-disable-next-line unicorn/require-post-message-target-origin -- Dedicated workers do not accept a target origin.
    worker.postMessage(request);
    return () => {
      worker.removeEventListener("message", receive);
      worker.removeEventListener("error", fail);
    };
  }, [key, shell, azimuthal, order]);
  return result?.key === key ? result : null;
}
