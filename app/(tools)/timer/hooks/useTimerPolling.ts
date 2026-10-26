import { useEffect, useState } from "react";

// One visible tab polls and broadcasts snapshots. Other tabs still load on
// entry/focus and retain their completion and midnight scheduling.
export default function useTimerPolling() {
  const [polling, setPolling] = useState(false);

  useEffect(() => {
    let controller: AbortController | undefined;
    let release: (() => void) | undefined;
    let disposed = false;

    function stop() {
      controller?.abort();
      release?.();
      release = undefined;
      setPolling(false);
    }

    async function acquire(signal: AbortSignal) {
      try {
        await navigator.locks.request(
          "haritssr-timer-polling",
          { signal },
          async () => {
            if (signal.aborted) {
              return;
            }
            setPolling(true);
            // oxlint-disable-next-line promise/avoid-new -- Hold the polling lock until the tab hides or unmounts.
            await new Promise<void>((resolve) => {
              release = resolve;
            });
          }
        );
      } catch {
        if (!signal.aborted && !disposed) {
          // Poll normally if the browser blocks Web Locks.
          setPolling(true);
        }
      }
    }

    function start() {
      stop();
      if (document.hidden || disposed) {
        return;
      }
      if (!("locks" in navigator) || !("BroadcastChannel" in window)) {
        setPolling(true);
        return;
      }
      try {
        const channel = new BroadcastChannel("haritssr-timer");
        channel.close();
      } catch {
        setPolling(true);
        return;
      }
      controller = new AbortController();
      void acquire(controller.signal);
    }

    start();
    document.addEventListener("visibilitychange", start);
    window.addEventListener("pagehide", stop);
    window.addEventListener("pageshow", start);
    return () => {
      disposed = true;
      stop();
      document.removeEventListener("visibilitychange", start);
      window.removeEventListener("pagehide", stop);
      window.removeEventListener("pageshow", start);
    };
  }, []);

  return polling;
}
