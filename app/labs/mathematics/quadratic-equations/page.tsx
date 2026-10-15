import type { Metadata } from "next";

import Accordion, { AccordionItem } from "@/components/Accordion";
import Box from "@/components/Box";
import LabPageHeader from "@/components/LabPageHeader";
import PageDescription from "@/components/PageDescription";
import Section from "@/components/Section";
import { getLabMetadata } from "@/data/LabsData";
import katexify from "@/utils/katexify";

import QuadraticLab from "./quadratic-lab";

export const metadata: Metadata = getLabMetadata(
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
    <div className="text-foreground border-border scrollbar-subtle overflow-x-auto rounded-xl border text-center supports-[selector(::-webkit-scrollbar)]:[scrollbar-width:auto] [&::-webkit-scrollbar]:h-0.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-0 [&::-webkit-scrollbar-track]:rounded-full">
      <div className="w-max min-w-full px-6 py-5">{katexify(tex, true)}</div>
    </div>
  );
}

export default function QuadraticEquationsPage() {
  return (
    <div className="text-foreground pb-24">
      <LabPageHeader>
        <PageDescription>
          Solve quadratics and explore their roots.
        </PageDescription>
      </LabPageHeader>
      <div className="space-y-20">
        <Section
          title="What is a quadratic equation?"
          id="quadratic-basics-heading"
          description={
            <>
              A quadratic equation has a highest power of two. Bring every term
              to one side to write it in standard form. Its coefficients are
              real numbers, and the leading coefficient must be nonzero.
            </>
          }
          contentClassName="max-w-3xl space-y-5"
        >
          <Equation tex={String.raw`ax^2+bx+c=0,\qquad a\ne0`} />
          <p className="text-muted">
            A root is a value of {katexify("x", false)} that makes the left side
            zero. On the graph of {katexify("y=ax^2+bx+c", false)}, real roots
            are the horizontal intercepts. The graph is a parabola, opening
            upward when {katexify("a>0", false)} and downward when{" "}
            {katexify("a<0", false)}.
          </p>
        </Section>

        <QuadraticLab />

        <Section
          id="discriminant-heading"
          title="Count the real roots first"
          description="The discriminant is the quantity inside the square root of the quadratic formula. Its sign tells you the kind of roots to expect."
        >
          <Equation tex={String.raw`D=b^2-4ac`} />
          <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {rootCases.map(({ condition, title, description }) => (
              <article
                className="border-border rounded-xl border p-5"
                key={condition}
              >
                <p className="text-action font-semibold">
                  {katexify(condition, false)}
                </p>
                <h3 className="mt-3 text-sm font-semibold">{title}</h3>
                <p className="text-muted mt-1 text-sm leading-6">
                  {description}
                </p>
              </article>
            ))}
          </div>
          <p className="text-muted max-w-3xl text-base leading-8">
            When the discriminant is negative, the square root uses the
            imaginary unit {katexify("i", false)}, defined by{" "}
            {katexify("i^2=-1", false)}. For example,{" "}
            {katexify("x^2+1=0", false)} has the roots{" "}
            {katexify(String.raw`x=\pm i`, false)}.
          </p>
        </Section>

        <Section
          title="Three ways to solve"
          id="solving-heading"
          contentClassName="space-y-8"
        >
          <Section
            headingAs="h3"
            contentClassName="max-w-3xl space-y-5"
            title="Factor when the factors are easy to see"
          >
            <p className="text-muted">
              For a leading coefficient of one, look for two numbers whose sum
              is {katexify("b", false)} and whose product is{" "}
              {katexify("c", false)}. If a product is zero, at least one of its
              factors must be zero.
            </p>
            <Equation tex={String.raw`x^2-5x+6=(x-2)(x-3)=0`} />
            <Equation
              tex={String.raw`x-2=0\;\text{or}\;x-3=0\quad\Longrightarrow\quad x=2\;\text{or}\;x=3`}
            />
            <p className="text-muted">
              This is often the quickest method when the polynomial has simple
              integer factors.
            </p>
          </Section>
          <Section
            headingAs="h3"
            contentClassName="max-w-3xl space-y-5"
            title="Complete the square to expose the structure"
          >
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
          </Section>
          <Section
            headingAs="h3"
            contentClassName="max-w-3xl space-y-5"
            title="Use the quadratic formula for any quadratic"
          >
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
          </Section>
        </Section>

        <Section
          title="Try it yourself"
          id="quadratic-practice-heading"
          description={
            <>Solve each equation on paper, then reveal the explanation.</>
          }
        >
          <ul className="space-y-4">
            {exercises.map(
              ({ prompt, expression, working, explanation }, index) => (
                <Box as="li" headingAs="h3" key={expression} title={prompt}>
                  <div className="overflow-x-auto py-3">
                    {katexify(expression, true)}
                  </div>
                  <Accordion className="mt-auto w-full">
                    <AccordionItem
                      panelClassName="bg-transparent"
                      excludeFromContents
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
                </Box>
              )
            )}
          </ul>
        </Section>
      </div>
    </div>
  );
}
