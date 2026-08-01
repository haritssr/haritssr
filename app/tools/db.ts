import "server-only";

import type { ToolRow as ToolRowCore } from "./db.core";
import {
  createTool as createToolCore,
  deleteTool as deleteToolCore,
  listTools as listToolsCore,
  updateTool as updateToolCore,
} from "./db.core";

type ToolRow = ToolRowCore;

export const listTools = listToolsCore;
export const createTool = createToolCore;
const updateTool = updateToolCore;
const deleteTool = deleteToolCore;
