import "server-only";

export const DATABASE_EXPERIMENTS_ENABLED =
  process.env.NODE_ENV !== "production";

const DATABASE_EXPERIMENT_SLUGS = new Set(["task", "tools"]);

export function isExperimentAvailable(
  domainSlug: string,
  experimentSlug: string
) {
  return (
    DATABASE_EXPERIMENTS_ENABLED ||
    domainSlug !== "ui-explorations" ||
    !DATABASE_EXPERIMENT_SLUGS.has(experimentSlug)
  );
}
