import { ExperimentsData } from "./ExperimentsData";

export const BLOG_DESCRIPTION =
  "Selected notes that I want to share to the world.";

export const PROJECTS_DESCRIPTION =
  "Detail informations on how projects I belong to being handled.";

export function getExperimentsHomeDescription(): string {
  let totalExperiment = 0;

  for (const experiment of ExperimentsData) {
    totalExperiment += experiment.links.length;
  }

  return `${totalExperiment} experiments across the TypeScript and React ecosystem.`;
}
