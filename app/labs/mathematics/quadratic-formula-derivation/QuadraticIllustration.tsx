import type { ReactNode } from "react";

import katexify from "@/utils/katexify";

const notes = {
  leading: [
    "Compare opening and width at the same vertex.",
    String.raw`a=1,\ 2,\ -1`,
  ],
  linear: [
    "Opposite tangent slopes at the same vertical intercept: positive for the solid curve, negative for the dashed curve.",
    String.raw`b=2,\qquad b=-2`,
  ],
  constant: [
    "Only the vertical position changes: the solid curve has the lower intercept, the dashed curve the higher one.",
    String.raw`c=1,\qquad c=3`,
  ],
  discriminant: [
    "Cross twice, touch once, or miss the horizontal axis.",
    String.raw`\begin{gathered}\Delta>0\\\Delta=0\\\Delta<0\end{gathered}`,
  ],
  firstRoot: [
    "The plus-square-root expression gives the right root in this example.",
    String.raw`r_1=3`,
  ],
  secondRoot: [
    "The minus-square-root expression gives the left root in this example.",
    String.raw`r_2=1`,
  ],
  intercepts: [
    "Both marked points have zero height.",
    String.raw`(1,0),\quad(3,0)`,
  ],
  sum: [
    "Add the two example root values as successive steps.",
    String.raw`1+3=4`,
  ],
  product: [
    "For these positive roots, their product is a rectangle’s area.",
    String.raw`1\times3=3`,
  ],
  mean: [
    "The symmetry axis lies halfway between the roots.",
    String.raw`h=\frac{1+3}{2}=2`,
  ],
  distance: [
    "The two equal halves span the distance between the roots.",
    String.raw`|3-1|=2`,
  ],
  vertex: [
    "The lowest point gives the horizontal and vertical coordinates of the vertex.",
    String.raw`(h,k)=(2,-1)`,
  ],
  vertexForm: [
    "Translate the reference parabola right, then down.",
    String.raw`\begin{gathered}x^2\\\downarrow\\(x-2)^2-1\end{gathered}`,
  ],
  factored: [
    "Either factor becoming zero places a root on the axis.",
    String.raw`(x-1)(x-3)=0`,
  ],
  reflection: [
    "Equal horizontal offsets from the axis give equal heights.",
    String.raw`f(0)=f(4)=3`,
  ],
  slope: [
    "Tangents fall, flatten, and rise as the input increases.",
    String.raw`\begin{gathered}f'(1)=-2\\f'(2)=0\\f'(3)=2\end{gathered}`,
  ],
  concavity: [
    "The solid curve bends upward; the dashed curve bends downward. Their second derivatives have opposite signs.",
    String.raw`f''>0,\qquad f''<0`,
  ],
  monotonic: [
    "Follow both branches from left to right: down to the vertex, then up.",
    String.raw`\begin{gathered}x<2:\ \searrow\\x>2:\ \nearrow\end{gathered}`,
  ],
  range: [
    "Horizontal inputs extend both ways; outputs stop at the minimum.",
    String.raw`x\in\mathbb R,\qquad f(x)\ge-1`,
  ],
  sign: [
    "An upward-opening example is positive outside its roots and negative between them.",
    String.raw`+\quad\big|_{1}\quad-\quad\big|_{3}\quad+`,
  ],
  repeated: [
    "The solid curve touches zero; the dashed curve stays strictly positive.",
    String.raw`\begin{gathered}(x-2)^2\\(x-2)^2+1\end{gathered}`,
  ],
  ends: [
    "Both ends rise together or fall together.",
    String.raw`\begin{gathered}a>0:\ \nwarrow\ \nearrow\\a<0:\ \swarrow\ \searrow\end{gathered}`,
  ],
} as const;

export type QuadraticConcept = keyof typeof notes;

type Pair = readonly [number, number];
type Coefficients = readonly [number, number, number];

const example: Coefficients = [1, -4, 3];
const xPixel = (x: number) => 24 + (x + 1) * 40;
const yPixel = (y: number) => 148 - ((y + 3) * 132) / 9;

function curvePath([a, b, c]: Coefficients, from = -1, to = 5) {
  let connected = false;
  return Array.from({ length: 121 }, (_, index) => {
    const x = from + ((to - from) * index) / 120;
    const y = a * x * x + b * x + c;
    if (y < -3 || y > 6) {
      connected = false;
      return "";
    }
    const command = connected ? "L" : "M";
    connected = true;
    return `${command}${xPixel(x).toFixed(2)},${yPixel(y).toFixed(2)}`;
  }).join(" ");
}

function Sketch({ children }: { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      className="block h-auto w-full"
      focusable="false"
      viewBox="0 0 288 180"
    >
      {children}
    </svg>
  );
}

function Label({
  x,
  y,
  tex,
  width = 88,
}: {
  x: number;
  y: number;
  tex: string;
  width?: number;
}) {
  return (
    <foreignObject height="32" width={width} x={x - width / 2} y={y}>
      <div className="text-foreground flex h-full items-center justify-center text-xs">
        {katexify(tex, false)}
      </div>
    </foreignObject>
  );
}

function Curve({
  coefficients = example,
  dashed = false,
  highlight = false,
  from,
  to,
}: {
  coefficients?: Coefficients;
  dashed?: boolean;
  highlight?: boolean;
  from?: number;
  to?: number;
}) {
  return (
    <path
      d={curvePath(coefficients, from, to)}
      fill="none"
      stroke={highlight ? "var(--color-attention)" : "var(--color-foreground)"}
      strokeDasharray={dashed ? "5 4" : undefined}
      strokeLinecap="round"
      strokeWidth={highlight ? 3 : 2}
    />
  );
}

function Plot({
  children,
  curve = true,
}: {
  children?: ReactNode;
  curve?: boolean;
}) {
  return (
    <Sketch>
      <path
        d={`M24,${yPixel(0)} H268 M${xPixel(0)},16 V152`}
        fill="none"
        stroke="var(--color-border)"
        strokeWidth="1.2"
      />
      {curve ? <Curve /> : null}
      {children}
    </Sketch>
  );
}

function Segment({
  from,
  to,
  dashed = false,
  highlight = false,
}: {
  from: Pair;
  to: Pair;
  dashed?: boolean;
  highlight?: boolean;
}) {
  return (
    <line
      stroke={highlight ? "var(--color-attention)" : "var(--color-muted)"}
      strokeDasharray={dashed ? "4 4" : undefined}
      strokeWidth={highlight ? 2.5 : 1.4}
      x1={xPixel(from[0])}
      x2={xPixel(to[0])}
      y1={yPixel(from[1])}
      y2={yPixel(to[1])}
    />
  );
}

function Dot({ at, hollow = false }: { at: Pair; hollow?: boolean }) {
  return (
    <circle
      cx={xPixel(at[0])}
      cy={yPixel(at[1])}
      fill={hollow ? "var(--color-background)" : "var(--color-attention)"}
      r="4"
      stroke="var(--color-foreground)"
      strokeWidth="1"
    />
  );
}

function Arrow({
  from,
  to,
  muted = false,
}: {
  from: Pair;
  to: Pair;
  muted?: boolean;
}) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const length = Math.hypot(dx, dy);
  const ux = dx / length;
  const uy = dy / length;
  return (
    <g
      fill="none"
      stroke={muted ? "var(--color-muted)" : "var(--color-attention)"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <line x1={from[0]} x2={to[0]} y1={from[1]} y2={to[1]} />
      <path
        d={`M${to[0] - ux * 7 - uy * 4},${to[1] - uy * 7 + ux * 4} L${to[0]},${to[1]} L${to[0] - ux * 7 + uy * 4},${to[1] - uy * 7 - ux * 4}`}
      />
    </g>
  );
}

function Roots({
  first = true,
  second = true,
}: {
  first?: boolean;
  second?: boolean;
}) {
  return (
    <>
      {first ? (
        <>
          <Dot at={[3, 0]} />
          <Label tex="r_1=3" width={64} x={xPixel(3)} y={yPixel(0) + 3} />
        </>
      ) : null}
      {second ? (
        <>
          <Dot at={[1, 0]} />
          <Label tex="r_2=1" width={64} x={xPixel(1)} y={yPixel(0) + 3} />
        </>
      ) : null}
    </>
  );
}

function Symmetry() {
  return <Segment dashed from={[2, -2.5]} to={[2, 5]} />;
}

function Tangent({ x, slope }: { x: number; slope: number }) {
  const y = x * x - 4 * x + 3;
  return (
    <Segment
      from={[x - 0.55, y - 0.55 * slope]}
      highlight
      to={[x + 0.55, y + 0.55 * slope]}
    />
  );
}

const comparisonConcepts = [
  "leading",
  "linear",
  "constant",
  "discriminant",
  "concavity",
  "ends",
  "repeated",
] as const;
type ComparisonConcept = (typeof comparisonConcepts)[number];
const comparisons: ReadonlySet<QuadraticConcept> = new Set(comparisonConcepts);

function isComparisonConcept(
  concept: QuadraticConcept
): concept is ComparisonConcept {
  return comparisons.has(concept);
}

function ComparisonDrawing({ concept }: { concept: ComparisonConcept }) {
  switch (concept) {
    case "leading": {
      return (
        <Plot curve={false}>
          <Curve coefficients={[1, -4, 4]} />
          <Curve coefficients={[2, -8, 8]} highlight />
          <Curve coefficients={[-1, 4, -4]} dashed />
          <Dot at={[2, 0]} />
          <Label tex="a=2" x={204} y={3} />
          <Label tex="a=1" x={84} y={24} />
          <Label tex="a=-1" x={204} y={140} />
        </Plot>
      );
    }
    case "linear": {
      return (
        <Plot curve={false}>
          <Curve coefficients={[1, 2, 0]} />
          <Curve coefficients={[1, -2, 0]} dashed />
          <Segment from={[-0.7, -1.4]} highlight to={[0.7, 1.4]} />
          <Segment dashed from={[-0.7, 1.4]} highlight to={[0.7, -1.4]} />
          <Dot at={[0, 0]} />
          <Label tex="b=2" x={123} y={40} />
          <Label tex="b=-2" x={130} y={130} />
        </Plot>
      );
    }
    case "constant": {
      return (
        <Plot curve={false}>
          <Curve coefficients={[1, 0, 1]} />
          <Curve coefficients={[1, 0, 3]} dashed />
          <Dot at={[0, 1]} />
          <Dot at={[0, 3]} />
          <Arrow from={[90, yPixel(1)]} to={[90, yPixel(3)]} />
          <Label tex="c=1" x={130} y={yPixel(1) - 12} />
          <Label tex="c=3" x={130} y={yPixel(3) - 25} />
        </Plot>
      );
    }
    case "discriminant": {
      return (
        <div className="space-y-2">
          {[
            { offset: -1, label: String.raw`\Delta>0`, roots: [1, 3] },
            { offset: 0, label: String.raw`\Delta=0`, roots: [2] },
            { offset: 1, label: String.raw`\Delta<0`, roots: [] },
          ].map(({ offset, label, roots }) => (
            <div key={offset}>
              <Plot curve={false}>
                <Curve coefficients={[1, -4, 4 + offset]} />
                <Label tex={label} x={224} y={130} />
                {roots.map((root) => (
                  <Dot at={[root, 0]} key={root} />
                ))}
              </Plot>
            </div>
          ))}
        </div>
      );
    }
    case "concavity":
    case "ends": {
      return (
        <Plot curve={false}>
          <Curve coefficients={[1, -4, 4]} />
          <Curve coefficients={[-1, 4, -4]} dashed />
          {concept === "ends" ? (
            <>
              <Arrow
                from={[xPixel(0.1), yPixel(3.61)]}
                to={[xPixel(-0.25), yPixel(5.06)]}
              />
              <Arrow
                from={[xPixel(3.9), yPixel(3.61)]}
                to={[xPixel(4.25), yPixel(5.06)]}
              />
              <Arrow
                from={[xPixel(0.8), yPixel(-1.44)]}
                to={[xPixel(0.4), yPixel(-2.56)]}
              />
              <Arrow
                from={[xPixel(3.2), yPixel(-1.44)]}
                to={[xPixel(3.6), yPixel(-2.56)]}
              />
            </>
          ) : (
            <>
              <Label tex="f''>0" x={226} y={13} />
              <Label tex="f''<0" x={225} y={137} />
            </>
          )}
        </Plot>
      );
    }
    case "repeated": {
      return (
        <Plot curve={false}>
          <Curve coefficients={[1, -4, 4]} />
          <Curve coefficients={[1, -4, 5]} dashed />
          <Dot at={[2, 0]} />
          <Dot at={[2, 1]} hollow />
          <Label tex="\Delta=0" x={206} y={115} />
          <Label tex="\Delta<0" x={144} y={35} />
        </Plot>
      );
    }
    default: {
      return null;
    }
  }
}

function Drawing({ concept }: { concept: QuadraticConcept }) {
  if (isComparisonConcept(concept)) {
    return <ComparisonDrawing concept={concept} />;
  }
  switch (concept) {
    case "firstRoot": {
      return (
        <Plot>
          <Roots second={false} />
          <Dot at={[1, 0]} hollow />
        </Plot>
      );
    }
    case "secondRoot": {
      return (
        <Plot>
          <Roots first={false} />
          <Dot at={[3, 0]} hollow />
        </Plot>
      );
    }
    case "intercepts": {
      return (
        <Plot>
          <Roots />
        </Plot>
      );
    }
    case "sum": {
      return (
        <Sketch>
          <line
            stroke="var(--color-border)"
            x1="28"
            x2="260"
            y1="100"
            y2="100"
          />
          {[0, 1, 2, 3, 4].map((value) => (
            <g key={value}>
              <line
                stroke="var(--color-muted)"
                x1={44 + value * 44}
                x2={44 + value * 44}
                y1="96"
                y2="104"
              />
              <Label
                tex={String(value)}
                width={30}
                x={44 + value * 44}
                y={108}
              />
            </g>
          ))}
          <Arrow from={[44, 80]} to={[88, 80]} />
          <Arrow from={[88, 52]} to={[220, 52]} />
          <Label tex="+1" x={66} y={49} width={40} />
          <Label tex="+3" x={154} y={20} width={40} />
        </Sketch>
      );
    }
    case "product": {
      return (
        <Sketch>
          <rect
            fill="var(--color-attention)"
            fillOpacity="0.12"
            height="50"
            stroke="var(--color-foreground)"
            strokeWidth="2"
            width="150"
            x="70"
            y="55"
          />
          {[120, 170].map((x) => (
            <line
              key={x}
              stroke="var(--color-border)"
              x1={x}
              x2={x}
              y1="55"
              y2="105"
            />
          ))}
          <Label tex="3" x={145} y={108} />
          <Label tex="1" width={36} x={48} y={63} />
          <Label tex="A=3" x={145} y={63} />
        </Sketch>
      );
    }
    case "mean":
    case "distance": {
      return (
        <Plot>
          <Symmetry />
          <Roots />
          <Segment from={[1, 2]} highlight to={[3, 2]} />
          {[1, 2, 3].map((x) => (
            <Segment from={[x, 1.7]} highlight key={x} to={[x, 2.3]} />
          ))}
          <Label tex="1" width={32} x={124} y={46} />
          <Label tex="1" width={32} x={164} y={46} />
          {concept === "mean" ? (
            <Label tex="h=2" width={60} x={144} y={142} />
          ) : (
            <Label tex="d=2" x={144} y={14} />
          )}
        </Plot>
      );
    }
    case "vertex": {
      return (
        <Plot>
          <Segment dashed from={[0, -1]} to={[2, -1]} />
          <Segment dashed from={[2, 0]} to={[2, -1]} />
          <Dot at={[2, -1]} />
          <Label tex="(2,-1)" x={159} y={130} />
          <Label tex="k=-1" width={60} x={35} y={120} />
        </Plot>
      );
    }
    case "vertexForm": {
      return (
        <Plot>
          <Curve coefficients={[1, 0, 0]} dashed />
          <Dot at={[0, 0]} hollow />
          <Arrow from={[xPixel(0), yPixel(0)]} to={[xPixel(2), yPixel(0)]} />
          <Arrow from={[xPixel(2), yPixel(0)]} to={[xPixel(2), yPixel(-1)]} />
          <Dot at={[2, -1]} />
          <Label tex="+2" width={40} x={104} y={72} />
          <Label tex="-1" width={40} x={173} y={105} />
        </Plot>
      );
    }
    case "factored": {
      return (
        <Plot>
          <Roots />
          <Label tex="x-1=0" width={90} x={84} y={43} />
          <Label tex="x-3=0" width={90} x={214} y={43} />
          <Segment dashed from={[1, 2]} to={[1, 0]} />
          <Segment dashed from={[3, 2]} to={[3, 0]} />
        </Plot>
      );
    }
    case "reflection": {
      return (
        <Plot>
          <Symmetry />
          <Segment from={[0, 3]} highlight to={[4, 3]} />
          <Dot at={[0, 3]} />
          <Dot at={[4, 3]} />
          <Label tex="(0,3)" x={64} y={23} />
          <Label tex="(4,3)" x={224} y={23} />
          <Label tex="x=2" width={60} x={144} y={141} />
        </Plot>
      );
    }
    case "slope": {
      return (
        <Plot>
          {[1, 2, 3].map((x) => (
            <g key={x}>
              <Tangent slope={2 * x - 4} x={x} />
              <Dot at={[x, x * x - 4 * x + 3]} />
            </g>
          ))}
          <Label tex="-2" width={40} x={80} y={68} />
          <Label tex="0" width={40} x={144} y={133} />
          <Label tex="2" width={40} x={210} y={68} />
        </Plot>
      );
    }
    case "monotonic": {
      return (
        <Plot>
          <Symmetry />
          <Arrow
            from={[xPixel(0), yPixel(3)]}
            to={[xPixel(0.6), yPixel(0.96)]}
          />
          <Arrow
            from={[xPixel(3.4), yPixel(0.96)]}
            to={[xPixel(4), yPixel(3)]}
          />
          <Dot at={[2, -1]} />
          <Label tex="x=2" x={144} y={135} />
        </Plot>
      );
    }
    case "range": {
      return (
        <Plot>
          <Segment dashed from={[-0.4, -1]} to={[4.6, -1]} />
          <Arrow from={[264, yPixel(-1)]} to={[264, 20]} />
          <Arrow from={[144, 163]} muted to={[24, 163]} />
          <Arrow from={[144, 163]} muted to={[264, 163]} />
          <Dot at={[2, -1]} />
          <Label tex="k=-1" x={224} y={115} />
        </Plot>
      );
    }
    case "sign": {
      return (
        <Plot>
          <Curve from={1} highlight to={3} />
          <Roots />
          <Label tex="+" width={30} x={60} y={17} />
          <Label tex="-" width={30} x={144} y={139} />
          <Label tex="+" width={30} x={228} y={17} />
        </Plot>
      );
    }
    default: {
      return null;
    }
  }
}

export default function QuadraticIllustration({
  concept,
}: {
  concept: QuadraticConcept;
}) {
  const [caption, expression] = notes[concept];
  return (
    <figure className="mx-auto w-full max-w-72 min-w-0 space-y-2">
      <Drawing concept={concept} />
      <figcaption className="text-muted space-y-2 text-sm">
        <p className="text-foreground text-center">
          {katexify(expression, false)}
        </p>
        <p>{caption}</p>
      </figcaption>
    </figure>
  );
}
