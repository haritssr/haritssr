import type { Metadata } from "next";

import Section from "@/components/Section";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import katexify from "@/utils/katexify";

import LinearSystemLab from "./linear-system-lab";

export const metadata: Metadata = getExperimentMetadata(
  "mathematics",
  "system-of-linear-equations-in-three-variables"
);

const workedSystem = String.raw`\begin{cases}x+y+z=6\\2x-y+z=3\\x+2y-z=2\end{cases}`;
const solutionCases = [
  {
    name: "One solution",
    equation: String.raw`(x,y,z)=(1,2,3)`,
    description:
      "Three independent constraints determine one point. Each variable has a pivot after elimination.",
  },
  {
    name: "Infinitely many solutions",
    equation: String.raw`0=0`,
    description:
      "The equations are consistent but leave at least one variable free. The common set can be a line or a plane.",
  },
  {
    name: "No solution",
    equation: String.raw`0=1`,
    description:
      "Elimination exposes a contradiction. There is no point that satisfies all three equations.",
  },
];
const exercises = [
  {
    prompt: "Solve by substitution or elimination.",
    system: String.raw`\begin{cases}x+y+z=6\\x-y=0\\z=2\end{cases}`,
    answer: String.raw`x=y=2,\qquad z=2`,
    explanation:
      "The last equation fixes the third variable. The second makes the first two equal, and the first then gives twice either of them as four.",
  },
  {
    prompt: "Find a family of solutions, not just one point.",
    system: String.raw`\begin{cases}x+y+z=4\\2x+2y+2z=8\\x-y=0\end{cases}`,
    answer: String.raw`\begin{aligned}x&=t\\y&=t\\z&=4-2t\end{aligned}\qquad t\in\mathbb{R}`,
    explanation:
      "The second equation repeats the first. The third makes the first two variables equal. Choose their common value freely and use the first equation to find the third.",
  },
  {
    prompt: "Decide whether the system is consistent.",
    system: String.raw`\begin{cases}x+y+z=4\\2x+2y+2z=9\\x-y+z=1\end{cases}`,
    answer: String.raw`R_2-2R_1:\quad0=1`,
    explanation:
      "Twice the first equation would give a right-hand side of eight, but the second says nine. That contradiction is enough to rule out every possible solution.",
  },
];

function Equation({ tex }: { tex: string }) {
  return (
    <div className="text-foreground border-border overflow-x-auto rounded-xl border px-4 py-4 text-center text-sm sm:text-base">
      {katexify(tex, true)}
    </div>
  );
}

export default function LinearEquationsThreeVariablesPage() {
  return (
    <div className="text-foreground pb-24">
      <div className="mb-10 max-w-3xl">
        <SubTitle>
          Find a triple that satisfies three equations at once. Learn
          elimination, interpret the geometry, and explore what changes when
          equations repeat or contradict one another.
        </SubTitle>
        <SourceCodeLink />
      </div>

      <section
        aria-labelledby="linear-system-basics-heading"
        className="mb-10 max-w-3xl space-y-5 text-base leading-8"
      >
        <Section
          id="linear-system-basics-heading"
          name="Three unknowns, shared constraints"
        />
        <p className="text-muted">
          A linear equation in three variables has the form below. The
          coefficients and right-hand side are real numbers; each variable
          appears only to the first power. There are no products of variables.
        </p>
        <Equation tex="ax+by+cz=d" />
        <p className="text-muted">
          A system puts several such equations together. A solution is an
          ordered triple {katexify("(x,y,z)", false)} that makes every equation
          true at the same time. In this example:
        </p>
        <Equation tex={workedSystem} />
        <p className="text-muted">
          The triple {katexify("(1,2,3)", false)} works in all three equations.
          A triple that works in only one or two equations is not a solution to
          the system.
        </p>
      </section>

      <section aria-labelledby="planes-heading" className="mb-10 space-y-5">
        <Section id="planes-heading" name="Think of intersecting planes" />
        <p className="text-muted max-w-3xl text-base leading-8">
          When at least one variable coefficient is nonzero, an equation
          describes a plane in three-dimensional space. Solving the system means
          finding the intersection shared by all three planes. Three equations
          do not automatically guarantee one solution.
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          {solutionCases.map((example) => (
            <article
              className="border-border text-foreground rounded-xl border p-5"
              key={example.name}
            >
              <h3 className="font-semibold">{example.name}</h3>
              <div className="mt-3 py-2 text-sm leading-8">
                {katexify(example.equation, false)}
              </div>
              <p className="text-muted mt-2 text-sm leading-6">
                {example.description}
              </p>
            </article>
          ))}
        </div>
        <p className="text-muted max-w-3xl text-sm leading-7">
          A zero row such as {katexify("0=0", false)} carries no new
          information; it does not by itself prove inconsistency. A row such as{" "}
          {katexify("0=1", false)} is impossible. If every equation is an
          identity, the solution set is all of three-dimensional space.
        </p>
      </section>

      <section
        aria-labelledby="elimination-heading"
        className="mb-10 max-w-3xl space-y-6 text-base leading-8"
      >
        <Section
          id="elimination-heading"
          name="Solve the example by elimination"
        />
        <p className="text-muted">
          Elimination combines equations to remove one variable, leaving a
          simpler system. Call the equations {katexify("R_1", false)},{" "}
          {katexify("R_2", false)}, and {katexify("R_3", false)} in their
          original order.
        </p>
        <article className="space-y-4">
          <h3 className="text-foreground text-lg font-semibold">
            Remove the first variable
          </h3>
          <p className="text-muted">
            Subtract twice the first equation from the second. Subtract the
            first equation from the third. The first variable disappears from
            both new equations.
          </p>
          <Equation tex={String.raw`R_2-2R_1:\quad-3y-z=-9`} />
          <Equation tex={String.raw`R_3-R_1:\quad y-2z=-4`} />
        </article>
        <article className="space-y-4">
          <h3 className="text-foreground text-lg font-semibold">
            Reduce to one variable
          </h3>
          <p className="text-muted">
            Add the first reduced equation to three times the second reduced
            equation. Their terms in {katexify("y", false)} cancel.
          </p>
          <Equation tex={String.raw`(-3y-z)+3(y-2z)=-9+3(-4)`} />
          <Equation tex={String.raw`-7z=-21\quad\Longrightarrow\quad z=3`} />
        </article>
        <article className="space-y-4">
          <h3 className="text-foreground text-lg font-semibold">
            Substitute back and check
          </h3>
          <p className="text-muted">
            Substitute into the reduced equation to find {katexify("y", false)},
            then use the original first equation to find {katexify("x", false)}.
          </p>
          <Equation tex={String.raw`y-2(3)=-4\quad\Longrightarrow\quad y=2`} />
          <Equation tex={String.raw`x+2+3=6\quad\Longrightarrow\quad x=1`} />
          <p className="text-muted">
            Check against every original equation, including any equation you
            did not use at the last step.
          </p>
          <Equation
            tex={String.raw`\begin{aligned}1+2+3&=6\\2(1)-2+3&=3\\1+2(2)-3&=2\end{aligned}`}
          />
        </article>
      </section>

      <section
        aria-labelledby="matrix-heading"
        className="mb-8 max-w-3xl space-y-5 text-base leading-8"
      >
        <Section
          id="matrix-heading"
          name="Keep the work organized with a matrix"
        />
        <p className="text-muted">
          An augmented matrix stores the coefficients in the order{" "}
          {katexify("x,y,z", false)}, with the constants after the divider.
          Include a zero wherever a variable is missing.
        </p>
        <Equation
          tex={String.raw`\left[\begin{array}{ccc|c}1&1&1&6\\2&-1&1&3\\1&2&-1&2\end{array}\right]`}
        />
        <p className="text-muted">
          You can swap two rows, multiply a row by a nonzero number, or add a
          multiple of one row to another. These operations preserve the solution
          set. Apply each operation to the entire row, including the constant.
        </p>
        <p className="text-muted">
          A pivot is the leading nonzero entry of a row after reduction.
          Gaussian elimination makes a staircase of pivots, then uses
          back-substitution. The explorer continues to reduced row-echelon form:
          each pivot is one, and its column is zero in every other row, so the
          answers can be read directly.
        </p>
      </section>

      <LinearSystemLab />

      <section
        aria-labelledby="reading-solutions-heading"
        className="mt-12 max-w-3xl space-y-5 text-base leading-8"
      >
        <Section id="reading-solutions-heading" name="Read the final rows" />
        <p className="text-muted">
          Three pivots give a unique solution. If there is no contradiction but
          fewer than three pivots, at least one variable is free. Give each free
          variable a real parameter and express the other variables in terms of
          it.
        </p>
        <Equation
          tex={String.raw`\begin{cases}x+y+z=6\\2x-y+z=3\\3x+2z=9\end{cases}`}
        />
        <p className="text-muted">
          Here the third equation is the sum of the first two, so it adds no
          independent constraint. Set {katexify("z=t", false)}. Elimination
          gives this whole family:
        </p>
        <Equation
          tex={String.raw`\begin{aligned}x&=3-\frac23t\\y&=3-\frac13t\\z&=t\end{aligned}\qquad t\in\mathbb{R}`}
        />
        <p className="text-muted">
          Choosing {katexify("t=3", false)} gives {katexify("(1,2,3)", false)}{" "}
          again, but many other choices also work. One successful triple does
          not prove a solution is unique. If the third right-hand side were{" "}
          {katexify("8", false)} instead of {katexify("9", false)}, subtracting
          the first two equations from it would give the contradiction{" "}
          {katexify("0=-1", false)}.
        </p>
      </section>

      <section
        aria-labelledby="modeling-heading"
        className="mt-12 max-w-3xl space-y-5 text-base leading-8"
      >
        <Section
          id="modeling-heading"
          name="Turn a story into three equations"
        />
        <p className="text-muted">
          A group buys six tickets for ten currency units. Adult tickets cost
          three units, student tickets two, and child tickets one. The group
          buys one more student ticket than adult ticket. Let{" "}
          {katexify("x", false)}, {katexify("y", false)}, and{" "}
          {katexify("z", false)} count adult, student, and child tickets.
        </p>
        <Equation
          tex={String.raw`\begin{aligned}x+y+z&=6&&\text{(total tickets)}\\3x+2y+z&=10&&\text{(total cost)}\\-x+y&=1&&\text{(ticket difference)}\end{aligned}`}
        />
        <p className="text-muted">
          The solution is {katexify("(x,y,z)=(1,2,3)", false)}. Check the
          counts, the cost, and the difference. Counts must also be nonnegative
          integers; the context can impose restrictions beyond the equations.
        </p>
      </section>

      <section
        aria-labelledby="linear-system-practice-heading"
        className="mt-12 space-y-5"
      >
        <Section id="linear-system-practice-heading" name="Try it yourself" />
        <p className="text-muted text-base leading-8">
          Solve or classify each system before revealing the explanation.
        </p>
        <ol className="space-y-4">
          {exercises.map((exercise, index) => (
            <li
              className="border-border text-foreground rounded-xl border p-5 sm:p-6"
              key={exercise.system}
            >
              <h3 className="font-semibold">
                {index + 1}. {exercise.prompt}
              </h3>
              <div className="overflow-x-auto py-3 text-sm sm:text-base">
                {katexify(exercise.system, true)}
              </div>
              <details className="border-border border-t pt-3">
                <summary className="focus-visible:outline-action cursor-pointer rounded-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4">
                  Show explanation
                </summary>
                <div className="overflow-x-auto py-3 text-sm sm:text-base">
                  {katexify(exercise.answer, true)}
                </div>
                <p className="text-muted text-sm leading-6">
                  {exercise.explanation}
                </p>
              </details>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
