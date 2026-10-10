interface Branch {
  condition: string;
  evaluate: (x: number) => number;
  expression: string;
  lower: number;
  upper: number;
  includeLower?: boolean;
  includeUpper?: boolean;
}

interface PiecewiseFunction {
  branches: readonly Branch[];
  label: string;
  tex?: string;
  value: string;
}

const { NEGATIVE_INFINITY } = Number;
const { POSITIVE_INFINITY } = Number;
const identity = (x: number) => x;
const zero = () => 0;
const square = (x: number) => x * x;

export const PIECEWISE_FUNCTIONS: readonly PiecewiseFunction[] = [
  {
    value: "absolute",
    label: "Absolute value",
    branches: [
      {
        expression: "-x",
        condition: "x<0",
        lower: NEGATIVE_INFINITY,
        upper: 0,
        evaluate: (x) => -x,
      },
      {
        expression: "x",
        condition: String.raw`x\ge 0`,
        lower: 0,
        upper: POSITIVE_INFINITY,
        evaluate: identity,
      },
    ],
  },
  {
    value: "relu",
    label: "ReLU",
    branches: [
      {
        expression: "0",
        condition: "x<0",
        lower: NEGATIVE_INFINITY,
        upper: 0,
        evaluate: zero,
      },
      {
        expression: "x",
        condition: String.raw`x\ge 0`,
        lower: 0,
        upper: POSITIVE_INFINITY,
        evaluate: identity,
      },
    ],
  },
  {
    value: "sign",
    label: "Sign function",
    branches: [
      {
        expression: "-1",
        condition: "x<0",
        lower: NEGATIVE_INFINITY,
        upper: 0,
        evaluate: () => -1,
      },
      {
        expression: "0",
        condition: "x=0",
        lower: 0,
        upper: 0,
        includeUpper: true,
        evaluate: zero,
      },
      {
        expression: "1",
        condition: "x>0",
        lower: 0,
        upper: POSITIVE_INFINITY,
        includeLower: false,
        evaluate: () => 1,
      },
    ],
  },
  {
    value: "heaviside",
    label: "Heaviside step",
    branches: [
      {
        expression: "0",
        condition: "x<0",
        lower: NEGATIVE_INFINITY,
        upper: 0,
        evaluate: zero,
      },
      {
        expression: "1",
        condition: String.raw`x\ge 0`,
        lower: 0,
        upper: POSITIVE_INFINITY,
        evaluate: () => 1,
      },
    ],
  },
  {
    value: "leaky-relu",
    label: "Leaky ReLU",
    branches: [
      {
        expression: "0.1x",
        condition: "x<0",
        lower: NEGATIVE_INFINITY,
        upper: 0,
        evaluate: (x) => x / 10,
      },
      {
        expression: "x",
        condition: String.raw`x\ge 0`,
        lower: 0,
        upper: POSITIVE_INFINITY,
        evaluate: identity,
      },
    ],
  },
  {
    value: "clamp",
    label: "Clipped linear function",
    branches: [
      {
        expression: "-1",
        condition: "x<-1",
        lower: NEGATIVE_INFINITY,
        upper: -1,
        evaluate: () => -1,
      },
      {
        expression: "x",
        condition: String.raw`-1\le x\le 1`,
        lower: -1,
        upper: 1,
        includeUpper: true,
        evaluate: identity,
      },
      {
        expression: "1",
        condition: "x>1",
        lower: 1,
        upper: POSITIVE_INFINITY,
        includeLower: false,
        evaluate: () => 1,
      },
    ],
  },
  {
    value: "triangular-pulse",
    label: "Triangular pulse",
    branches: [
      {
        expression: "0",
        condition: "x<-1",
        lower: NEGATIVE_INFINITY,
        upper: -1,
        evaluate: zero,
      },
      {
        expression: "x+1",
        condition: String.raw`-1\le x<0`,
        lower: -1,
        upper: 0,
        evaluate: (x) => x + 1,
      },
      {
        expression: "1-x",
        condition: String.raw`0\le x\le 1`,
        lower: 0,
        upper: 1,
        includeUpper: true,
        evaluate: (x) => 1 - x,
      },
      {
        expression: "0",
        condition: "x>1",
        lower: 1,
        upper: POSITIVE_INFINITY,
        includeLower: false,
        evaluate: zero,
      },
    ],
  },
  {
    value: "rectangular-pulse",
    label: "Rectangular pulse",
    branches: [
      {
        expression: "0",
        condition: "x<-1",
        lower: NEGATIVE_INFINITY,
        upper: -1,
        evaluate: zero,
      },
      {
        expression: "1",
        condition: String.raw`-1\le x\le 1`,
        lower: -1,
        upper: 1,
        includeUpper: true,
        evaluate: () => 1,
      },
      {
        expression: "0",
        condition: "x>1",
        lower: 1,
        upper: POSITIVE_INFINITY,
        includeLower: false,
        evaluate: zero,
      },
    ],
  },
  {
    value: "dead-zone",
    label: "Dead-zone function",
    branches: [
      {
        expression: "x+1",
        condition: "x<-1",
        lower: NEGATIVE_INFINITY,
        upper: -1,
        evaluate: (x) => x + 1,
      },
      {
        expression: "0",
        condition: String.raw`-1\le x\le 1`,
        lower: -1,
        upper: 1,
        includeUpper: true,
        evaluate: zero,
      },
      {
        expression: "x-1",
        condition: "x>1",
        lower: 1,
        upper: POSITIVE_INFINITY,
        includeLower: false,
        evaluate: (x) => x - 1,
      },
    ],
  },
  {
    value: "huber-loss",
    label: "Huber loss",
    branches: [
      {
        expression: String.raw`-x-\frac{1}{2}`,
        condition: "x<-1",
        lower: NEGATIVE_INFINITY,
        upper: -1,
        evaluate: (x) => -x - 0.5,
      },
      {
        expression: String.raw`\frac{x^2}{2}`,
        condition: String.raw`-1\le x\le 1`,
        lower: -1,
        upper: 1,
        includeUpper: true,
        evaluate: (x) => square(x) / 2,
      },
      {
        expression: String.raw`x-\frac{1}{2}`,
        condition: "x>1",
        lower: 1,
        upper: POSITIVE_INFINITY,
        includeLower: false,
        evaluate: (x) => x - 0.5,
      },
    ],
  },
  {
    value: "quadratic-linear",
    label: "Quadratic / linear function",
    branches: [
      {
        expression: "x^2",
        condition: "x<0",
        lower: NEGATIVE_INFINITY,
        upper: 0,
        evaluate: square,
      },
      {
        expression: "x",
        condition: String.raw`x\ge 0`,
        lower: 0,
        upper: POSITIVE_INFINITY,
        evaluate: identity,
      },
    ],
  },
  {
    value: "floor",
    label: "Floor function",
    tex: String.raw`f(x)=\lfloor x\rfloor=\begin{cases}n & n\le x<n+1,\quad n\in\mathbb{Z}\end{cases}`,
    branches: Array.from({ length: 7 }, (_, index) => {
      const n = index - 3;
      return {
        expression: String(n),
        condition: `${n}\\le x<${n + 1}`,
        lower: n,
        upper: n + 1,
        evaluate: () => n,
      };
    }),
  },
  {
    value: "fractional-part",
    label: "Fractional part / sawtooth",
    tex: String.raw`f(x)=x-\lfloor x\rfloor=\begin{cases}x-n & n\le x<n+1,\quad n\in\mathbb{Z}\end{cases}`,
    branches: Array.from({ length: 7 }, (_, index) => {
      const n = index - 3;
      return {
        expression: `x-(${n})`,
        condition: `${n}\\le x<${n + 1}`,
        lower: n,
        upper: n + 1,
        evaluate: (x: number) => x - n,
      };
    }),
  },
];

export function evaluateFunction(definition: PiecewiseFunction, x: number) {
  const active = definition.branches.find(
    (branch) =>
      (branch.includeLower === false ? x > branch.lower : x >= branch.lower) &&
      (branch.includeUpper === true ? x <= branch.upper : x < branch.upper)
  );
  if (!active) {
    throw new RangeError("Input is outside the example's domain.");
  }
  return {
    tex:
      definition.tex ??
      String.raw`f(x)=\begin{cases}${definition.branches.map((branch) => `${branch.expression} & ${branch.condition}`).join(String.raw` \\ `)}\end{cases}`,
    branch: `${active.condition}:\\quad f(x)=${active.expression}`,
    result: active.evaluate(x),
  };
}

export function getFunctionGraph(definition: PiecewiseFunction) {
  const endpoints = new Map<
    string,
    { x: number; y: number; included: boolean }
  >();
  const segments = definition.branches.flatMap((branch) => {
    const start = Math.max(-3, branch.lower);
    const end = Math.min(3, branch.upper);
    if (start > end) {
      return [];
    }
    for (const [input, included] of [
      [branch.lower, branch.includeLower !== false],
      [branch.upper, branch.includeUpper === true],
    ] as const) {
      if (input >= -3 && input <= 3) {
        const y = branch.evaluate(input);
        const key = `${input}:${y}`;
        endpoints.set(key, {
          x: input,
          y,
          included: included || endpoints.get(key)?.included === true,
        });
      }
    }
    if (start === end) {
      return [];
    }
    return [
      Array.from({ length: 65 }, (_, index) => {
        const x = start + ((end - start) * index) / 64;
        return { x, y: branch.evaluate(x) };
      }),
    ];
  });
  const points = [...endpoints.values()];
  const maximum = Math.max(
    3,
    ...segments.flatMap((segment) => segment.map((point) => Math.abs(point.y))),
    ...points.map((point) => Math.abs(point.y))
  );
  const extent = maximum > 3 ? Math.ceil(maximum / 2) * 2 : 3;
  return {
    endpoints: points,
    extent,
    segments,
    ticks:
      extent === 3
        ? [-3, -2, -1, 0, 1, 2, 3]
        : [-extent, -extent / 2, 0, extent / 2, extent],
  };
}
