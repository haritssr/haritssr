import "server-only";
import inventory from "./_generated/projectFiles.json";
import { buildProjectStructure } from "./projectStructure";

export function getProjectTree() {
  return buildProjectStructure(inventory.files);
}
