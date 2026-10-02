import "server-only";

import {
  ExperimentsData,
  getExperimentDomain,
  getLatestExperimentUpdate,
} from "@/data/ExperimentsData";
import type { ExperimentDomain } from "@/data/ExperimentsData";
import { isExperimentAvailable } from "@/utils/databaseExperiments";

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
