"use client";

import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
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
      <Confetti height={height} width={width} />
    </>
  );
}
