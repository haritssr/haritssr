export interface Interval {
  lower: number;
  upper: number;
  includeLower: boolean;
  includeUpper: boolean;
  unboundedLower: boolean;
  unboundedUpper: boolean;
}

function intervalInequality(interval: Interval, singleton: boolean) {
  const {
    lower,
    upper,
    includeLower,
    includeUpper,
    unboundedLower,
    unboundedUpper,
  } = interval;
  if (unboundedLower && unboundedUpper) {
    return String.raw`x\in\mathbb{R}`;
  }
  if (unboundedLower) {
    return `x${includeUpper ? String.raw`\le ` : "<"}${upper}`;
  }
  if (unboundedUpper) {
    return `x${includeLower ? String.raw`\ge ` : ">"}${lower}`;
  }
  if (singleton) {
    return `x=${lower}`;
  }
  return `${lower}${includeLower ? String.raw`\le ` : "<"}x${includeUpper ? String.raw`\le ` : "<"}${upper}`;
}

export function intervalDetails(interval: Interval) {
  const {
    lower,
    upper,
    includeLower,
    includeUpper,
    unboundedLower,
    unboundedUpper,
  } = interval;
  const bounded = !(unboundedLower || unboundedUpper);
  const empty =
    bounded &&
    (lower > upper || (lower === upper && !(includeLower && includeUpper)));
  const singleton = bounded && lower === upper && !empty;

  if (empty) {
    return {
      empty,
      singleton,
      notation: String.raw`\varnothing`,
      inequality: String.raw`\text{No solution}`,
      description: "Empty set: no points are included on the number line.",
    };
  }

  const leftBracket = !unboundedLower && includeLower ? "[" : "(";
  const rightBracket = !unboundedUpper && includeUpper ? "]" : ")";
  const left = unboundedLower ? String.raw`-\infty` : lower;
  const right = unboundedUpper ? String.raw`\infty` : upper;
  let description = "Blue marks the included part of the real number line.";
  if (singleton) {
    description = "A single point: equal endpoints are both included.";
  } else if (unboundedLower || unboundedUpper) {
    description = "The blue arrow continues without a final endpoint.";
  }

  return {
    empty,
    singleton,
    notation: `${leftBracket}${left},${right}${rightBracket}`,
    inequality: intervalInequality(interval, singleton),
    description,
  };
}
