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

function QuestionCard({ question }: { question: PracticeQuestion }) {
  const [selected, setSelected] = useState<number | null>(null);
  const isCorrect = selected === question.correctIndex;

  return (
    <li className="border-border rounded-2xl border p-5 sm:p-6">
      <p className="text-foreground font-medium">{question.prompt}</p>
      <div className="mt-2 overflow-x-auto py-1 text-lg">
        {katexify(question.expression, true)}
      </div>
      <fieldset
        aria-label={`Answers for: ${question.prompt}`}
        className="mt-4 grid gap-2 sm:grid-cols-2"
      >
        {question.choices.map((choice, index) => (
          <button
            aria-pressed={selected === index}
            className={`focus-visible:outline-action min-h-12 rounded-xl border px-4 py-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${selected === index ? "border-action bg-action/10 text-action" : "border-border text-foreground hover:border-action hover:bg-interface-hover"}`}
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
          className="text-muted border-border mt-4 rounded-xl border p-4 text-sm leading-6"
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
    <section aria-labelledby="practice-heading">
      <h2
        className="text-foreground text-2xl font-semibold"
        id="practice-heading"
      >
        Check your understanding
      </h2>
      <p className="text-muted mt-2 text-sm leading-6">
        Choose an answer to see why it works. You can change your choice.
      </p>
      <ul className="mt-6 space-y-4">
        {questions.map((question) => (
          <QuestionCard key={question.prompt} question={question} />
        ))}
      </ul>
    </section>
  );
}
