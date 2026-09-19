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
    route: "/writing",
    title: "Writing",
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

function normalize(value: string): string {
  return value
    .normalize("NFKD")
    .replace(combiningMarks, "")
    .toLowerCase()
    .replace(separators, " ")
    .trim();
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
  return docs
    .map((doc) => {
      const title = normalize(doc.title);
      const searchable = normalize(
        `${doc.title} ${doc.route} ${doc.description} ${doc.group}`
      );
      if (!words.every((word) => searchable.includes(word))) {
        return { doc, score: 0 };
      }

      let score = 1;
      if (title === normalizedQuery) {
        score += 100;
      } else if (title.startsWith(normalizedQuery)) {
        score += 50;
      }
      score += words.filter((word) => title.includes(word)).length * 10;
      return { doc, score };
    })
    .filter(({ score }) => score > 0)
    .toSorted(
      (a, b) => b.score - a.score || a.doc.route.localeCompare(b.doc.route)
    )
    .map(({ doc }) => doc);
}
