import type { Metadata } from "next";

import Accordion, { AccordionItem } from "@/components/Accordion";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import katexify from "@/utils/katexify";

import QuadraticLab from "./quadratic-lab";

export const metadata: Metadata = getExperimentMetadata(
  "mathematics",
  "quadratic-equations"
);

const rootCases = [
  {
    condition: "D>0",
    title: "Two real roots",
    description: "The parabola crosses the horizontal axis twice.",
  },
  {
    condition: "D=0",
    title: "One repeated real root",
    description: "The vertex touches the horizontal axis.",
  },
  {
    condition: "D<0",
    title: "No real roots",
    description:
      "The parabola misses the horizontal axis. There are two complex conjugate roots.",
  },
];

const exercises = [
  {
    prompt: "Factor the equation and find both roots.",
    expression: "x^2+x-6=0",
    working: String.raw`(x+3)(x-2)=0\quad\Longrightarrow\quad x=-3\;\text{or}\;x=2`,
    explanation:
      "The two numbers add to the linear coefficient and multiply to the constant term. Set each factor equal to zero.",
  },
  {
    prompt: "Decide how many real roots exist before solving.",
    expression: "2x^2-4x+2=0",
    working: String.raw`D=(-4)^2-4(2)(2)=0,\qquad x=\frac{4}{4}=1`,
    explanation:
      "A zero discriminant gives one repeated real root. Factoring gives the same result.",
  },
  {
    prompt: "Use the quadratic formula to find the exact roots.",
    expression: "x^2+2x-1=0",
    working: String.raw`D=2^2-4(1)(-1)=8,\qquad x=\frac{-2\pm\sqrt{8}}{2}=-1\pm\sqrt{2}`,
    explanation:
      "The discriminant is positive, so both roots are real. Simplify the square root to keep the answer exact.",
  },
];

function Equation({ tex }: { tex: string }) {
  return (
    <div className="text-foreground border-border overflow-x-auto rounded-xl border px-5 py-4 text-center">
      {katexify(tex, true)}
    </div>
  );
}

export default function QuadraticEquationsPage() {
  return (
    <div className="text-foreground space-y-20 pb-24">
      <div className="max-w-3xl">
        <SubTitle>
          Learn what makes an equation quadratic, how its roots appear on a
          graph, and when to factor, complete the square, or use the quadratic
          formula.
        </SubTitle>
        <SourceCodeLink />
      </div>

      <Section
        className="max-w-3xl text-base"
        title="What is a quadratic equation?"
        id="quadratic-basics-heading"
        description={
          <>
            A quadratic equation has a highest power of two. Bring every term to
            one side to write it in standard form. Its coefficients are real
            numbers, and the leading coefficient must be nonzero.
          </>
        }
      >
        <Equation tex={String.raw`ax^2+bx+c=0,\qquad a\ne0`} />
        <p className="text-muted">
          A root is a value of {katexify("x", false)} that makes the left side
          zero. On the graph of {katexify("y=ax^2+bx+c", false)}, real roots are
          the horizontal intercepts. The graph is a parabola, opening upward
          when {katexify("a>0", false)} and downward when{" "}
          {katexify("a<0", false)}.
        </p>
      </Section>

      <QuadraticLab />

      <section aria-labelledby="discriminant-heading" className="space-y-5">
        <div className="max-w-3xl">
          <SectionHeading id="discriminant-heading">
            Count the real roots first
          </SectionHeading>
          <p className="text-muted text-base leading-8">
            The discriminant is the quantity inside the square root of the
            quadratic formula. Its sign tells you the kind of roots to expect.
          </p>
        </div>
        <Equation tex={String.raw`D=b^2-4ac`} />
        <div className="grid gap-3 md:grid-cols-3">
          {rootCases.map(({ condition, title, description }) => (
            <article
              className="border-border rounded-xl border p-5"
              key={condition}
            >
              <p className="text-action font-semibold">
                {katexify(condition, false)}
              </p>
              <h3 className="mt-3 text-sm font-semibold">{title}</h3>
              <p className="text-muted mt-1 text-sm leading-6">{description}</p>
            </article>
          ))}
        </div>
        <p className="text-muted max-w-3xl text-base leading-8">
          When the discriminant is negative, the square root uses the imaginary
          unit {katexify("i", false)}, defined by {katexify("i^2=-1", false)}.
          For example, {katexify("x^2+1=0", false)} has the roots{" "}
          {katexify(String.raw`x=\pm i`, false)}.
        </p>
      </section>

      <Section
        className="max-w-3xl text-base"
        title="Three ways to solve"
        id="solving-heading"
        contentClassName="space-y-8"
      >
        <article className="space-y-4">
          <h3 className="text-xl font-semibold">
            Factor when the factors are easy to see
          </h3>
          <p className="text-muted">
            For a leading coefficient of one, look for two numbers whose sum is{" "}
            {katexify("b", false)} and whose product is {katexify("c", false)}.
            If a product is zero, at least one of its factors must be zero.
          </p>
          <Equation tex={String.raw`x^2-5x+6=(x-2)(x-3)=0`} />
          <Equation
            tex={String.raw`x-2=0\;\text{or}\;x-3=0\quad\Longrightarrow\quad x=2\;\text{or}\;x=3`}
          />
          <p className="text-muted">
            This is often the quickest method when the polynomial has simple
            integer factors.
          </p>
        </article>
        <article className="space-y-4">
          <h3 className="text-xl font-semibold">
            Complete the square to expose the structure
          </h3>
          <p className="text-muted">
            Make the leading coefficient one, move the constant, and add the
            square of half the linear coefficient to both sides. The left side
            becomes a perfect square.
          </p>
          <Equation
            tex={String.raw`x^2+6x+5=0\quad\Longrightarrow\quad x^2+6x=-5`}
          />
          <Equation
            tex={String.raw`x^2+6x+9=4\quad\Longrightarrow\quad(x+3)^2=4`}
          />
          <Equation
            tex={String.raw`x+3=\pm2\quad\Longrightarrow\quad x=-1\;\text{or}\;x=-5`}
          />
          <p className="text-muted">
            Keep both square-root signs. This method also reveals the vertex
            form {katexify(String.raw`y=a(x-h)^2+k`, false)}, whose vertex is{" "}
            {katexify("(h,k)", false)}.
          </p>
        </article>
        <article className="space-y-4">
          <h3 className="text-xl font-semibold">
            Use the quadratic formula for any quadratic
          </h3>
          <p className="text-muted">
            Completing the square on the general equation gives a formula that
            works even when the factors are hard to spot. Include each
            coefficient’s sign when you substitute.
          </p>
          <Equation tex={String.raw`x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}`} />
          <p className="text-muted">
            For {katexify("2x^2+3x-2=0", false)}, substitute{" "}
            {katexify(String.raw`a=2,\quad b=3,\quad c=-2`, false)}:
          </p>
          <Equation
            tex={String.raw`x=\frac{-3\pm\sqrt{3^2-4(2)(-2)}}{4}=\frac{-3\pm5}{4}`}
          />
          <Equation tex={String.raw`x=\frac12\;\text{or}\;x=-2`} />
          <p className="text-muted">
            Substitute each root into the original equation to check it. Keep
            radicals exact until you need a decimal approximation.
          </p>
        </article>
      </Section>

      <Section
        title="Try it yourself"
        id="quadratic-practice-heading"
        description={
          <>Solve each equation on paper, then reveal the explanation.</>
        }
      >
        <ol className="space-y-4">
          {exercises.map(
            ({ prompt, expression, working, explanation }, index) => (
              <li
                className="border-border rounded-xl border p-5 sm:p-6"
                key={expression}
              >
                <h3 className="font-semibold">
                  {index + 1}. {prompt}
                </h3>
                <div className="overflow-x-auto py-3">
                  {katexify(expression, true)}
                </div>
                <Accordion>
                  <AccordionItem
                    panelClassName="bg-transparent"
                    title="Show solution"
                    value={`exercise-${index + 1}-solution`}
                  >
                    <div className="overflow-x-auto py-3">
                      {katexify(working, true)}
                    </div>
                    <p className="text-muted text-sm leading-6">
                      {explanation}
                    </p>
                  </AccordionItem>
                </Accordion>
              </li>
            )
          )}
        </ol>
      </Section>
    </div>
  );
}
