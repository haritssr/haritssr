import "server-only";

export const DATABASE_EXPERIMENTS_ENABLED =
  process.env.NODE_ENV !== "production";

const DATABASE_EXPERIMENT_SLUGS = new Set(["task", "tools"]);

export function isDatabaseExperiment(
  domainSlug: string,
  experimentSlug: string
) {
  return (
    domainSlug === "user-interface" &&
    DATABASE_EXPERIMENT_SLUGS.has(experimentSlug)
  );
}

export function isExperimentAvailable(
  domainSlug: string,
  experimentSlug: string
) {
  return (
    DATABASE_EXPERIMENTS_ENABLED ||
    !isDatabaseExperiment(domainSlug, experimentSlug)
  );
}
