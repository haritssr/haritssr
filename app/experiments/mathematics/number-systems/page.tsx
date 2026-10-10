import type { Metadata } from "next";

import Accordion, { AccordionItem } from "@/components/Accordion";
import Section from "@/components/Section";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import katexify from "@/utils/katexify";

import IntervalLab from "./interval-lab";
import NumberSets from "./number-sets";

export const metadata: Metadata = getExperimentMetadata(
  "mathematics",
  "number-systems"
);

const numberSets = [
  {
    name: "Natural numbers",
    symbol: String.raw`\mathbb{N}`,
    examples: String.raw`1,2,3,\ldots`,
    description: "Positive counting numbers. In this lesson, zero is excluded.",
  },
  {
    name: "Whole numbers",
    symbol: String.raw`\mathbb{W}`,
    examples: String.raw`0,1,2,3,\ldots`,
    description: "The natural numbers together with zero.",
  },
  {
    name: "Integers",
    symbol: String.raw`\mathbb{Z}`,
    examples: String.raw`\ldots,-2,-1,0,1,2,\ldots`,
    description: "Whole numbers and their negatives. No fractional parts.",
  },
  {
    name: "Rational numbers",
    symbol: String.raw`\mathbb{Q}`,
    examples: String.raw`\frac23,\quad-\frac54,\quad0.125`,
    description:
      "Numbers expressible as a ratio of integers with a nonzero denominator. Their decimals terminate or eventually repeat.",
  },
  {
    name: "Irrational numbers",
    symbol: String.raw`\mathbb{R}\setminus\mathbb{Q}`,
    examples: String.raw`\sqrt2,\quad\pi,\quad e`,
    description:
      "Real numbers that are not rational. Their decimals neither terminate nor eventually repeat.",
  },
  {
    name: "Real numbers",
    symbol: String.raw`\mathbb{R}`,
    examples: String.raw`-3,\quad0,\quad\frac12,\quad\sqrt2`,
    description:
      "All rational and irrational numbers. Every point on the number line represents one real number.",
  },
];

const intervalForms = [
  {
    name: "Open",
    notation: "(a,b)",
    condition: "a<x<b",
    endpoints: "Neither endpoint",
  },
  {
    name: "Closed",
    notation: "[a,b]",
    condition: String.raw`a\le x\le b`,
    endpoints: "Both endpoints",
  },
  {
    name: "Half-open",
    notation: "[a,b)",
    condition: String.raw`a\le x<b`,
    endpoints: "Left endpoint only",
  },
  {
    name: "Half-open",
    notation: "(a,b]",
    condition: String.raw`a<x\le b`,
    endpoints: "Right endpoint only",
  },
  {
    name: "Right ray",
    notation: String.raw`[a,\infty)`,
    condition: String.raw`x\ge a`,
    endpoints: "Finite endpoint included",
  },
  {
    name: "Left ray",
    notation: String.raw`(-\infty,b)`,
    condition: "x<b",
    endpoints: "Finite endpoint excluded",
  },
];

const exercises = [
  {
    question: "Classify a negative terminating decimal.",
    expression: "-1.25",
    answer: String.raw`-1.25=-\frac54\in\mathbb{Q}\subset\mathbb{R}`,
    explanation:
      "It is rational and real, but not an integer, whole number, or natural number.",
  },
  {
    question: "Write the inequality in interval notation.",
    expression: String.raw`-1<x\le4`,
    answer: "(-1,4]",
    explanation:
      "Use a parenthesis at the excluded left endpoint and a square bracket at the included right endpoint.",
  },
  {
    question: "Can this interval contain a number?",
    expression: "(2,2)",
    answer: String.raw`\{x\in\mathbb{R}:2<x<2\}=\varnothing`,
    explanation:
      "No number is simultaneously greater than two and less than two. Including both equal endpoints would instead give a single point.",
  },
];

function Equation({ tex }: { tex: string }) {
  return (
    <div className="border-border overflow-x-auto rounded-xl border px-4 py-3 text-center">
      {katexify(tex, true)}
    </div>
  );
}

export default function NumberSystemsPage() {
  return (
    <div className="text-foreground space-y-20 pb-24">
      <div className="max-w-3xl">
        <SubTitle>
          Learn how number sets fit together, locate values on a number line,
          and translate between inequalities and interval notation.
        </SubTitle>
        <SourceCodeLink />
      </div>

      <Section
        title="The families of numbers"
        id="number-families-heading"
        description={
          <>
            A number can belong to several sets at once. Counting numbers are
            integers, and every integer is rational because it can be written as
            a fraction with denominator one.
          </>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {numberSets.map((set) => (
            <article
              className="border-border rounded-xl border p-5"
              key={set.name}
            >
              <div className="text-action mb-3 text-xl">
                {katexify(set.symbol, false)}
              </div>
              <h3 className="font-semibold">{set.name}</h3>
              <p className="text-muted mt-2 text-sm leading-6">
                {set.description}
              </p>
              <div className="mt-4 text-sm leading-8">
                {katexify(set.examples, false)}
              </div>
            </article>
          ))}
        </div>
        <p className="text-muted max-w-3xl text-sm leading-7">
          Conventions vary: some books include {katexify("0", false)} in{" "}
          {katexify(String.raw`\mathbb{N}`, false)}. Here we start natural
          numbers at {katexify("1", false)} and use{" "}
          {katexify(String.raw`\mathbb{W}`, false)} for whole numbers. The
          whole-number symbol is not universal; always check a text’s
          definitions.
        </p>
        <Equation
          tex={String.raw`\mathbb{N}\subset\mathbb{W}\subset\mathbb{Z}\subset\mathbb{Q}\subset\mathbb{R}`}
        />
        <p className="text-muted max-w-3xl text-base leading-8">
          The subset symbol {katexify(String.raw`\subset`, false)} means every
          member of the set on the left also belongs to the set on the right.
          Irrational numbers sit outside the rational set but inside the real
          set.
        </p>
      </Section>

      <NumberSets />

      <Section
        className="max-w-3xl text-base"
        title="Read the number line"
        id="number-line-heading"
        description={
          <>
            Zero is the reference point. Negative numbers lie to its left and
            positive numbers to its right. Values increase as you move right, so{" "}
            {katexify("-4<-1<0<2", false)}. Equal steps on the line represent
            equal differences in value.
          </>
        }
      >
        <p className="text-muted">
          Fractions and irrational numbers occupy points too:{" "}
          {katexify(String.raw`\frac12`, false)} lies halfway between{" "}
          {katexify("0", false)} and {katexify("1", false)}, while{" "}
          {katexify(String.raw`\sqrt2\approx1.414`, false)} lies between{" "}
          {katexify("1", false)} and {katexify("2", false)}. Its exact point
          exists even though its decimal expansion never ends.
        </p>
        <p className="text-muted">
          An interval describes all real numbers between its bounds, including
          every fractional and irrational value there. It is not just a list of
          integers.
        </p>
      </Section>

      <Section
        title="Brackets, parentheses, and infinity"
        id="interval-notation-heading"
        description={
          <>
            A square bracket includes a finite endpoint; a parenthesis excludes
            it. Read the left bound first and the right bound second. In the
            table, assume {katexify("a<b", false)}.
          </>
        }
      >
        <div className="border-border overflow-x-auto rounded-xl border">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">
              Common interval forms and their equivalent inequalities
            </caption>
            <thead>
              <tr>
                {["Type", "Interval", "Inequality", "Included endpoints"].map(
                  (heading) => (
                    <th
                      className="border-border border-b px-4 py-3 font-semibold whitespace-nowrap"
                      key={heading}
                      scope="col"
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {intervalForms.map((form) => (
                <tr
                  className="border-border border-b last:border-b-0"
                  key={form.notation}
                >
                  <th
                    className="px-4 py-3 font-medium whitespace-nowrap"
                    scope="row"
                  >
                    {form.name}
                  </th>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {katexify(form.notation, false)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {katexify(form.condition, false)}
                  </td>
                  <td className="text-muted px-4 py-3 whitespace-nowrap">
                    {form.endpoints}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-muted max-w-3xl text-base leading-8">
          Infinity describes an unbounded direction, not a number you can
          include. Always use parentheses at{" "}
          {katexify(String.raw`-\infty`, false)} and{" "}
          {katexify(String.raw`\infty`, false)}. The whole real line is{" "}
          {katexify(String.raw`(-\infty,\infty)=\mathbb{R}`, false)}.
        </p>
      </Section>

      <IntervalLab />

      <Section
        className="max-w-3xl text-base"
        title="Combine intervals with sets"
        id="combine-intervals-heading"
        description={
          <>
            The union {katexify(String.raw`A\cup B`, false)} includes numbers in
            either set or both. The intersection{" "}
            {katexify(String.raw`A\cap B`, false)} includes only numbers in
            both. For these overlapping intervals:
          </>
        }
      >
        <Equation tex={String.raw`A=[-2,1],\qquad B=(0,3)`} />
        <Equation tex={String.raw`A\cup B=[-2,3)`} />
        <Equation tex={String.raw`A\cap B=(0,1]`} />
        <p className="text-muted">
          The union covers the combined stretch. For the intersection,{" "}
          {katexify("0", false)} is excluded by the second interval, while{" "}
          {katexify("1", false)} belongs to both. Disjoint intervals stay
          separate: {katexify(String.raw`(-\infty,-1)\cup(2,\infty)`, false)}{" "}
          means {katexify("x<-1", false)} or {katexify("x>2", false)}.
        </p>
      </Section>

      <Section
        className="max-w-3xl text-base"
        title="Beyond the real line"
        id="beyond-real-heading"
        description={
          <>
            Complex numbers have the form {katexify("a+bi", false)}, with real{" "}
            {katexify("a", false)} and {katexify("b", false)} and{" "}
            {katexify("i^2=-1", false)}. Real numbers are the cases where{" "}
            {katexify("b=0", false)}, so{" "}
            {katexify(String.raw`\mathbb{R}\subset\mathbb{C}`, false)}. A
            non-real number such as {katexify("2+i", false)} needs a complex
            plane; it has no point on the real number line and is neither
            rational nor irrational.
          </>
        }
      />

      <Section
        title="Try it yourself"
        id="number-systems-practice-heading"
        description={<>Decide your answer before revealing the explanation.</>}
      >
        <ol className="space-y-4">
          {exercises.map((exercise, index) => (
            <li
              className="border-border rounded-xl border p-5 sm:p-6"
              key={exercise.expression}
            >
              <h3 className="font-semibold">
                {index + 1}. {exercise.question}
              </h3>
              <div className="overflow-x-auto py-3">
                {katexify(exercise.expression, true)}
              </div>
              <Accordion>
                <AccordionItem
                  panelClassName="bg-transparent"
                  title="Show explanation"
                  value={`exercise-${index + 1}-explanation`}
                >
                  <div className="overflow-x-auto py-3">
                    {katexify(exercise.answer, true)}
                  </div>
                  <p className="text-muted text-sm leading-6">
                    {exercise.explanation}
                  </p>
                </AccordionItem>
              </Accordion>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}
