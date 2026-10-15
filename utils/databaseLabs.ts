import "server-only";

export const DATABASE_LABS_ENABLED = process.env.NODE_ENV !== "production";

const DATABASE_LAB_SLUGS = new Set(["task", "tools"]);

export function isDatabaseLab(domainSlug: string, labSlug: string) {
  return domainSlug === "user-interface" && DATABASE_LAB_SLUGS.has(labSlug);
}

export function isLabAvailable(domainSlug: string, labSlug: string) {
  return DATABASE_LABS_ENABLED || !isDatabaseLab(domainSlug, labSlug);
}
