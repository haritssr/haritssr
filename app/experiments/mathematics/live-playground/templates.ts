const TEMPLATE_GROUPS = [
  {
    label: "Algebra",
    templates: [
      { label: "Fraction", tex: String.raw`\frac{a+b}{c+d}` },
      {
        label: "Quadratic formula",
        tex: String.raw`x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}`,
      },
      {
        label: "Aligned equations",
        tex: String.raw`\begin{aligned}y &= mx+b \\ f(x) &= x^2+2x+1\end{aligned}`,
      },
    ],
  },
  {
    label: "Calculus",
    templates: [
      {
        label: "Summation",
        tex: String.raw`\sum_{k=1}^n k = \frac{n(n+1)}{2}`,
      },
      {
        label: "Definite integral",
        tex: String.raw`\int_0^1 x^2\,dx = \frac{1}{3}`,
      },
      {
        label: "Limit",
        tex: String.raw`\lim_{x \to 0} \frac{\sin x}{x} = 1`,
      },
    ],
  },
  {
    label: "Structures",
    templates: [
      {
        label: "Piecewise function",
        tex: String.raw`f(x) = \begin{cases} x^2 & x \ge 0 \\ -x & x < 0 \end{cases}`,
      },
      {
        label: "Matrix",
        tex: String.raw`A = \begin{bmatrix}1 & 2 \\ 3 & 4\end{bmatrix}`,
      },
    ],
  },
] as const;

export const DEFAULT_TEX = TEMPLATE_GROUPS[0].templates[0].tex;
export const TEMPLATES = TEMPLATE_GROUPS.flatMap((group) =>
  group.templates.map((template) => ({
    label: `${group.label} · ${template.label}`,
    value: template.tex,
  }))
);
