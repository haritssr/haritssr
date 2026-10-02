import type { Metadata } from "next";

import Section from "@/components/Section";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import katexify from "@/utils/katexify";

import LessonNavigation from "../lesson-navigation";
import Practice from "../practice";
import type { PracticeQuestion } from "../practice";
import LimitsLab from "./limits-lab";

export const metadata: Metadata = getExperimentMetadata("math", "limits", {
  description:
    "Learn limits by approaching a point from both sides, including holes and jumps.",
});

const questions: readonly PracticeQuestion[] = [
  {
    prompt: "What value does the curve approach?",
    expression: String.raw`\lim_{x\to 3}x^2`,
    choices: ["6", "9", "3", String.raw`\text{does not exist}`],
    correctIndex: 1,
    explanation:
      "The square function is continuous here, so nearby outputs approach the square of the target input.",
    working: String.raw`\lim_{x\to 3}x^2=3^2=9`,
  },
  {
    prompt: "The expression is undefined at the target. What is its limit?",
    expression: String.raw`\lim_{x\to 2}\frac{x^2-4}{x-2}`,
    choices: ["0", "2", "4", String.raw`\text{does not exist}`],
    correctIndex: 2,
    explanation:
      "Factor the numerator and cancel the common factor for inputs near, but not equal to, the target.",
    working: String.raw`\frac{x^2-4}{x-2}=x+2\quad(x\ne2),\qquad\lim_{x\to2}(x+2)=4`,
  },
  {
    prompt:
      "The left side approaches one height and the right side another. What is the two-sided limit?",
    expression: String.raw`\lim_{x\to1}f(x),\quad f(x)=\begin{cases}2&x<1\\3&x\ge1\end{cases}`,
    choices: [
      "2",
      "3",
      String.raw`\frac{5}{2}`,
      String.raw`\text{does not exist}`,
    ],
    correctIndex: 3,
    explanation:
      "A two-sided limit exists only when the left and right approaches agree.",
    working: String.raw`\lim_{x\to1^-}f(x)=2,\quad\lim_{x\to1^+}f(x)=3`,
  },
];

export default function LimitsPage() {
  return (
    <div className="pb-24">
      <div className="max-w-3xl">
        <SubTitle>
          A limit asks where a function is heading as its input gets close to a
          point. Start by watching nearby values, not by substituting the point.
        </SubTitle>
        <SourceCodeLink />
      </div>

      <div className="mb-10 max-w-3xl space-y-5 text-base leading-8 text-zinc-700">
        <Section name="What does approaching mean?" />
        <p>
          Pick a target on the horizontal axis. Move toward it from the left and
          right, and watch the function’s height. For a limit to exist from both
          sides, those heights must head toward the same value.
        </p>
        <div className="overflow-x-auto rounded-xl bg-blue-50 px-5 py-4 text-center text-zinc-950">
          {katexify(
            String.raw`\lim_{x\to a}f(x)=L\quad\Longleftrightarrow\quad\lim_{x\to a^-}f(x)=\lim_{x\to a^+}f(x)=L`,
            true
          )}
        </div>
        <p>
          The function can have a hole or a different value at the target. A
          limit describes nearby inputs, so that single point does not decide
          the answer.
        </p>
      </div>

      <LimitsLab />

      <section className="mt-12 max-w-3xl space-y-5 text-base leading-8 text-zinc-700">
        <Section name="Try a limit by hand" />
        <p>
          Consider the fraction below. Substitution at the target gives an
          undefined fraction, but factoring shows what happens nearby.
        </p>
        <div className="overflow-x-auto rounded-xl bg-zinc-50 px-5 py-4 text-center text-zinc-950">
          {katexify(
            String.raw`\frac{x^2-1}{x-1}=\frac{(x-1)(x+1)}{x-1}=x+1\quad(x\ne1)`,
            true
          )}
        </div>
        <p>
          The simplified expression has a height approaching{" "}
          {katexify("2", false)} from either side. The original fraction is
          still undefined at the target, yet its limit exists:
        </p>
        <div className="overflow-x-auto rounded-xl bg-zinc-50 px-5 py-4 text-center text-zinc-950">
          {katexify(String.raw`\lim_{x\to1}\frac{x^2-1}{x-1}=2`, true)}
        </div>
      </section>

      <Practice questions={questions} />
      <LessonNavigation
        next={{ href: "/experiments/math/derivatives", title: "Derivatives" }}
        previous={{ href: "/experiments/math", title: "Mathematics" }}
      />
    </div>
  );
}
