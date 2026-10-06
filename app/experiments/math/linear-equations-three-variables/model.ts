interface Fraction {
  numerator: number;
  denominator: number;
}

export interface EliminationStep {
  operation: string;
  matrix: Fraction[][];
}

export const variables = ["x", "y", "z"] as const;
export const ENTRY_LIMIT = 20;

function fraction(numerator: number, denominator = 1): Fraction {
  if (denominator === 0) {
    throw new RangeError("A fraction cannot have a zero denominator.");
  }
  let left = Math.abs(numerator);
  let right = Math.abs(denominator);
  while (right !== 0) {
    [left, right] = [right, left % right];
  }
  const sign = denominator < 0 ? -1 : 1;
  return {
    numerator: (sign * numerator) / left,
    denominator: Math.abs(denominator) / left,
  };
}

function multiply(left: Fraction, right: Fraction) {
  return fraction(
    left.numerator * right.numerator,
    left.denominator * right.denominator
  );
}

function subtract(left: Fraction, right: Fraction) {
  return fraction(
    left.numerator * right.denominator - right.numerator * left.denominator,
    left.denominator * right.denominator
  );
}

export function fractionTex(value: Fraction): string {
  if (value.denominator === 1) {
    return `${value.numerator}`;
  }
  return `${value.numerator < 0 ? "-" : ""}\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`;
}

export function matrixTex(matrix: Fraction[][]): string {
  const rows = matrix.map((row) => row.map(fractionTex).join("&"));
  return String.raw`\left[\begin{array}{ccc|c}${rows.join(String.raw`\\`)}\end{array}\right]`;
}

function expressionTex(
  constant: Fraction,
  terms: { coefficient: Fraction; variable: string }[]
) {
  let expression = constant.numerator === 0 ? "" : fractionTex(constant);
  for (const { coefficient, variable } of terms) {
    if (coefficient.numerator === 0) {
      continue;
    }
    const magnitude = fraction(
      Math.abs(coefficient.numerator),
      coefficient.denominator
    );
    const coefficientTex =
      magnitude.numerator === magnitude.denominator
        ? ""
        : fractionTex(magnitude);
    let sign = coefficient.numerator < 0 ? "-" : "+";
    if (expression === "" && coefficient.numerator > 0) {
      sign = "";
    }
    expression += `${sign}${coefficientTex}${variable}`;
  }
  return expression || "0";
}

export function equationTex(row: readonly number[]) {
  return `${expressionTex(
    fraction(0),
    variables.map((variable, index) => ({
      coefficient: fraction(row[index]),
      variable,
    }))
  )}=${row[3]}`;
}

export function systemTex(system: readonly (readonly number[])[]) {
  return String.raw`\begin{cases}${system.map(equationTex).join(String.raw`\\`)}\end{cases}`;
}

function solutionExpressions(matrix: Fraction[][], pivots: number[]) {
  const freeColumns = variables
    .map((_, index) => index)
    .filter((column) => !pivots.includes(column));
  const parameterNames = ["r", "s", "t"].slice(3 - freeColumns.length);
  const expressions = variables.map((variable, column) => {
    const pivotRow = pivots.indexOf(column);
    if (pivotRow === -1) {
      return `${variable}&=${parameterNames[freeColumns.indexOf(column)]}`;
    }
    const terms = freeColumns.map((freeColumn, index) => ({
      coefficient: multiply(fraction(-1), matrix[pivotRow][freeColumn]),
      variable: parameterNames[index],
    }));
    return `${variable}&=${expressionTex(matrix[pivotRow][3], terms)}`;
  });
  return {
    solutionTex: String.raw`\begin{aligned}${expressions.join(String.raw`\\`)}\end{aligned}`,
    parametersTex:
      parameterNames.length === 0
        ? ""
        : String.raw`${parameterNames.join(",")}\in\mathbb{R}`,
  };
}

export function solveSystem(system: readonly (readonly number[])[]) {
  if (
    system.length !== 3 ||
    system.some(
      (row) =>
        row.length !== 4 ||
        row.some(
          (value) => !Number.isInteger(value) || Math.abs(value) > ENTRY_LIMIT
        )
    )
  ) {
    throw new RangeError(
      `Use three equations with integer entries between -${ENTRY_LIMIT} and ${ENTRY_LIMIT}.`
    );
  }
  const matrix = system.map((row) => row.map((value) => fraction(value)));
  const steps: EliminationStep[] = [];
  const pivots: number[] = [];
  const save = (operation: string) => {
    steps.push({ operation, matrix: matrix.map((row) => [...row]) });
  };
  save(String.raw`\text{Initial augmented matrix}`);

  for (let column = 0; column < 3; column += 1) {
    const pivotRow = pivots.length;
    const source = matrix.findIndex(
      (row, index) => index >= pivotRow && row[column].numerator !== 0
    );
    if (source === -1) {
      continue;
    }
    if (source !== pivotRow) {
      [matrix[pivotRow], matrix[source]] = [matrix[source], matrix[pivotRow]];
      save(String.raw`R_{${pivotRow + 1}}\leftrightarrow R_{${source + 1}}`);
    }
    const pivot = matrix[pivotRow][column];
    if (pivot.numerator !== pivot.denominator) {
      const scale = fraction(pivot.denominator, pivot.numerator);
      matrix[pivotRow] = matrix[pivotRow].map((value) =>
        multiply(value, scale)
      );
      save(
        String.raw`R_{${pivotRow + 1}}\leftarrow ${fractionTex(scale)}R_{${pivotRow + 1}}`
      );
    }
    eliminateColumn(matrix, column, pivotRow, save);
    pivots.push(column);
  }

  const contradiction = matrix.find(
    (row) =>
      row.slice(0, 3).every((value) => value.numerator === 0) &&
      row[3].numerator !== 0
  );
  if (contradiction) {
    return {
      kind: "none" as const,
      rank: pivots.length,
      steps,
      solutionTex: String.raw`\varnothing`,
      parametersTex: "",
      contradictionTex: `0=${fractionTex(contradiction[3])}`,
    };
  }
  return {
    kind: pivots.length === 3 ? ("unique" as const) : ("infinite" as const),
    rank: pivots.length,
    steps,
    ...solutionExpressions(matrix, pivots),
    contradictionTex: "",
  };
}

function eliminateColumn(
  matrix: Fraction[][],
  column: number,
  pivotRow: number,
  save: (operation: string) => void
) {
  for (let row = 0; row < 3; row += 1) {
    const factor = matrix[row][column];
    if (row === pivotRow || factor.numerator === 0) {
      continue;
    }
    matrix[row] = matrix[row].map((value, index) =>
      subtract(value, multiply(factor, matrix[pivotRow][index]))
    );
    const magnitude = fraction(Math.abs(factor.numerator), factor.denominator);
    const factorTex =
      magnitude.numerator === magnitude.denominator
        ? ""
        : fractionTex(magnitude);
    save(
      String.raw`R_{${row + 1}}\leftarrow R_{${row + 1}}${factor.numerator > 0 ? "-" : "+"}${factorTex}R_{${pivotRow + 1}}`
    );
  }
}
