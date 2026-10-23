import "server-only";
import { LabsData, getLabDomain, getLatestLabUpdate } from "@/app/labs/data";
import type { LabDomain } from "@/app/labs/data";

interface LabSummary {
  route: string;
  title: string;
  description: string;
  domain: string;
  domainTitle: string;
  tags: readonly string[];
  updatedAt: string;
}

export function getAvailableLabDomains(): LabDomain[] {
  return LabsData.map(withSortedLabs);
}

export function getAvailableLabDomain(slug: string): LabDomain {
  return withSortedLabs(getLabDomain(slug));
}

function withSortedLabs(domain: LabDomain): LabDomain {
  return {
    ...domain,
    labs: domain.labs.toSorted((left, right) =>
      getLatestLabUpdate(right).localeCompare(getLatestLabUpdate(left))
    ),
  };
}

export function getAvailableLabCount(): number {
  return LabsData.reduce((count, domain) => count + domain.labs.length, 0);
}

export function getAvailableLabSummaries(): LabSummary[] {
  return LabsData.flatMap((domain) =>
    domain.labs.map((lab) => ({
      route: `/labs/${domain.slug}/${lab.slug}`,
      title: lab.title,
      description: lab.description,
      domain: domain.slug,
      domainTitle: domain.title,
      tags: lab.tags,
      updatedAt: getLatestLabUpdate(lab),
    }))
  ).toSorted((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}
