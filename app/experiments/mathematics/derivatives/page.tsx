import type { Metadata } from "next";

import Section from "@/components/Section";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import katexify from "@/utils/katexify";

import Practice from "../practice";
import type { PracticeQuestion } from "../practice";
import DerivativesLab from "./derivatives-lab";

export const metadata: Metadata = getExperimentMetadata(
  "mathematics",
  "derivatives",
  {
    description:
      "Learn derivatives by shrinking secant lines into tangent lines and practicing polynomial rules.",
  }
);

const questions: readonly PracticeQuestion[] = [
  {
    prompt: "What is the derivative of this function?",
    expression: String.raw`f(x)=x^2`,
    choices: ["x", "2x", "x^3", "2"],
    correctIndex: 1,
    explanation:
      "Expand the difference quotient, cancel the gap, and let the gap approach zero.",
    working: String.raw`\frac{(x+h)^2-x^2}{h}=2x+h\;\longrightarrow\;2x`,
  },
  {
    prompt: "What is the tangent slope at this input?",
    expression: String.raw`f(x)=x^2,\quad x=3`,
    choices: ["3", "6", "9", "12"],
    correctIndex: 1,
    explanation:
      "Differentiate first, then evaluate the derivative at the chosen input.",
    working: String.raw`f'(x)=2x,\qquad f'(3)=2(3)=6`,
  },
  {
    prompt: "Differentiate each term and add the results.",
    expression: String.raw`g(x)=3x^2+2x-5`,
    choices: ["6x+2", "6x-5", "3x+2", "6x+2x"],
    correctIndex: 0,
    explanation:
      "The quadratic term becomes a linear term, the linear term becomes its coefficient, and the constant becomes zero.",
    working: String.raw`g'(x)=3(2x)+2(1)-0=6x+2`,
  },
];

export default function DerivativesPage() {
  return (
    <div className="space-y-20 pb-24">
      <div className="max-w-3xl">
        <SubTitle>
          A derivative gives the slope of a curve at one point. It comes from
          asking what happens to the slope between two points as they meet.
        </SubTitle>
        <SourceCodeLink />
      </div>

      <Section
        className="text-muted max-w-3xl text-base"
        title="From average change to change right now"
        description={
          <>
            The slope between two points is a secant slope. Make their
            horizontal gap smaller and the secant turns toward a tangent. The
            limit of those secant slopes is the derivative.
          </>
        }
      >
        <div className="text-foreground border-border overflow-x-auto rounded-xl border px-5 py-4 text-center">
          {katexify(
            String.raw`\text{secant slope}=\frac{f(a+h)-f(a)}{h},\qquad f'(a)=\lim_{h\to0}\frac{f(a+h)-f(a)}{h}`,
            true
          )}
        </div>
        <p>
          For example, if position changes with time, this same idea turns an
          average velocity over an interval into velocity at an instant.
        </p>
      </Section>

      <DerivativesLab />

      <Section
        className="text-muted max-w-3xl text-base"
        title="Why the square curve has this slope"
        description={
          <>
            Expand the numerator of the secant slope. Once the nonzero gap
            cancels, letting the gap approach zero is straightforward.
          </>
        }
      >
        <div className="text-foreground border-border overflow-x-auto rounded-xl border px-5 py-4 text-center">
          {katexify(
            String.raw`\frac{(a+h)^2-a^2}{h}=\frac{2ah+h^2}{h}=2a+h\quad(h\ne0)`,
            true
          )}
        </div>
        <div className="text-foreground border-border overflow-x-auto rounded-xl border px-5 py-4 text-center">
          {katexify(String.raw`\lim_{h\to0}(2a+h)=2a`, true)}
        </div>
        <p>
          This leads to the power rule. You can differentiate a polynomial one
          term at a time; constant terms have zero slope.
        </p>
        <div className="text-foreground border-border overflow-x-auto rounded-xl border px-5 py-4 text-center">
          {katexify(
            String.raw`\frac{d}{dx}x^n=nx^{n-1},\qquad\frac{d}{dx}(u+v)=u'+v',\qquad\frac{d}{dx}c=0`,
            true
          )}
        </div>
      </Section>

      <Practice questions={questions} />
    </div>
  );
}
