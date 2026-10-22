"use client";

import { useState } from "react";
import type { ReactNode } from "react";

export default function PracticeQuestionCard({
  prompt,
  expression,
  choices,
  correctIndex,
  explanation,
  working,
}: {
  prompt: string;
  expression: ReactNode;
  choices: readonly ReactNode[];
  correctIndex: number;
  explanation: string;
  working: ReactNode;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const isCorrect = selected === correctIndex;

  return (
    <li className="border-border min-w-0 rounded-2xl border p-5 sm:p-6">
      <p className="text-foreground font-medium">{prompt}</p>
      <div className="mt-2 overflow-x-auto py-1 text-lg">{expression}</div>
      <fieldset
        aria-label={`Answers for: ${prompt}`}
        className="mt-4 grid min-w-0 grid-cols-[repeat(auto-fit,minmax(min(100%,10rem),1fr))] gap-2"
      >
        {choices.map((choice, index) => (
          <button
            aria-pressed={selected === index}
            className={`focus-visible:outline-action min-h-12 min-w-0 overflow-x-auto rounded-xl border px-4 py-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${selected === index ? "border-action bg-action/10 text-action" : "border-border text-foreground hover:border-action hover:bg-interface-hover"}`}
            key={index}
            onClick={() => {
              setSelected(index);
            }}
            type="button"
          >
            {choice}
          </button>
        ))}
      </fieldset>
      {selected === null ? null : (
        <div
          aria-live="polite"
          className="text-muted border-border mt-4 rounded-xl border p-4 text-sm leading-6"
        >
          <p
            className={`font-semibold ${isCorrect ? "text-green-700" : "text-amber-800"}`}
          >
            {isCorrect ? "Correct." : "Not quite. The correct answer is"}{" "}
            {isCorrect ? null : choices[correctIndex]}
          </p>
          <p className="mt-2">{explanation}</p>
          <div className="mt-2 overflow-x-auto py-1">{working}</div>
        </div>
      )}
    </li>
  );
}
