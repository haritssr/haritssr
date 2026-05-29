import "server-only";

import type { ToolRow as ToolRowCore } from "./db.core";
import { createTool as createToolCore, deleteTool as deleteToolCore, listTools as listToolsCore, updateTool as updateToolCore } from "./db.core";

export type ToolRow = ToolRowCore;

export const listTools = listToolsCore;
export const createTool = createToolCore;
export const updateTool = updateToolCore;
export const deleteTool = deleteToolCore;
