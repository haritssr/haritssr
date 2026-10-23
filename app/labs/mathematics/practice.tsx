import { Fragment } from "react";

import Section from "@/components/Section";
import katexify from "@/utils/katexify";

import PracticeQuestionCard from "./practice-question-card";

export interface PracticeQuestion {
  readonly prompt: string;
  readonly expression: string;
  readonly choices: readonly string[];
  readonly correctIndex: number;
  readonly explanation: string;
  readonly working: string;
}

export default function Practice({
  questions,
}: {
  questions: readonly PracticeQuestion[];
}) {
  return (
    <Section
      className="min-w-0"
      id="practice-heading"
      title="Check your understanding"
      description="Choose an answer to see why it works. You can change your choice."
    >
      <ul className="grid min-w-0 grid-cols-1 items-start gap-4 lg:grid-cols-2">
        {questions.map((question) => (
          <PracticeQuestionCard
            key={question.prompt}
            prompt={question.prompt}
            expression={katexify(question.expression, true)}
            choices={question.choices.map((choice) => (
              <Fragment key={choice}>{katexify(choice, false)}</Fragment>
            ))}
            correctIndex={question.correctIndex}
            explanation={question.explanation}
            working={katexify(question.working, true)}
          />
        ))}
      </ul>
    </Section>
  );
}
