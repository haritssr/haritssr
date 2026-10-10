import "server-only";

export interface DiscontinuedExperiment {
  readonly slug: string;
  readonly formerRoute: string;
  readonly title: string;
  readonly description: string;
  readonly logoSrc: string;
  readonly experimentCount: number;
}

// Recorded in a follow-up commit because a commit cannot contain its own SHA.
export const discontinuedExperimentHistory: { removalCommitSha?: string } = {
  removalCommitSha: "d5cf036788e3a0ef1dd126d6899b5db8de810cdd",
};

export const DiscontinuedExperimentsData: readonly DiscontinuedExperiment[] = [
  {
    slug: "mantine",
    formerRoute: "/experiments/mantine",
    title: "Mantine",
    description: "A fully featured React component library",
    logoSrc: "/icons/mantine.svg",
    experimentCount: 1,
  },
  {
    slug: "headless-ui",
    formerRoute: "/experiments/headless-ui",
    title: "Headless UI",
    description: "Headless UI components by Tailwind CSS Team",
    logoSrc: "/icons/headlessui.svg",
    experimentCount: 8,
  },
  {
    slug: "radix-ui",
    formerRoute: "/experiments/radix-ui",
    title: "Radix UI",
    description: "Headless UI for design system in React.js",
    logoSrc: "/icons/radixui.svg",
    experimentCount: 19,
  },
  {
    slug: "react-aria",
    formerRoute: "/experiments/react-aria",
    title: "React Aria",
    description: "A library of React Hooks, UI primitives, and more",
    logoSrc: "/icons/react-aria.svg",
    experimentCount: 1,
  },
  {
    slug: "react-table",
    formerRoute: "/experiments/react-table",
    title: "React Table",
    description: "Headless UI for building tables & datagrids",
    logoSrc: "/icons/tanstack.svg",
    experimentCount: 2,
  },
  {
    slug: "react-query",
    formerRoute: "/experiments/react-query",
    title: "React Query",
    description: "Asynchronous state management for TS/JS",
    logoSrc: "/icons/tanstack.svg",
    experimentCount: 1,
  },
  {
    slug: "cmdk",
    formerRoute: "/experiments/react/cmdk",
    title: "cmdk",
    description: "Open a keyboard-driven command menu built with cmdk.",
    logoSrc: "/icons/react.svg",
    experimentCount: 1,
  },
];
