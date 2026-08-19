"use client";

import { useReducer } from "react";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";

type Action = "increment" | "decrement";

export default function ReactUseReducerJuly2026() {
  function reducer(state: number, action: Action): number {
    switch (action) {
      case "increment":
        return state + 1;
      case "decrement":
        return state === 0 ? 0 : state - 1;
      default:
        return count;
    }
  }
  const [count, dispatch] = useReducer(reducer, 0);
  return (
    <div>
      <SubTitle>use reducer</SubTitle>
      <div className="mb-14">
        <SourceCodeLink />
      </div>
      <h1>{count}</h1>
      <button onClick={() => dispatch("increment")} type="button">
        Increment
      </button>
      <button onClick={() => dispatch("decrement")} type="button">
        Decrement
      </button>
    </div>
  );
}
