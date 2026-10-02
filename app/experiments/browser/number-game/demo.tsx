"use client";

import { useState } from "react";

import "katex/dist/katex.min.css";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";
import katexify from "@/utils/katexify";

export default function NumberGameDemo() {
  // the state of the game
  const [state, setState] = useState({
    num1: 1,
    num2: 2,
    response: "",
    score: 0,
    incorrect: false,
  });

  function inputKeyPress(event: { key: string }) {
    if (event.key === "Enter") {
      const answer =
        state.response.trim() === "" ? Number.NaN : Number(state.response);
      if (state.num1 + state.num2 === answer) {
        setState({
          ...state,
          num1: Math.ceil(Math.random() * 10),
          num2: Math.ceil(Math.random() * 10),
          score: state.score + 1,
          response: "",
          incorrect: false,
        });
      } else {
        setState({
          ...state,
          score: state.score - 1,
          response: "",
          incorrect: true,
        });
      }
    }
  }

  function updateResponse(event: { target: { value: string } }) {
    setState({
      ...state,
      response: event.target.value,
    });
  }

  if (state.score === 10) {
    return (
      <>
        <SubTitle>
          Random additional game.
          <br />
          Win if correct 10 times.
          <br />
          Every wrong answer decrease one score.
        </SubTitle>
        <SourceCodeLink />
        <div className="pt-24 text-center text-4xl font-bold text-green-500">
          You win!
        </div>

        <div className="mt-5 flex justify-center">
          <button
            className="border-harislab text-harislab mx-auto inline-block rounded-md border px-4 py-2 text-center hover:border-zinc-700 hover:bg-zinc-50"
            onClick={() => {
              setState({
                num1: 1,
                num2: 2,
                response: "",
                score: 0,
                incorrect: false,
              });
            }}
            type="button"
          >
            Play Again
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <SubTitle>
        Random additional game.
        <br />
        Win if correct 10 times.
        <br />
        Every wrong answer decrease one score.
      </SubTitle>
      <SourceCodeLink />
      <div className="mx-auto flex max-w-xl flex-col items-center justify-center pt-24">
        <div className={state.incorrect ? "incorrect" : ""}>
          {katexify(`${state.num1} + ${state.num2}`, false)}
        </div>
        <input
          aria-label={`Answer to ${state.num1} plus ${state.num2}`}
          className="focus:ring-harislab rounded-md border border-gray-500 py-1 pl-2 focus:ring-1 focus:outline-hidden"
          onChange={updateResponse}
          onKeyDown={inputKeyPress}
          value={state.response}
        />
        <div>Score : {state.score}</div>
      </div>
    </>
  );
}
