import type { Metadata } from "next";
import ExperimentDomainLayout from "@/components/ExperimentDomainLayout";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ domain: string }>;
}): Promise<Metadata> {
  const { domain } = await params;
  const title = domain
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${title} Experiments`,
    description: `${title} experiments and demos`,
  };
}

export default async function DomainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;

  return (
    <ExperimentDomainLayout domain={domain}>{children}</ExperimentDomainLayout>
  );
}

export function generateStaticParams() {
  return [
    { domain: "browser" },
    { domain: "react" },
    { domain: "nextjs" },
    { domain: "tailwind-css" },
    { domain: "radix-ui" },
    { domain: "headless-ui" },
    { domain: "mantine" },
    { domain: "visx" },
    { domain: "react-aria" },
    { domain: "react-query" },
    { domain: "react-table" },
    { domain: "katex" },
    { domain: "haris-lab" },
    { domain: "ui-explorations" },
  ];
}
