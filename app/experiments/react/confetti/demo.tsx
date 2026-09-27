"use client";

import dynamic from "next/dynamic";
import useWindowSize from "react-use/lib/useWindowSize";

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
          href="https://beta.reactjs.org/learn/  reacting-to-input-with-state#challenges"
          name="beta.reactjs.org"
        />{" "}
        <br />
        <ExplanationList>
          <li>Try to edit the profile and save to see the result of change.</li>
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
