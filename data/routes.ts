export interface RouteDoc {
  route: string;
  title: string;
  description: string;
  group: string;
  suggestion?: "Navigation";
}

export const navigationRoutes: readonly RouteDoc[] = [
  {
    route: "/",
    title: "Home",
    description: "Harits Syah — developer, teacher, and founder",
    group: "Navigation",
    suggestion: "Navigation",
  },
  {
    route: "/projects",
    title: "Projects",
    description: "Selected projects and client work",
    group: "Navigation",
    suggestion: "Navigation",
  },
  {
    route: "/experiments",
    title: "Experiments",
    description: "Explore code, libraries, and UI experiments",
    group: "Navigation",
    suggestion: "Navigation",
  },
  {
    route: "/blog",
    title: "Blog",
    description: "Notes, ideas, and articles",
    group: "Navigation",
    suggestion: "Navigation",
  },
  {
    route: "/design",
    title: "Design",
    description: "Design system, colors, and components",
    group: "Navigation",
    suggestion: "Navigation",
  },
];

const combiningMarks = /\p{M}/gu;
const separators = /[^\p{L}\p{N}]+/gu;

interface IndexedRouteDoc {
  doc: RouteDoc;
  searchable: string;
  title: string;
}

export interface SearchMatchRange {
  end: number;
  start: number;
}

const searchIndexCache = new WeakMap<
  readonly RouteDoc[],
  readonly IndexedRouteDoc[]
>();

function normalize(value: string): string {
  return value
    .normalize("NFKD")
    .replace(combiningMarks, "")
    .toLowerCase()
    .replace(separators, " ")
    .trim();
}

export function hasSearchQuery(query: string): boolean {
  return normalize(query).length > 0;
}

export function getSearchMatchRanges(
  value: string,
  query: string
): SearchMatchRange[] {
  const words = [...new Set(normalize(query).split(" ").filter(Boolean))];
  if (words.length === 0) {
    return [];
  }

  const offsets: SearchMatchRange[] = [];
  let normalizedValue = "";
  let sourceOffset = 0;

  for (const character of value) {
    const start = sourceOffset;
    sourceOffset += character.length;
    const normalizedCharacter = character
      .normalize("NFKD")
      .replace(combiningMarks, "")
      .toLowerCase()
      .replace(separators, " ");

    normalizedValue += normalizedCharacter;
    for (const normalizedCodePoint of normalizedCharacter) {
      offsets.push({ end: sourceOffset, start });
      if (normalizedCodePoint.length === 2) {
        offsets.push({ end: sourceOffset, start });
      }
    }
  }

  const ranges: SearchMatchRange[] = [];
  for (const word of words) {
    let matchIndex = normalizedValue.indexOf(word);
    while (matchIndex !== -1) {
      const firstCharacter = offsets[matchIndex];
      const lastCharacter = offsets[matchIndex + word.length - 1];
      if (firstCharacter !== undefined && lastCharacter !== undefined) {
        ranges.push({
          end: lastCharacter.end,
          start: firstCharacter.start,
        });
      }
      matchIndex = normalizedValue.indexOf(word, matchIndex + 1);
    }
  }

  ranges.sort((a, b) => a.start - b.start || a.end - b.end);
  const mergedRanges: SearchMatchRange[] = [];
  for (const range of ranges) {
    const previousRange = mergedRanges.at(-1);
    if (previousRange && range.start <= previousRange.end) {
      previousRange.end = Math.max(previousRange.end, range.end);
    } else {
      mergedRanges.push({ ...range });
    }
  }

  return mergedRanges;
}

function getIndexedRoutes(
  docs: readonly RouteDoc[]
): readonly IndexedRouteDoc[] {
  const cached = searchIndexCache.get(docs);
  if (cached) {
    return cached;
  }

  const index = docs.map((doc) => ({
    doc,
    searchable: normalize(
      `${doc.title} ${doc.route} ${doc.description} ${doc.group}`
    ),
    title: normalize(doc.title),
  }));
  searchIndexCache.set(docs, index);
  return index;
}

// Require every query word, including partial words, and prefer title matches.
export function searchRoutes(
  docs: readonly RouteDoc[],
  query: string
): RouteDoc[] {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) {
    return docs.filter((doc) => doc.suggestion !== undefined);
  }

  const words = normalizedQuery.split(" ");
  const matches: { doc: RouteDoc; score: number }[] = [];

  for (const { doc, searchable, title } of getIndexedRoutes(docs)) {
    if (!words.every((word) => searchable.includes(word))) {
      continue;
    }

    let score = 1;
    if (title === normalizedQuery) {
      score += 100;
    } else if (title.startsWith(normalizedQuery)) {
      score += 50;
    }
    score += words.filter((word) => title.includes(word)).length * 10;
    matches.push({ doc, score });
  }

  return matches
    .toSorted(
      (a, b) => b.score - a.score || a.doc.route.localeCompare(b.doc.route)
    )
    .map(({ doc }) => doc);
}
