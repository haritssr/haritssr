const COLORS = {
  rose: "#e11d48",
  teal: "#0f766e",
  sky: "#0369a1",
  violet: "#7c3aed",
  pink: "#be185d",
  lime: "#4d7c0f",
  orange: "#c2410c",
  amber: "#a16207",
  blue: "#2563eb",
} as const;

// Scalar and vector forms share a color throughout the page.
const SYMBOL_COLORS: Readonly<Record<string, string>> = {
  F: COLORS.rose,
  m: COLORS.violet,
  a: COLORS.blue,
  p: COLORS.teal,
  K: COLORS.pink,
  v: COLORS.sky,
  W: COLORS.orange,
  G: COLORS.amber,
  r: COLORS.lime,
  x: COLORS.sky,
  t: COLORS.blue,
  f: COLORS.violet,
  n: COLORS.teal,
  q: COLORS.orange,
  E: COLORS.rose,
  B: COLORS.teal,
  S: COLORS.lime,
  A: COLORS.sky,
  C: COLORS.lime,
  I: COLORS.orange,
  V: COLORS.violet,
  R: COLORS.teal,
  P: COLORS.pink,
  T: COLORS.sky,
  U: COLORS.rose,
  Q: COLORS.orange,
  k: COLORS.blue,
  c: COLORS.sky,
  g: COLORS.blue,
  h: COLORS.amber,
  i: COLORS.rose,
  "\\omega": COLORS.orange,
  "\\lambda": COLORS.lime,
  "\\theta": COLORS.orange,
  "\\tau": COLORS.blue,
  "\\mu": COLORS.violet,
  "\\nu": COLORS.blue,
  "\\varepsilon": COLORS.amber,
  "\\Phi": COLORS.pink,
  "\\Omega": COLORS.pink,
  "\\Lambda": COLORS.orange,
  "\\hbar": COLORS.amber,
  "\\psi": COLORS.violet,
  "\\pi": COLORS.amber,
  "\\ell": COLORS.sky,
  "\\mathcal{R}": COLORS.lime,
  "\\oint": COLORS.rose,
  "\\oiint": COLORS.rose,
  "\\int": COLORS.rose,
  "\\sum": COLORS.rose,
};

// Keep commands and upright labels atomic; allow a nested group in subscripts.
const TEX_SYMBOL =
  /(?<atom>d?\\(?:mathbf|boldsymbol|mathcal|mathrm)\{[^{}]*\}|\\[A-Za-z]+|[A-Za-z])(?<subscript>_(?:\{(?:[^{}]|\{[^{}]*\})*\}|[A-Za-z0-9]))?/gu;
const VECTOR_SYMBOL = /^d?\\(?:mathbf|boldsymbol)\{(?<symbol>[^{}]+)\}$/u;
const INTEGRATION_OR_SUM = /^\\(?:oint|oiint|int|sum)$/u;

export function colorPhysicsSymbols(expression: string): string {
  return expression.replace(
    TEX_SYMBOL,
    (match: string, atom: string, subscript: string | undefined) => {
      const symbol = VECTOR_SYMBOL.exec(atom)?.groups?.symbol ?? atom;
      const color = SYMBOL_COLORS[symbol];
      if (color === undefined) {
        return match;
      }

      // Integration boundaries and summation indices have their own colors.
      if (INTEGRATION_OR_SUM.test(atom)) {
        const bound = subscript?.slice(1);
        const contents =
          bound?.startsWith("{") === true ? bound.slice(1, -1) : bound;
        const coloredBound =
          contents === undefined ? "" : `_{${colorPhysicsSymbols(contents)}}`;
        return `\\textcolor{${color}}{${atom}${coloredBound}}`;
      }
      return `\\textcolor{${color}}{${match}}`;
    }
  );
}
