import type { Metadata } from "next";

import Section from "@/components/Section";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import katexify from "@/utils/katexify";

import Practice from "../practice";
import type { PracticeQuestion } from "../practice";
import IntegralRules from "./integral-rules";
import IntegralsLab from "./integrals-lab";

export const metadata: Metadata = getExperimentMetadata(
  "mathematics",
  "integrals",
  {
    description:
      "Learn definite integrals through midpoint rectangles, signed area, and antiderivatives.",
  }
);

const questions: readonly PracticeQuestion[] = [
  {
    prompt: "What is the exact signed area over this interval?",
    expression: String.raw`\int_0^2 x\,dx`,
    choices: ["1", "2", "4", String.raw`\frac{1}{2}`],
    correctIndex: 1,
    explanation:
      "An antiderivative of the function is half the square of the input. Evaluate it at the upper and lower bounds.",
    working: String.raw`\int_0^2x\,dx=\left[\frac{x^2}{2}\right]_0^2=\frac{2^2}{2}-0=2`,
  },
  {
    prompt: "What happens when the positive and negative parts balance?",
    expression: String.raw`\int_{-2}^{2}x\,dx`,
    choices: ["-4", "0", "2", "4"],
    correctIndex: 1,
    explanation:
      "The line has equal negative and positive contributions on this symmetric interval. Signed area can cancel.",
    working: String.raw`\int_{-2}^{2}x\,dx=\left[\frac{x^2}{2}\right]_{-2}^{2}=2-2=0`,
  },
  {
    prompt: "Use an antiderivative to evaluate the accumulation.",
    expression: String.raw`\int_0^2 x^2\,dx`,
    choices: ["2", "4", String.raw`\frac{8}{3}`, String.raw`\frac{4}{3}`],
    correctIndex: 2,
    explanation:
      "Raise the power by one, divide by the new power, then subtract the values at the bounds.",
    working: String.raw`\int_0^2x^2\,dx=\left[\frac{x^3}{3}\right]_0^2=\frac{8}{3}`,
  },
];

export default function IntegralsPage() {
  return (
    <div className="pb-24">
      <div className="max-w-3xl">
        <SubTitle>
          An integral adds up many small contributions. On a graph, a definite
          integral is the signed area between the curve and the horizontal axis.
        </SubTitle>
        <SourceCodeLink />
      </div>

      <section className="text-muted mb-10 max-w-3xl space-y-5 text-base leading-8">
        <Section name="From rectangles to accumulation" />
        <p>
          Split an interval into thin slices. For each slice, multiply its width
          by the function’s height at the midpoint. Add the rectangles, then
          make them thinner. Their sum approaches the definite integral.
        </p>
        <div className="text-foreground border-border overflow-x-auto rounded-xl border px-5 py-4 text-center">
          {katexify(
            String.raw`\int_a^b f(x)\,dx=\lim_{n\to\infty}\sum_{i=1}^{n} f(x_i^*)\,\Delta x,\qquad\Delta x=\frac{b-a}{n}`,
            true
          )}
        </div>
        <p>
          A rectangle below the horizontal axis counts negatively. That is why a
          definite integral can be zero even when the curve encloses visible
          regions.
        </p>
      </section>

      <IntegralsLab />

      <section className="text-muted mt-12 max-w-3xl space-y-5 text-base leading-8">
        <Section name="A faster exact method" />
        <p>
          An antiderivative reverses differentiation. If differentiating a
          function gives the curve you are integrating, evaluate that function
          at the bounds and subtract. This is the Fundamental Theorem of
          Calculus.
        </p>
        <div className="text-foreground border-border overflow-x-auto rounded-xl border px-5 py-4 text-center">
          {katexify(
            String.raw`F'(x)=f(x)\quad\Longrightarrow\quad\int_a^b f(x)\,dx=F(b)-F(a)`,
            true
          )}
        </div>
        <p>
          For the square curve, the power rule works in reverse. The result
          agrees with what the rectangles approach.
        </p>
        <div className="text-foreground border-border overflow-x-auto rounded-xl border px-5 py-4 text-center">
          {katexify(
            String.raw`\int_0^2 x^2\,dx=\left[\frac{x^3}{3}\right]_0^2=\frac{8}{3}`,
            true
          )}
        </div>
      </section>

      <IntegralRules />

      <Practice questions={questions} />
    </div>
  );
}
