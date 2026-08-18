"use client";

import Link from "next/link";

import { useState } from "react";
import SubTitle from "@/components/SubTitle";

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
      const answer = Number.parseInt(state.response, 10);
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
        <div className="pt-24 text-center font-bold text-4xl text-green-500">
          You win!
        </div>

        <Link
          className="mt-5 flex justify-center"
          href="/experiments/browser/number-game"
        >
          <button
            className="mx-auto inline-block rounded-md border border-harislab px-4 py-2 text-center text-harislab hover:border-zinc-700 hover:bg-zinc-50"
            onClick={() => window.location.reload()}
            type="button"
          >
            Play Again
          </button>
        </Link>
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
      <div className="mx-auto flex max-w-xl flex-col items-center justify-center pt-24">
        <div className={state.incorrect ? "incorrect" : ""}>
          {state.num1}+{state.num2}
        </div>
        <input
          className="rounded-md border border-gray-500 py-1 pl-2 focus:outline-hidden focus:ring-1 focus:ring-harislab"
          onChange={updateResponse}
          onKeyDown={inputKeyPress}
          value={state.response}
        />
        <div>Score : {state.score}</div>
      </div>
    </>
  );
}
