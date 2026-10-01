"use client";

import { useState } from "react";

import katexify from "@/utils/katexify";

export interface PracticeQuestion {
  readonly prompt: string;
  readonly expression: string;
  readonly choices: readonly string[];
  readonly correctIndex: number;
  readonly explanation: string;
  readonly working: string;
}

function QuestionCard({
  number,
  question,
}: {
  number: number;
  question: PracticeQuestion;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const isCorrect = selected === question.correctIndex;

  return (
    <li className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
      <p className="text-sm font-semibold text-zinc-500">Question {number}</p>
      <p className="mt-2 font-medium text-zinc-950">{question.prompt}</p>
      <div className="mt-2 overflow-x-auto py-1 text-lg">
        {katexify(question.expression, true)}
      </div>
      <fieldset
        aria-label={`Answers for question ${number}`}
        className="mt-4 grid gap-2 sm:grid-cols-2"
      >
        {question.choices.map((choice, index) => (
          <button
            aria-pressed={selected === index}
            className={`min-h-12 rounded-xl border px-4 py-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${selected === index ? "border-blue-600 bg-blue-50 text-blue-900" : "border-zinc-200 text-zinc-800 hover:border-blue-300 hover:bg-zinc-50"}`}
            key={choice}
            onClick={() => {
              setSelected(index);
            }}
            type="button"
          >
            {katexify(choice, false)}
          </button>
        ))}
      </fieldset>
      {selected === null ? null : (
        <div
          aria-live="polite"
          className="mt-4 rounded-xl bg-zinc-50 p-4 text-sm leading-6 text-zinc-700"
        >
          <p
            className={`font-semibold ${isCorrect ? "text-green-700" : "text-amber-800"}`}
          >
            {isCorrect ? "Correct." : "Not quite. The correct answer is"}{" "}
            {isCorrect
              ? null
              : katexify(question.choices[question.correctIndex], false)}
          </p>
          <p className="mt-2">{question.explanation}</p>
          <div className="mt-2 overflow-x-auto py-1">
            {katexify(question.working, true)}
          </div>
        </div>
      )}
    </li>
  );
}

export default function Practice({
  questions,
}: {
  questions: readonly PracticeQuestion[];
}) {
  return (
    <section aria-labelledby="practice-heading" className="mt-14">
      <h2
        className="text-2xl font-semibold text-zinc-950"
        id="practice-heading"
      >
        Check your understanding
      </h2>
      <p className="mt-2 text-sm leading-6 text-zinc-600">
        Choose an answer to see why it works. You can change your choice.
      </p>
      <ol className="mt-6 space-y-4">
        {questions.map((question, index) => (
          <QuestionCard
            key={question.prompt}
            number={index + 1}
            question={question}
          />
        ))}
      </ol>
    </section>
  );
}
