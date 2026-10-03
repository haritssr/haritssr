import "server-only";
import {
  ExperimentsData,
  getExperimentDomain,
  getLatestExperimentUpdate,
} from "@/data/ExperimentsData";
import type { ExperimentDomain, ExperimentEntry } from "@/data/ExperimentsData";
import { isExperimentAvailable } from "@/utils/databaseExperiments";

interface ExperimentSummary {
  route: string;
  title: string;
  description: string;
  domain: string;
  domainTitle: string;
  tags: readonly string[];
  updatedAt: string;
}

export function getAvailableExperimentDomains(): ExperimentDomain[] {
  return ExperimentsData.map(withAvailableExperiments);
}

export function getAvailableExperimentDomain(slug: string): ExperimentDomain {
  return withAvailableExperiments(getExperimentDomain(slug));
}

function withAvailableExperiments(domain: ExperimentDomain): ExperimentDomain {
  return {
    ...domain,
    experiments: domain.experiments
      .filter((experiment) =>
        isExperimentAvailable(domain.slug, experiment.slug)
      )
      .toSorted((left, right) =>
        getLatestExperimentUpdate(right).localeCompare(
          getLatestExperimentUpdate(left)
        )
      ),
  };
}

export function getAvailableExperimentCount(): number {
  let count = 0;

  for (const domain of ExperimentsData) {
    for (const experiment of domain.experiments) {
      if (isExperimentAvailable(domain.slug, experiment.slug)) {
        count += 1;
      }
    }
  }

  return count;
}

export function getAvailableExperimentSummaries(): ExperimentSummary[] {
  return ExperimentsData.flatMap((domain) =>
    getAvailableExperiments(domain).map((experiment) => ({
      route: `/experiments/${domain.slug}/${experiment.slug}`,
      title: experiment.title,
      description: experiment.description,
      domain: domain.slug,
      domainTitle: domain.title,
      tags: experiment.tags,
      updatedAt: getLatestExperimentUpdate(experiment),
    }))
  ).toSorted((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

function getAvailableExperiments(domain: ExperimentDomain): ExperimentEntry[] {
  return domain.experiments.filter((experiment) =>
    isExperimentAvailable(domain.slug, experiment.slug)
  );
}
