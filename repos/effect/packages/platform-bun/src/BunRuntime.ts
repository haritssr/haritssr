/**
 * @since 1.0.0
 */

import type { RunMain } from "@effect/platform/Runtime";
import * as NodeRuntime from "@effect/platform-node-shared/NodeRuntime";

/**
 * @since 1.0.0
 * @category runtime
 */
export const runMain: RunMain = NodeRuntime.runMain;
