import Link from "next/link";

import Accordion, { AccordionItem } from "@/components/Accordion";
import Section from "@/components/Section";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import katexify from "@/utils/katexify";

import UnitCircleLab from "./unit-circle-lab";

export const metadata = getExperimentMetadata(
  "mathematics",
  "euler-s-identity"
);

function Equation({ tex }: { tex: string }) {
  return (
    <div className="border-border overflow-x-auto rounded-xl border px-4 py-3">
      {katexify(tex, true)}
    </div>
  );
}

export default function EulerIdentityPage() {
  return (
    <div className="text-foreground space-y-20 pb-24">
      <div className="max-w-3xl space-y-5">
        <SubTitle>
          Growth, circles, and imaginary numbers meet in one equation.
          Understand what each constant means, explore complex exponentials as
          rotation, and see why Euler’s identity follows from a half-turn.
        </SubTitle>
        <SourceCodeLink />
        <div className="border-action/30 rounded-2xl border px-5 py-6 text-xl sm:text-2xl">
          {katexify(String.raw`e^{i\pi}+1=0`, true)}
        </div>
        <p className="text-muted leading-8">
          The connection is Euler’s formula: raising {katexify("e", false)} to a
          purely imaginary exponent describes a point moving around a circle. At
          an angle of {katexify(String.raw`\pi`, false)} radians, that point
          reaches {katexify("-1", false)}.
        </p>
      </div>

      <Section
        title="Meet the three constants"
        id="constants-heading"
        contentClassName="grid gap-4 md:grid-cols-3"
      >
        <article className="border-border min-w-0 space-y-4 rounded-xl border p-5">
          <h3 className="text-lg font-semibold">Euler’s number</h3>
          <Equation tex={String.raw`e\approx2.71828`} />
          <p className="text-muted text-sm leading-7">
            The natural base for continuous growth. If interest at a total rate
            of one per period is compounded more and more frequently, the growth
            factor approaches {katexify("e", false)}.
          </p>
          <Equation
            tex={String.raw`e=\lim_{n\to\infty}\left(1+\frac1n\right)^n`}
          />
        </article>
        <article className="border-border min-w-0 space-y-4 rounded-xl border p-5">
          <h3 className="text-lg font-semibold">The circle constant</h3>
          <Equation tex={String.raw`\pi\approx3.14159`} />
          <p className="text-muted text-sm leading-7">
            A circle’s circumference divided by its diameter. Radians measure an
            angle as arc length divided by radius, so a half-turn is{" "}
            {katexify(String.raw`\pi`, false)} radians.
          </p>
          <Equation tex={String.raw`C=2\pi r,\qquad \theta=\frac{s}{r}`} />
        </article>
        <article className="border-border min-w-0 space-y-4 rounded-xl border p-5">
          <h3 className="text-lg font-semibold">The imaginary unit</h3>
          <Equation tex={String.raw`i^2=-1`} />
          <p className="text-muted text-sm leading-7">
            A complex number has a real part and an imaginary part. Plotting
            them on perpendicular axes gives the complex plane. Multiplying by{" "}
            {katexify("i", false)} makes a counterclockwise quarter-turn.
          </p>
          <Equation tex={String.raw`i(a+bi)=-b+ai`} />
        </article>
      </Section>

      <Section
        className="max-w-3xl"
        title="Euler’s formula connects them"
        id="formula-heading"
      >
        <Equation
          tex={String.raw`e^{i\theta}=\cos\theta+i\sin\theta\qquad(\theta\in\mathbb R)`}
        />
        <p className="text-muted">
          Here {katexify(String.raw`\theta`, false)} is a real angle measured in
          radians. The real part is {katexify(String.raw`\cos\theta`, false)};
          the imaginary part is {katexify(String.raw`\sin\theta`, false)}.
          Together they locate a point on the unit circle, centered at the
          origin with radius {katexify("1", false)}.
        </p>
        <Equation
          tex={String.raw`\left|e^{i\theta}\right|=\sqrt{\cos^2\theta+\sin^2\theta}=1`}
        />
        <p className="text-muted">
          Start at {katexify("1", false)} on the positive real axis. As the
          angle increases, the point moves counterclockwise. A real exponent
          controls growth; a purely imaginary exponent controls rotation. More
          generally, a complex exponent can do both:
        </p>
        <Equation
          tex={String.raw`e^{a+ib}=e^a(\cos b+i\sin b)\qquad(a,b\in\mathbb R)`}
        />
        <p className="text-muted">
          The factor {katexify("e^a", false)} sets the distance from the origin,
          while {katexify("b", false)} sets the angle in radians.
        </p>
      </Section>

      <UnitCircleLab />

      <Section
        className="max-w-3xl"
        title="A half-turn gives Euler’s identity"
        id="identity-heading"
        description={
          <>
            Substitute {katexify(String.raw`\theta=\pi`, false)} into Euler’s
            formula. On the unit circle, a half-turn lands on the negative real
            axis: its real coordinate is {katexify("-1", false)} and its
            imaginary coordinate is {katexify("0", false)}.
          </>
        }
      >
        <ol className="space-y-4">
          <li>
            <p className="mb-2 font-medium">Substitute the half-turn angle</p>
            <Equation tex={String.raw`e^{i\pi}=\cos\pi+i\sin\pi`} />
          </li>
          <li>
            <p className="mb-2 font-medium">Use the circle coordinates</p>
            <Equation tex={String.raw`e^{i\pi}=-1+i\cdot0=-1`} />
          </li>
          <li>
            <p className="mb-2 font-medium">Add one to both sides</p>
            <Equation tex={String.raw`e^{i\pi}+1=0`} />
          </li>
        </ol>
        <p className="text-muted">
          Euler’s formula describes every real angle. Euler’s identity is its
          special half-turn case, bringing the five constants{" "}
          {katexify(String.raw`e,\pi,i,1,0`, false)} into a single equation.
        </p>
      </Section>

      <Section
        className="max-w-3xl"
        title="Why an exponential becomes a circle"
        id="proof-heading"
        description={
          <>
            The picture illustrates the formula, but the power series explain
            why it is true. The exponential extends to complex inputs using the
            same series as for real inputs. All three series below converge
            absolutely for every complex input, so we can group their terms.
          </>
        }
      >
        <Accordion>
          <AccordionItem
            panelClassName="bg-transparent"
            title="Follow the power series derivation"
            value="power-series-derivation"
          >
            <div className="space-y-5">
              <p className="text-muted">
                Start with the exponential, cosine, and sine series.
              </p>
              <Equation
                tex={String.raw`e^z=1+z+\frac{z^2}{2!}+\frac{z^3}{3!}+\cdots`}
              />
              <Equation
                tex={String.raw`\cos\theta=1-\frac{\theta^2}{2!}+\frac{\theta^4}{4!}-\cdots`}
              />
              <Equation
                tex={String.raw`\sin\theta=\theta-\frac{\theta^3}{3!}+\frac{\theta^5}{5!}-\cdots`}
              />
              <p className="text-muted">
                Substitute {katexify(String.raw`z=i\theta`, false)}. Powers of
                the imaginary unit repeat in a cycle, separating even powers
                from odd powers.
              </p>
              <Equation
                tex={String.raw`i^0=1,\quad i^1=i,\quad i^2=-1,\quad i^3=-i,\quad i^4=1`}
              />
              <Equation
                tex={String.raw`e^{i\theta}=1+i\theta-\frac{\theta^2}{2!}-i\frac{\theta^3}{3!}+\frac{\theta^4}{4!}+i\frac{\theta^5}{5!}-\cdots`}
              />
              <p className="text-muted">
                Group the real and imaginary terms. The real terms are exactly
                the cosine series, and the coefficient of the imaginary unit is
                exactly the sine series.
              </p>
              <Equation
                tex={String.raw`e^{i\theta}=\left(1-\frac{\theta^2}{2!}+\frac{\theta^4}{4!}-\cdots\right)+i\left(\theta-\frac{\theta^3}{3!}+\frac{\theta^5}{5!}-\cdots\right)`}
              />
              <Equation tex={String.raw`e^{i\theta}=\cos\theta+i\sin\theta`} />
            </div>
          </AccordionItem>
        </Accordion>
      </Section>

      <Section
        className="max-w-3xl"
        title="What to remember"
        id="takeaways-heading"
      >
        <ul className="text-muted list-disc space-y-3 pl-5">
          <li>
            The exponent is the product {katexify(String.raw`i\pi`, false)}.
            Complex exponentiation is defined through an extension such as the
            power series above.
          </li>
          <li>
            Use radians in Euler’s formula. A half-turn is{" "}
            {katexify(String.raw`180^\circ=\pi\ \text{radians}`, false)}.
          </li>
          <li>
            The identity is exact. A calculator may show a tiny imaginary
            remainder because it uses finite numerical approximations.
          </li>
        </ul>
        <p className="text-muted">
          Complex exponentials are useful for waves, oscillations, and signals.
          Their exponent law turns multiplication into addition of angles:
          rotating by one angle and then another adds the two rotations.
        </p>
        <Equation tex={String.raw`e^{i\alpha}e^{i\beta}=e^{i(\alpha+\beta)}`} />
        <p className="text-muted">
          Continue with{" "}
          <Link
            className="text-action underline underline-offset-4"
            href="/experiments/mathematics/logarithms"
          >
            logarithms
          </Link>{" "}
          to explore the inverse of exponential growth, or review{" "}
          <Link
            className="text-action underline underline-offset-4"
            href="/experiments/mathematics/number-systems"
          >
            number systems
          </Link>{" "}
          for the bigger picture of real and complex numbers.
        </p>
      </Section>
    </div>
  );
}
