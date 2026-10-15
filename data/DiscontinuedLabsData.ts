import "server-only";

export interface DiscontinuedLab {
  readonly slug: string;
  readonly formerRoute: string;
  readonly title: string;
  readonly description: string;
  readonly logoSrc: string;
  readonly labCount: number;
}

// Recorded in a follow-up commit because a commit cannot contain its own SHA.
export const discontinuedLabHistory: { removalCommitSha?: string } = {
  removalCommitSha: "d5cf036788e3a0ef1dd126d6899b5db8de810cdd",
};

export const DiscontinuedLabsData: readonly DiscontinuedLab[] = [
  {
    slug: "mantine",
    formerRoute: "/experiments/mantine",
    title: "Mantine",
    description: "A fully featured React component library",
    logoSrc: "/icons/mantine.svg",
    labCount: 1,
  },
  {
    slug: "headless-ui",
    formerRoute: "/experiments/headless-ui",
    title: "Headless UI",
    description: "Headless UI components by Tailwind CSS Team",
    logoSrc: "/icons/headlessui.svg",
    labCount: 8,
  },
  {
    slug: "radix-ui",
    formerRoute: "/experiments/radix-ui",
    title: "Radix UI",
    description: "Headless UI for design system in React.js",
    logoSrc: "/icons/radixui.svg",
    labCount: 19,
  },
  {
    slug: "react-aria",
    formerRoute: "/experiments/react-aria",
    title: "React Aria",
    description: "A library of React Hooks, UI primitives, and more",
    logoSrc: "/icons/react-aria.svg",
    labCount: 1,
  },
  {
    slug: "react-table",
    formerRoute: "/experiments/react-table",
    title: "React Table",
    description: "Headless UI for building tables & datagrids",
    logoSrc: "/icons/tanstack.svg",
    labCount: 2,
  },
  {
    slug: "react-query",
    formerRoute: "/experiments/react-query",
    title: "React Query",
    description: "Asynchronous state management for TS/JS",
    logoSrc: "/icons/tanstack.svg",
    labCount: 1,
  },
  {
    slug: "visx",
    formerRoute: "/experiments/visx",
    title: "VisX",
    description: "Data visualization using React.js",
    logoSrc: "/icons/visx.svg",
    labCount: 2,
  },
  {
    slug: "haris-lab",
    formerRoute: "/experiments/haris-lab",
    title: "Haris Lab",
    description: "Haris Lab user interfaces design systems",
    logoSrc: "/icons/harimaki.svg",
    labCount: 4,
  },
];
