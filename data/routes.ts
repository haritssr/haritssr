// Static application pages backed by page.tsx files.
const pageRoutes = [
  "/",
  "/writing",
  "/input-list",
  "/projects",
  "/experiments",
  "/experiments/nextjs/articles",
  "/experiments/nextjs/posts",
  "/experiments/nextjs/students",
  "/components",
  "/task",
  "/task/architecture",
  "/task/history",
  "/task/statistics",
  "/times-table",
];

// Experiment domain landing pages.
const experimentDomainRoutes = [
  "/experiments/browser",
  "/experiments/react",
  "/experiments/nextjs",
  "/experiments/tailwind-css",
  "/experiments/radix-ui",
  "/experiments/headless-ui",
  "/experiments/mantine",
  "/experiments/visx",
  "/experiments/react-aria",
  "/experiments/react-query",
  "/experiments/react-table",
  "/experiments/katex",
  "/experiments/haris-lab",
  "/experiments/ui-explorations",
];

// Concrete experiment detail routes that are visitable.
const experimentRoutes = [
  "/experiments/browser/clock",
  "/experiments/browser/custom-scroll",
  "/experiments/browser/description-list",
  "/experiments/browser/details",
  "/experiments/browser/different-css-styling",
  "/experiments/browser/figure",
  "/experiments/browser/inputs",
  "/experiments/browser/intersection-observer-api",
  "/experiments/browser/number-game",
  "/experiments/browser/scroll-title",
  "/experiments/browser/select",
  "/experiments/browser/text-editing",
  "/experiments/browser/youtube-embed",

  "/experiments/haris-lab/context-modal",
  "/experiments/haris-lab/global-modal",
  "/experiments/haris-lab/side-bar",
  "/experiments/haris-lab/sidebar-hierarchy",

  "/experiments/headless-ui/dialog",
  "/experiments/headless-ui/disclosure",
  "/experiments/headless-ui/listbox",
  "/experiments/headless-ui/menu",
  "/experiments/headless-ui/popover",
  "/experiments/headless-ui/radio-group",
  "/experiments/headless-ui/switch",
  "/experiments/headless-ui/tabs",

  "/experiments/katex/basic",
  "/experiments/mantine/carousel",

  "/experiments/nextjs/next-13-image-local",
  "/experiments/nextjs/next-13-image-remote",
  "/experiments/nextjs/router",
  "/experiments/nextjs/swr",

  "/experiments/radix-ui/accordion",
  "/experiments/radix-ui/alert-dialog",
  "/experiments/radix-ui/checkbox",
  "/experiments/radix-ui/collapsible",
  "/experiments/radix-ui/dialog",
  "/experiments/radix-ui/dropdown-menu",
  "/experiments/radix-ui/hover-card",
  "/experiments/radix-ui/popover",
  "/experiments/radix-ui/radio-group",
  "/experiments/radix-ui/scroll-area",
  "/experiments/radix-ui/select",
  "/experiments/radix-ui/slider",
  "/experiments/radix-ui/switch",
  "/experiments/radix-ui/tabs",
  "/experiments/radix-ui/toast",
  "/experiments/radix-ui/toggle",
  "/experiments/radix-ui/toggle-group",
  "/experiments/radix-ui/toolbar",
  "/experiments/radix-ui/tooltip",

  "/experiments/react/cmdk",
  "/experiments/react/confetti",
  "/experiments/react/counter",
  "/experiments/react/edit-profile",
  "/experiments/react/font-mixer",
  "/experiments/react/functional-props",
  "/experiments/react/generic-select",
  "/experiments/react/modal-inside-modal",
  "/experiments/react/search-books",
  "/experiments/react/search-interpol",
  "/experiments/react/search-table",
  "/experiments/react/searchable-product-data",
  "/experiments/react/submit-form",
  "/experiments/react/usecontext-dark-mode",
  "/experiments/react/useeffect-title",
  "/experiments/react/useimperativehandle",
  "/experiments/react/usememo-1",
  "/experiments/react/usereducer-todo-list",
  "/experiments/react/usereducer-todo-list-immer",
  "/experiments/react/usestate-draggable-box",
  "/experiments/react/usestate-form",
  "/experiments/react/usestate-object-form",
  "/experiments/react/usestate-reacting-to-input",
  "/experiments/react/usestate-todo-list",
  "/experiments/react/react-wrap-balancer",

  "/experiments/react-aria/calendar",
  "/experiments/react-query/basic",

  "/experiments/react-table/basic",
  "/experiments/react-table/column-group",

  "/experiments/tailwind-css/apple-navbar",
  "/experiments/tailwind-css/blurry",
  "/experiments/tailwind-css/centering-div",
  "/experiments/tailwind-css/columns",
  "/experiments/tailwind-css/feedback",
  "/experiments/tailwind-css/floating-labels",
  "/experiments/tailwind-css/glowing-background",
  "/experiments/tailwind-css/grid",
  "/experiments/tailwind-css/newspaper",
  "/experiments/tailwind-css/planetscale-navbar",
  "/experiments/tailwind-css/position",
  "/experiments/tailwind-css/sidebar",
  "/experiments/tailwind-css/tailwind-vs-apple-color",
  "/experiments/tailwind-css/youtube-thumbnail",

  "/experiments/ui-explorations/inline-maki",
  "/experiments/ui-explorations/notion-navbar",
  "/experiments/ui-explorations/times-table",
  "/experiments/ui-explorations/yearly-interest",
  "/experiments/ui-explorations/tools",

  "/experiments/visx/bar-chart",
  "/experiments/visx/pie-chart",

  "/experiments/nextjs/posts/pre-rendering",
  "/experiments/nextjs/posts/ssg-ssr",
];

// Combined unique route list used as the source corpus for search.
const allRoutes = Array.from(
  new Set([...pageRoutes, ...experimentDomainRoutes, ...experimentRoutes])
);

// Human-friendly title overrides for routes that need custom labels.
const routeTitleOverrides: Record<string, string> = {
  "/": "Home",
  "/components": "Components",
  "/times-table": "Times Table",
};

// Matches route separators that should become spaces.
// Example: "foo-bar" becomes "foo bar" after replacement.
const routeSeparatorPattern = /[-_/]/g;

// Matches runs of whitespace so normalized text contains single spaces.
// Example: "foo  bar" becomes "foo bar".
const whitespaceSequencePattern = /\s+/g;

export interface RouteDoc {
  id: string;
  route: string;
  title: string;
  tokens: string[];
}

// Normalizes any route or query text into a lowercase, space-separated form.
function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(routeSeparatorPattern, " ")
    .replace(whitespaceSequencePattern, " ")
    .trim();
}

// Converts normalized words into display-friendly title case.
function toTitleCase(value: string): string {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Resolves the display title for a route using overrides and fallback formatting.
function getRouteTitle(route: string): string {
  if (routeTitleOverrides[route]) {
    return routeTitleOverrides[route];
  }

  // Cached normalized route string for empty-route handling and title generation.
  const normalized = normalizeText(route);
  if (!normalized) {
    return "Home";
  }

  return toTitleCase(normalized);
}

// Tokenizes text into unique searchable words.
function tokenize(value: string): string[] {
  return Array.from(new Set(normalizeText(value).split(" ").filter(Boolean)));
}

// Searchable route documents with derived titles and tokens.
const routeDocs: RouteDoc[] = allRoutes.map((route) => {
  // Human-readable route title.
  const title = getRouteTitle(route);
  // Unique search tokens generated from route and title text.
  const tokens = tokenize(`${route} ${title}`);

  return {
    id: route,
    route,
    title,
    tokens,
  };
});

// Inverted index mapping each token to matching route IDs.
const routeTokenIndex = routeDocs.reduce<Record<string, string[]>>(
  (acc, doc) => {
    for (const token of doc.tokens) {
      if (!acc[token]) {
        acc[token] = [];
      }

      acc[token].push(doc.id);
    }

    return acc;
  },
  {}
);

// Searches routes by query tokens and returns ranked route documents.
export function searchRoutes(query: string, limit = 20): RouteDoc[] {
  // Tokenized user query used for index lookups.
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) {
    return [];
  }

  // Score map keyed by route ID; higher values rank earlier.
  const scored = new Map<string, number>();

  for (const token of queryTokens) {
    // Candidate routes matching the current token.
    const matchedRoutes = routeTokenIndex[token] || [];

    for (const route of matchedRoutes) {
      // Previous accumulated score for this route.
      const prevScore = scored.get(route) || 0;
      scored.set(route, prevScore + 1);
    }
  }

  return routeDocs
    .filter((doc) => scored.has(doc.id))
    .sort((a, b) => {
      // Primary ranking by token match count.
      const scoreDelta = (scored.get(b.id) || 0) - (scored.get(a.id) || 0);
      if (scoreDelta !== 0) {
        return scoreDelta;
      }

      return a.route.localeCompare(b.route);
    })
    .slice(0, limit);
}
