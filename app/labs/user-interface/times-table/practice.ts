export const FACTORS: readonly number[] = Array.from(
  { length: 10 },
  (_, index) => index + 1
);

export type AnswerStatus = "empty" | "pending" | "correct" | "incorrect";

export function shuffleFactors(
  factors: readonly number[],
  random = Math.random
): number[] {
  const shuffled = [...factors];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const other = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[other]] = [shuffled[other], shuffled[index]];
  }
  return shuffled;
}

export function answerStatus(
  value: string,
  product: number,
  checked: boolean
): AnswerStatus {
  if (value.length === 0) {
    return "empty";
  }
  if (/^\d+$/u.test(value) && Number(value) === product) {
    return "correct";
  }
  return checked ? "incorrect" : "pending";
}
