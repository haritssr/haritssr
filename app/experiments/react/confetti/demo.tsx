"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";

export default function ReactConfettiDemo() {
  const { width, height } = useWindowSize();
  return (
    <>
      <SubTitle>
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
      </SubTitle>
      <SourceCodeLink />
      <Confetti height={height} width={width} />
    </>
  );
}

const Confetti = dynamic(async () => await import("react-confetti"), {
  ssr: false,
});

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
