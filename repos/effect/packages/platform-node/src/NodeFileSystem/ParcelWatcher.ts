/**
 * @since 1.0.0
 */

import type { WatchBackend } from "@effect/platform/FileSystem";
import * as ParcelWatcher from "@effect/platform-node-shared/NodeFileSystem/ParcelWatcher";
import type { Layer } from "effect/Layer";

/**
 * @since 1.0.0
 * @category layer
 */
export const layer: Layer<WatchBackend> = ParcelWatcher.layer;
