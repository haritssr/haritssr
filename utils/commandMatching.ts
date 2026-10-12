export function commandWords(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[^a-z0-9]+/u)
    .filter(Boolean);
}

export function matchesCommand(
  words: readonly string[],
  keywords: readonly string[]
): boolean {
  return (
    words.length > 0 &&
    words.every((word) => keywords.some((keyword) => keyword.startsWith(word)))
  );
}
