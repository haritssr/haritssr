import type { Metadata } from "next";

import Accordion, { AccordionItem } from "@/components/Accordion";
import Section from "@/components/Section";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import katexify from "@/utils/katexify";

import LinearSystemLab from "./linear-system-lab";

export const metadata: Metadata = getExperimentMetadata("mathematics", "spltv");

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
    steps: [
      {
        title: "Read the known variable",
        explanation: "The third equation already gives one variable directly.",
        equation: String.raw`z=2`,
      },
      {
        title: "Relate the remaining variables",
        explanation:
          "Rearrange the second equation to express one variable in terms of the other.",
        equation: String.raw`x-y=0\quad\Longrightarrow\quad x=y`,
      },
      {
        title: "Substitute into the first equation",
        explanation:
          "Use both results in the first equation, then solve and substitute back.",
        equation: String.raw`\begin{aligned}y+y+2&=6\\2y&=4\\y&=2\\x&=2\end{aligned}`,
      },
      {
        title: "Check all three equations",
        explanation:
          "The values satisfy every original equation, so this is the unique solution.",
        equation: String.raw`\begin{aligned}2+2+2&=6\\2-2&=0\\z&=2\end{aligned}`,
      },
    ],
  },
  {
    prompt: "Find a family of solutions, not just one point.",
    system: String.raw`\begin{cases}x+y+z=4\\2x+2y+2z=8\\x-y=0\end{cases}`,
    answer: String.raw`\begin{aligned}x&=t\\y&=t\\z&=4-2t\end{aligned}\qquad t\in\mathbb{R}`,
    steps: [
      {
        title: "Remove the repeated equation",
        explanation:
          "The second equation is twice the first, so subtracting twice the first leaves an identity and adds no constraint.",
        equation: String.raw`R_2-2R_1:\quad 0=8-2(4)=0`,
      },
      {
        title: "Choose a free parameter",
        explanation:
          "The third equation makes the first two variables equal. Their common value can be any real number.",
        equation: String.raw`x-y=0\quad\Longrightarrow\quad x=y=t,\qquad t\in\mathbb{R}`,
      },
      {
        title: "Find the remaining variable",
        explanation:
          "Substitute the parameter into the first equation and rearrange.",
        equation: String.raw`t+t+z=4\quad\Longrightarrow\quad z=4-2t`,
      },
      {
        title: "Check the whole family",
        explanation:
          "Every real parameter value satisfies all three equations, giving infinitely many solutions.",
        equation: String.raw`\begin{aligned}t+t+(4-2t)&=4\\2t+2t+2(4-2t)&=8\\t-t&=0\end{aligned}`,
      },
    ],
  },
  {
    prompt: "Decide whether the system is consistent.",
    system: String.raw`\begin{cases}x+y+z=4\\2x+2y+2z=9\\x-y+z=1\end{cases}`,
    answer: String.raw`\text{Solution set: }\varnothing`,
    steps: [
      {
        title: "Double the first equation",
        explanation:
          "Match the coefficients in the second equation by multiplying the entire first equation by two.",
        equation: String.raw`2R_1:\quad 2x+2y+2z=8`,
      },
      {
        title: "Subtract from the second equation",
        explanation: "All variable terms cancel, but the constants differ.",
        equation: String.raw`R_2-2R_1:\quad 0=9-8=1`,
      },
      {
        title: "Interpret the contradiction",
        explanation:
          "Zero cannot equal one. No triple can satisfy the first two equations together, so the third equation cannot make the system consistent. There is no solution.",
        equation: String.raw`0\ne 1`,
      },
    ],
  },
];

function Equation({ tex }: { tex: string }) {
  return (
    <div className="text-foreground border-border min-w-0 overflow-x-auto rounded-xl border px-4 py-4 text-center text-sm sm:text-base">
      {katexify(tex, true)}
    </div>
  );
}

export default function LinearEquationsThreeVariablesPage() {
  return (
    <div className="text-foreground w-full min-w-0 space-y-20 pb-24">
      <div className="max-w-3xl">
        <SubTitle>
          Find a triple that satisfies three equations at once. Learn
          elimination, interpret the geometry, and explore what changes when
          equations repeat or contradict one another.
        </SubTitle>
        <SourceCodeLink />
      </div>

      <Section
        className="max-w-3xl text-base"
        title="Three unknowns, shared constraints"
        id="linear-system-basics-heading"
        description={
          <>
            A linear equation in three variables has the form below. The
            coefficients and right-hand side are real numbers; each variable
            appears only to the first power. There are no products of variables.
          </>
        }
      >
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
      </Section>

      <Section
        title="Think of intersecting planes"
        id="planes-heading"
        description={
          <>
            When at least one variable coefficient is nonzero, an equation
            describes a plane in three-dimensional space. Solving the system
            means finding the intersection shared by all three planes. Three
            equations do not automatically guarantee one solution.
          </>
        }
      >
        <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
          {solutionCases.map((example) => (
            <article
              className="border-border text-foreground min-w-0 rounded-xl border p-5"
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
      </Section>

      <Section
        className="max-w-3xl text-base"
        title="Solve the example by elimination"
        id="elimination-heading"
        description={
          <>
            Elimination combines equations to remove one variable, leaving a
            simpler system. Call the equations {katexify("R_1", false)},{" "}
            {katexify("R_2", false)}, and {katexify("R_3", false)} in their
            original order.
          </>
        }
        contentClassName="space-y-6"
      >
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
      </Section>

      <Section
        className="max-w-3xl text-base"
        title="Keep the work organized with a matrix"
        id="matrix-heading"
        description={
          <>
            An augmented matrix stores the coefficients in the order{" "}
            {katexify("x,y,z", false)}, with the constants after the divider.
            Include a zero wherever a variable is missing.
          </>
        }
      >
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
      </Section>

      <LinearSystemLab />

      <Section
        className="max-w-3xl text-base"
        title="Read the final rows"
        id="reading-solutions-heading"
        description={
          <>
            Three pivots give a unique solution. If there is no contradiction
            but fewer than three pivots, at least one variable is free. Give
            each free variable a real parameter and express the other variables
            in terms of it.
          </>
        }
      >
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
      </Section>

      <Section
        className="max-w-3xl text-base"
        title="Turn a story into three equations"
        id="modeling-heading"
        description={
          <>
            A group buys six tickets for ten currency units. Adult tickets cost
            three units, student tickets two, and child tickets one. The group
            buys one more student ticket than adult ticket. Let{" "}
            {katexify("x", false)}, {katexify("y", false)}, and{" "}
            {katexify("z", false)} count adult, student, and child tickets.
          </>
        }
      >
        <Equation
          tex={String.raw`\begin{aligned}x+y+z&=6&&\text{(total tickets)}\\3x+2y+z&=10&&\text{(total cost)}\\-x+y&=1&&\text{(ticket difference)}\end{aligned}`}
        />
        <p className="text-muted">
          The solution is {katexify("(x,y,z)=(1,2,3)", false)}. Check the
          counts, the cost, and the difference. Counts must also be nonnegative
          integers; the context can impose restrictions beyond the equations.
        </p>
      </Section>

      <Section
        title="Try it yourself"
        id="linear-system-practice-heading"
        description={
          <>
            Solve or classify each system before revealing the step-by-step
            solution.
          </>
        }
      >
        <ul className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
          {exercises.map((exercise, index) => (
            <li
              className="border-border text-foreground min-w-0 rounded-xl border p-5 sm:p-6"
              key={exercise.system}
            >
              <h3 className="font-semibold">{exercise.prompt}</h3>
              <div className="overflow-x-auto py-3 text-sm sm:text-base">
                {katexify(exercise.system, true)}
              </div>
              <Accordion>
                <AccordionItem
                  panelClassName="bg-transparent"
                  title="Show step-by-step solution"
                  value={`exercise-${index + 1}-solution`}
                >
                  <ol className="list-decimal space-y-5 pl-5">
                    {exercise.steps.map((step) => (
                      <li className="pl-1" key={step.title}>
                        <h4 className="text-foreground font-semibold">
                          {step.title}
                        </h4>
                        <p className="text-muted mt-1 leading-6">
                          {step.explanation}
                        </p>
                        <div className="overflow-x-auto py-3 text-sm sm:text-base">
                          {katexify(step.equation, true)}
                        </div>
                      </li>
                    ))}
                  </ol>
                  <div className="border-border border-t pt-3">
                    <p className="text-foreground font-semibold">Answer</p>
                    <div className="overflow-x-auto py-3 text-sm sm:text-base">
                      {katexify(exercise.answer, true)}
                    </div>
                  </div>
                </AccordionItem>
              </Accordion>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
