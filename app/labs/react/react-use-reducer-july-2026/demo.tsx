"use client";

import { useReducer } from "react";

import LabPageHeader from "@/app/labs/_components/LabPageHeader";
import PageDescription from "@/components/PageDescription";

type Action = "increment" | "decrement";

export default function ReactUseReducerJuly2026() {
  function reducer(state: number, action: Action): number {
    switch (action) {
      case "increment": {
        return state + 1;
      }
      case "decrement": {
        return state === 0 ? 0 : state - 1;
      }
      default: {
        return count;
      }
    }
  }
  const [count, dispatch] = useReducer(reducer, 0);
  return (
    <div>
      <LabPageHeader>
        <PageDescription>use reducer</PageDescription>
      </LabPageHeader>

      <output>{count}</output>
      <button
        onClick={() => {
          dispatch("increment");
        }}
        type="button"
      >
        Increment
      </button>
      <button
        onClick={() => {
          dispatch("decrement");
        }}
        type="button"
      >
        Decrement
      </button>
    </div>
  );
}
