import "server-only";
import { LabsData, getLabDomain, getLatestLabUpdate } from "@/app/labs/data";
import type { LabDomain, LabEntry } from "@/app/labs/data";
import { isLabAvailable } from "@/utils/databaseLabs";

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
  return LabsData.map(withAvailableLabs);
}

export function getAvailableLabDomain(slug: string): LabDomain {
  return withAvailableLabs(getLabDomain(slug));
}

function withAvailableLabs(domain: LabDomain): LabDomain {
  return {
    ...domain,
    labs: getAvailableLabs(domain).toSorted((left, right) =>
      getLatestLabUpdate(right).localeCompare(getLatestLabUpdate(left))
    ),
  };
}

export function getAvailableLabCount(): number {
  let count = 0;

  for (const domain of LabsData) {
    for (const lab of domain.labs) {
      if (isLabAvailable(domain.slug, lab.slug)) {
        count += 1;
      }
    }
  }

  return count;
}

export function getAvailableLabSummaries(): LabSummary[] {
  return LabsData.flatMap((domain) =>
    getAvailableLabs(domain).map((lab) => ({
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

function getAvailableLabs(domain: LabDomain): LabEntry[] {
  return domain.labs.filter((lab) => isLabAvailable(domain.slug, lab.slug));
}
