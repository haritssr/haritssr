import "server-only";
import {
  createTool as createToolCore,
  listTools as listToolsCore,
} from "./db.core";

// type ToolRow = ToolRowCore;

export const listTools = listToolsCore;
export const createTool = createToolCore;
