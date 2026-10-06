export interface Coefficients {
  a: number;
  b: number;
  c: number;
}

export function format(value: number): string {
  return Number(value.toFixed(3)).toString();
}

function relationFor(values: number[]): string {
  return values.every(
    (value) => Math.abs(value - Number(format(value))) < 1e-10
  )
    ? "="
    : String.raw`\approx`;
}

export function polynomialTex({ a, b, c }: Coefficients): string {
  let leading = `${a}x^2`;
  if (a === 1) {
    leading = "x^2";
  } else if (a === -1) {
    leading = "-x^2";
  }
  const linear =
    b === 0
      ? ""
      : `${b > 0 ? "+" : "-"}${Math.abs(b) === 1 ? "" : Math.abs(b)}x`;
  const constant = c === 0 ? "" : `${c > 0 ? "+" : "-"}${Math.abs(c)}`;
  return `${leading}${linear}${constant}`;
}

export function quadraticDetails({ a, b, c }: Coefficients) {
  if (a === 0) {
    throw new RangeError("The leading coefficient must be nonzero.");
  }
  const discriminant = b * b - 4 * a * c;
  const vertexX = -b / (2 * a);
  const vertexY = -discriminant / (4 * a);
  let roots: number[] = [];
  if (discriminant === 0) {
    roots = [vertexX];
  } else if (discriminant > 0) {
    roots = [
      (-b - Math.sqrt(discriminant)) / (2 * a),
      (-b + Math.sqrt(discriminant)) / (2 * a),
    ].toSorted((left, right) => left - right);
  }
  let rootsTex = `x${relationFor(roots)}${roots.map(format).join(String.raw`\quad\text{or}\quad`)}`;
  if (discriminant < 0) {
    const imaginary = Math.sqrt(-discriminant) / (2 * Math.abs(a));
    const realPart = vertexX === 0 ? "" : format(vertexX);
    const imaginaryPart = imaginary === 1 ? "i" : `${format(imaginary)}i`;
    rootsTex = String.raw`x${relationFor([vertexX, imaginary])}${realPart}\pm ${imaginaryPart}`;
  }

  return { discriminant, roots, rootsTex, vertexX, vertexY };
}
