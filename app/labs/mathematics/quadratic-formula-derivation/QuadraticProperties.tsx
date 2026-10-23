import Section from "@/components/Section";
import Table from "@/components/Table";
import katexify from "@/utils/katexify";

import QuadraticIllustration from "./QuadraticIllustration";
import type { QuadraticConcept } from "./QuadraticIllustration";

const properties = [
  {
    name: "Leading coefficient",
    illustration: "leading",
    equation: String.raw`a\ne0`,
    meaning:
      "Determines opening direction and vertical scale. Positive opens upward; negative opens downward. With the vertex held fixed, a larger absolute value makes the parabola narrower.",
  },
  {
    name: "Linear coefficient",
    illustration: "linear",
    equation: String.raw`f'(0)=b`,
    meaning:
      "Gives the tangent slope at the vertical axis. Together with the leading coefficient, it determines the horizontal position of the vertex; it is not itself a horizontal shift.",
  },
  {
    name: "Constant and vertical intercept",
    illustration: "constant",
    equation: String.raw`\begin{gathered}f(0)=c\\(0,c)\end{gathered}`,
    meaning:
      "The constant is the height where the graph meets the vertical axis. Changing only this coefficient translates the graph vertically.",
  },
  {
    name: "Discriminant",
    illustration: "discriminant",
    equation: String.raw`\Delta=b^2-4ac`,
    meaning:
      "Positive means two distinct real roots, zero means a repeated real root, and negative means two nonreal complex conjugate roots.",
  },
  {
    name: "First root",
    illustration: "firstRoot",
    equation: String.raw`r_1=\frac{-b+\sqrt{\Delta}}{2a}`,
    meaning:
      "One input that makes the function zero. This label does not necessarily identify the smaller root.",
  },
  {
    name: "Second root",
    illustration: "secondRoot",
    equation: String.raw`r_2=\frac{-b-\sqrt{\Delta}}{2a}`,
    meaning:
      "The other root, counting multiplicity. When the discriminant is zero, both root expressions give the same value.",
  },
  {
    name: "Horizontal intercepts",
    illustration: "intercepts",
    equation: String.raw`\begin{gathered}(r_1,0),\ (r_2,0)\\\Delta\ge0\end{gathered}`,
    meaning:
      "Real roots give the horizontal intercepts. A repeated root touches the axis at the vertex; distinct roots cross it. Nonreal roots are not points on the real graph.",
  },
  {
    name: "Sum of the roots",
    illustration: "sum",
    equation: String.raw`r_1+r_2=-\frac{b}{a}`,
    meaning:
      "Vieta’s first relation gives the sum without calculating either root. It also holds for complex roots.",
  },
  {
    name: "Product of the roots",
    illustration: "product",
    equation: String.raw`r_1r_2=\frac{c}{a}`,
    meaning:
      "Vieta’s second relation gives the product. For real roots, a negative product means opposite signs; a positive product means the same sign, determined by their sum. A zero product means at least one root is zero.",
  },
  {
    name: "Mean of the roots and axis of symmetry",
    illustration: "mean",
    equation: String.raw`\begin{gathered}h=\frac{r_1+r_2}{2}\\h=-\frac{b}{2a}\\x=h\end{gathered}`,
    meaning:
      "The axis passes halfway between real roots. When the roots are nonreal, their algebraic mean still gives the real axis of symmetry.",
  },
  {
    name: "Distance between real roots",
    illustration: "distance",
    equation: String.raw`\begin{gathered}|r_1-r_2|=\frac{\sqrt{\Delta}}{|a|}\\\Delta\ge0\end{gathered}`,
    meaning:
      "Measures the horizontal separation of the intercepts. Half this distance is the distance from the axis of symmetry to either real root.",
  },
  {
    name: "Vertex or turning point",
    illustration: "vertex",
    equation: String.raw`\begin{gathered}h=-\frac{b}{2a}\\k=c-\frac{b^2}{4a}\\k=-\frac{\Delta}{4a}\end{gathered}`,
    meaning:
      "The symmetric turning point is the global minimum when the graph opens upward and the global maximum when it opens downward.",
  },
  {
    name: "Vertex form",
    illustration: "vertexForm",
    equation: String.raw`f(x)=a(x-h)^2+k`,
    meaning:
      "Makes the vertex, opening direction, and vertical scale visible directly. Completing the square converts the original expression into this form.",
  },
  {
    name: "Factored form",
    illustration: "factored",
    equation: String.raw`f(x)=a(x-r_1)(x-r_2)`,
    meaning:
      "Makes the roots visible. This factorization exists over the complex numbers; it uses real linear factors only when the discriminant is nonnegative.",
  },
  {
    name: "Reflection and symmetric points",
    illustration: "reflection",
    equation: String.raw`\begin{gathered}f(h+t)=f(h-t)\\[6pt](x,y)\\\updownarrow\\(2h-x,y)\end{gathered}`,
    meaning:
      "Points equally far from the axis have the same height. Reflecting any point on the graph across the axis gives another point on the graph.",
  },
  {
    name: "Slope at any input",
    illustration: "slope",
    equation: String.raw`\begin{gathered}f'(x)=2ax+b\\f'(x)=2a(x-h)\\f'(h)=0\end{gathered}`,
    meaning:
      "The slope changes linearly and is zero at the vertex. Its sign tells whether the graph is rising or falling.",
  },
  {
    name: "Second derivative and concavity",
    illustration: "concavity",
    equation: String.raw`f''(x)=2a`,
    meaning:
      "The second derivative is constant: positive gives concave up, negative gives concave down. A quadratic has no inflection point.",
  },
  {
    name: "Increasing and decreasing intervals",
    illustration: "monotonic",
    equation: String.raw`\begin{gathered}a>0:\ \begin{cases}\searrow&x<h\\\nearrow&x>h\end{cases}\\[6pt]a<0:\ \begin{cases}\nearrow&x<h\\\searrow&x>h\end{cases}\end{gathered}`,
    meaning:
      "The vertex separates the two monotonic branches. Restricting the function to either branch makes it one-to-one.",
  },
  {
    name: "Domain and range",
    illustration: "range",
    equation: String.raw`\begin{gathered}\operatorname{dom}f=\mathbb{R}\\\operatorname{range}f=\\\begin{cases}[k,\infty)&a>0\\(-\infty,k]&a<0\end{cases}\end{gathered}`,
    meaning:
      "Every real input is allowed. The vertex height sets the lowest or highest possible output.",
  },
  {
    name: "Sign between and outside distinct real roots",
    illustration: "sign",
    equation: String.raw`\begin{gathered}\alpha=\min(r_1,r_2)\\\beta=\max(r_1,r_2)\\\Delta>0\end{gathered}`,
    meaning:
      "Outside the two roots, the function has the same sign as the leading coefficient. Between the roots, it has the opposite sign. At each root, it is zero.",
  },
  {
    name: "Sign with a repeated root or no real roots",
    illustration: "repeated",
    equation: String.raw`\begin{gathered}\Delta=0:\\f(x)=a(x-h)^2\\[6pt]\Delta<0:\\\operatorname{sgn}f(x)=\operatorname{sgn}a\end{gathered}`,
    meaning:
      "With a repeated root, the function has the leading coefficient’s sign everywhere except at the vertex, where it is zero. With no real roots, it always has that sign and never reaches zero.",
  },
  {
    name: "End behavior",
    illustration: "ends",
    equation: String.raw`\lim_{x\to\pm\infty}f(x)=\begin{cases}+\infty&a>0\\-\infty&a<0\end{cases}`,
    meaning:
      "Both ends point in the same direction because the squared term dominates for large positive or negative inputs.",
  },
] satisfies {
  name: string;
  illustration: QuadraticConcept;
  equation: string;
  meaning: string;
}[];

export default function QuadraticProperties() {
  return (
    <Section
      title="What a quadratic function tells us"
      description="The coefficients reveal the roots, symmetry, shape, and behavior of the entire parabola."
      contentClassName="space-y-5"
    >
      <div className="text-muted max-w-3xl space-y-5">
        <p>
          Consider {katexify(String.raw`f(x)=ax^2+bx+c`, false)}, with real
          coefficients and {katexify(String.raw`a\ne0`, false)}. Write the
          discriminant as {katexify(String.raw`\Delta=b^2-4ac`, false)}, the
          vertex as {katexify(String.raw`(h,k)`, false)}, and the two roots as{" "}
          {katexify(String.raw`r_1,r_2`, false)}, counting a repeated root
          twice.
        </p>
        <p>
          A root is an input where {katexify(String.raw`f(x)=0`, false)}. The
          vertex is the turning point; the axis of symmetry is the vertical line
          through it.
        </p>
        <p>
          Unless a comparison is shown, the illustrations use{" "}
          {katexify(String.raw`f(x)=x^2-4x+3`, false)}, with roots{" "}
          {katexify(String.raw`r_1=3,\ r_2=1`, false)} and vertex{" "}
          {katexify(String.raw`(2,-1)`, false)}.
        </p>
      </div>
      <Table className="block min-w-0 lg:table lg:table-fixed">
        <caption className="sr-only">
          Properties of a quadratic function with real coefficients
        </caption>
        <thead className="hidden lg:table-header-group">
          <tr className="divide-border bg-foreground/5 divide-x">
            <th className="w-[15%] px-3 text-left font-medium" scope="col">
              Property
            </th>
            <th className="w-[28%] px-3 text-left font-medium" scope="col">
              Expression
            </th>
            <th className="w-[29%] px-3 text-left font-medium" scope="col">
              What it tells us
            </th>
            <th className="w-[28%] px-3 text-left font-medium" scope="col">
              Visual intuition
            </th>
          </tr>
        </thead>
        <tbody className="divide-border block divide-y lg:table-row-group">
          {properties.map((property) => (
            <tr
              className="divide-border grid min-w-0 gap-5 p-4 sm:grid-cols-2 lg:table-row lg:divide-x lg:p-0"
              key={property.name}
            >
              <th
                className="block min-w-0 text-left align-top font-medium sm:col-span-2 lg:table-cell lg:px-3 lg:py-3"
                scope="row"
              >
                {property.name}
              </th>
              <td className="block min-w-0 align-top sm:col-start-1 sm:row-start-2 lg:table-cell lg:px-3 lg:py-3">
                <span className="text-muted mb-2 block text-xs font-medium lg:hidden">
                  Expression
                </span>
                <div className="scrollbar-subtle max-w-full overflow-x-auto [&_.katex-display]:my-0">
                  {katexify(property.equation, true)}
                </div>
              </td>
              <td className="text-muted block min-w-0 align-top sm:col-span-2 sm:row-start-3 lg:table-cell lg:px-3 lg:py-3">
                <span className="mb-2 block text-xs font-medium lg:hidden">
                  What it tells us
                </span>
                {property.meaning}
              </td>
              <td className="block min-w-0 align-top sm:col-start-2 sm:row-start-2 lg:table-cell lg:px-3 lg:py-3">
                <span className="text-muted mb-2 block text-xs font-medium lg:hidden">
                  Visual intuition
                </span>
                <QuadraticIllustration concept={property.illustration} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Section>
  );
}
