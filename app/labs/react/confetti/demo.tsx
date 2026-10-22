"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useSyncExternalStore } from "react";

import Button from "@/components/Button";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import LabPageHeader from "@/components/LabPageHeader";
import PageDescription from "@/components/PageDescription";

export default function ReactConfettiDemo() {
  const { width, height } = useWindowSize();
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    getMotion,
    () => true
  );
  const [playing, setPlaying] = useState(false);
  return (
    <>
      <LabPageHeader>
        <PageDescription as="div">
          From{" "}
          <ExternalLink
            href="https://github.com/alampros/react-confetti"
            name="react-confetti"
          />{" "}
          <br />
          <ExplanationList>
            <li>
              Resize the window to see the confetti canvas follow the viewport.
            </li>
          </ExplanationList>
        </PageDescription>
      </LabPageHeader>

      <div className="space-y-3">
        <Button
          disabled={reducedMotion}
          aria-pressed={playing && !reducedMotion}
          onClick={() => setPlaying((current) => !current)}
          variant="secondary"
        >
          {playing && !reducedMotion ? "Stop confetti" : "Start confetti"}
        </Button>
        {reducedMotion ? (
          <p className="text-muted">
            Confetti is disabled by your reduced motion preference.
          </p>
        ) : null}
      </div>
      {playing && !reducedMotion ? (
        <Confetti height={height} width={width} />
      ) : null}
    </>
  );
}

const Confetti = dynamic(async () => await import("react-confetti"), {
  ssr: false,
});

function subscribeMotion(listener: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}

function getMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    let frameId: number;

    function updateSize() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setSize((previous) =>
        previous.width === width && previous.height === height
          ? previous
          : { width, height }
      );
    }

    function scheduleUpdate() {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateSize);
    }

    scheduleUpdate();
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("resize", scheduleUpdate);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return size;
}
