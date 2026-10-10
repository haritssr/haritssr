import type { AnswerField, AnswerGroup, Question } from "./questions";
import { questions } from "./questions";

export const STORAGE_KEY = "haritssr:polinomial:v1";
export const ANSWER_LENGTH_LIMIT = 32;

interface Rational {
  readonly numerator: bigint;
  readonly denominator: bigint;
}

export type Answers = Readonly<Record<string, string>>;
export type FieldResult = "empty" | "invalid" | "incorrect" | "correct";

export interface QuestionEntry {
  readonly answers: Answers;
  readonly checked: boolean;
  readonly hints: number;
  readonly revealed: boolean;
}

export interface Progress {
  readonly currentId: number;
  readonly entries: Readonly<Record<string, QuestionEntry>>;
}

export const emptyEntry: QuestionEntry = {
  answers: {},
  checked: false,
  hints: 0,
  revealed: false,
};
export const initialProgress: Progress = { currentId: 1, entries: {} };

function rational(numerator: bigint, denominator = 1n): Rational | null {
  if (denominator === 0n) {
    return null;
  }
  let left = numerator < 0n ? -numerator : numerator;
  let right = denominator < 0n ? -denominator : denominator;
  while (right !== 0n) {
    [left, right] = [right, left % right];
  }
  const sign = denominator < 0n ? -1n : 1n;
  return {
    numerator: (sign * numerator) / left,
    denominator: (sign * denominator) / left,
  };
}

/** Parse bounded decimal or integer-fraction input, with no floating-point rounding. */
function parseNumber(input: string): Rational | null {
  const value = input.trim().replace(",", ".");
  if (value.length === 0 || value.length > ANSWER_LENGTH_LIMIT) {
    return null;
  }
  if (/^[+-]?\d+\s*\/\s*[+-]?\d+$/.test(value)) {
    const [numerator, denominator] = value.split("/");
    return rational(BigInt(numerator.trim()), BigInt(denominator.trim()));
  }
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(value)) {
    return null;
  }
  const negative = value.startsWith("-");
  const unsigned = value.replace(/^[+-]/, "");
  const [integer, decimals = ""] = unsigned.split(".");
  const numerator = BigInt(`${integer || "0"}${decimals}`);
  return rational(
    negative ? -numerator : numerator,
    10n ** BigInt(decimals.length)
  );
}

function rationalTex(value: Rational): string {
  if (value.denominator === 1n) {
    return String(value.numerator);
  }
  const magnitude = value.numerator < 0n ? -value.numerator : value.numerator;
  return `${value.numerator < 0n ? "-" : ""}\\frac{${magnitude}}{${value.denominator}}`;
}

function fieldResult(field: AnswerField, input: string): FieldResult {
  if (input.trim() === "") {
    return "empty";
  }
  if (field.kind === "choice") {
    if (!field.options.some((option) => option.id === input)) {
      return "invalid";
    }
    return input === field.expected ? "correct" : "incorrect";
  }
  const actual = parseNumber(input);
  const expected = parseNumber(field.expected);
  if (!actual || !expected) {
    return "invalid";
  }
  return actual.numerator === expected.numerator &&
    actual.denominator === expected.denominator
    ? "correct"
    : "incorrect";
}

export function checkQuestion(question: Question, answers: Answers) {
  const fields = question.groups.flatMap((group) => group.fields);
  const results: Record<string, FieldResult> = {};
  let correctCount = 0;
  for (const field of fields) {
    const result = fieldResult(field, answers[field.id] ?? "");
    results[field.id] = result;
    if (result === "correct") {
      correctCount += 1;
    }
  }
  return {
    results,
    correctCount,
    total: fields.length,
    complete: correctCount === fields.length,
  };
}

export function questionStatus(
  question: Question,
  entry: QuestionEntry
): "solved" | "revealed" | "draft" | "new" {
  if (entry.revealed) {
    return "revealed";
  }
  if (entry.checked && checkQuestion(question, entry.answers).complete) {
    return "solved";
  }
  return Object.keys(entry.answers).length > 0 || entry.hints > 0
    ? "draft"
    : "new";
}

function previewTerm(field: AnswerField, input: string, suffix: string) {
  if (field.kind === "choice") {
    const tex = field.options.find((item) => item.id === input)?.tex;
    if (tex === "0") {
      return null;
    }
    const coefficient =
      tex === undefined ? String.raw`\boxed{\,?\,}` : `\\left(${tex}\\right)`;
    return { tex: `${coefficient}${suffix}`, negative: false };
  }
  const parsed = parseNumber(input);
  if (!parsed) {
    return { tex: `\\boxed{\\,?\\,}${suffix}`, negative: false };
  }
  if (parsed.numerator === 0n) {
    return null;
  }
  const negative = parsed.numerator < 0n;
  const magnitude = {
    numerator: negative ? -parsed.numerator : parsed.numerator,
    denominator: parsed.denominator,
  };
  const coefficient =
    magnitude.numerator === magnitude.denominator && suffix !== ""
      ? ""
      : rationalTex(magnitude);
  return { tex: `${coefficient}${suffix}`, negative };
}

/** Build a preview only from the student's fields; never substitute expected answers. */
export function previewTex(group: AnswerGroup, answers: Answers): string {
  const parts: string[] = [];
  for (const [index, field] of group.fields.entries()) {
    const monomial = group.monomials?.[index] ?? "1";
    const term = previewTerm(
      field,
      answers[field.id] ?? "",
      monomial === "1" ? "" : monomial
    );
    if (!term) {
      continue;
    }
    let sign = parts.length > 0 ? "+" : "";
    if (term.negative) {
      sign = "-";
    }
    parts.push(`${sign}${term.tex}`);
  }
  const name = group.previewName ?? "";
  return `${name}${name.length > 0 ? "=" : ""}${parts.join("") || "0"}`;
}

export function updateEntry(
  progress: Progress,
  questionId: number,
  update: (entry: QuestionEntry) => QuestionEntry
): Progress {
  return {
    ...progress,
    entries: {
      ...progress.entries,
      [questionId]: update(progress.entries[questionId] ?? emptyEntry),
    },
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function restoreEntry(
  question: Question,
  value: unknown
): QuestionEntry | null {
  if (
    !isRecord(value) ||
    !isRecord(value.answers) ||
    typeof value.checked !== "boolean" ||
    typeof value.revealed !== "boolean" ||
    typeof value.hints !== "number" ||
    !Number.isInteger(value.hints) ||
    value.hints < 0 ||
    value.hints > 2
  ) {
    return null;
  }
  const answers: Record<string, string> = {};
  for (const field of question.groups.flatMap((group) => group.fields)) {
    const input = value.answers[field.id];
    if (input === undefined) {
      continue;
    }
    if (typeof input !== "string" || input.length > ANSWER_LENGTH_LIMIT) {
      return null;
    }
    if (
      field.kind === "choice" &&
      input !== "" &&
      !field.options.some((option) => option.id === input)
    ) {
      return null;
    }
    answers[field.id] = input;
  }
  return {
    answers,
    checked: value.checked,
    revealed: value.revealed,
    hints: value.hints,
  };
}

export function restoreProgress(value: unknown): Progress {
  if (!isRecord(value) || value.version !== 1 || !isRecord(value.entries)) {
    return initialProgress;
  }
  const entries: Record<string, QuestionEntry> = {};
  for (const question of questions) {
    const entry = restoreEntry(question, value.entries[String(question.id)]);
    if (entry) {
      entries[question.id] = entry;
    }
  }
  const currentId =
    typeof value.currentId === "number" &&
    questions.some((question) => question.id === value.currentId)
      ? value.currentId
      : 1;
  return { currentId, entries };
}

export function serializeProgress(progress: Progress): string {
  return JSON.stringify({ version: 1, ...progress });
}
