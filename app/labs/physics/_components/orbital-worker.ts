import {
  makeOrbitalSurface,
  radialProbabilityRadius,
  sampleOrbital,
} from "../_lib/orbital-model";
import type { OrbitalPoint, OrbitalSurface } from "../_lib/orbital-model";

export interface OrbitalRequest {
  key: string;
  shell: number;
  azimuthal: number;
  order: number;
}

export interface OrbitalGeometry {
  points: readonly OrbitalPoint[];
  surface: OrbitalSurface;
  selectedRadius: number;
  fitRadius: number;
}

export type OrbitalResponse =
  | { key: string; geometry: OrbitalGeometry }
  | { key: string; error: true };

const cache = new Map<string, OrbitalGeometry>();

self.addEventListener("message", (event: MessageEvent<OrbitalRequest>) => {
  const { key, shell, azimuthal, order } = event.data;
  try {
    let geometry = cache.get(key);
    if (!geometry) {
      geometry = {
        points: sampleOrbital(shell, azimuthal, order),
        surface: makeOrbitalSurface(shell, azimuthal, order),
        selectedRadius: radialProbabilityRadius(shell, azimuthal, 0.9),
        fitRadius: radialProbabilityRadius(shell, azimuthal, 0.98),
      };
      if (cache.size >= 4) {
        const oldest = cache.keys().next().value;
        if (oldest !== undefined) {
          cache.delete(oldest);
        }
      }
      cache.set(key, geometry);
    }
    // oxlint-disable-next-line unicorn/require-post-message-target-origin -- Dedicated workers do not accept a target origin.
    self.postMessage({ key, geometry } satisfies OrbitalResponse);
  } catch {
    // oxlint-disable-next-line unicorn/require-post-message-target-origin -- Dedicated workers do not accept a target origin.
    self.postMessage({ key, error: true } satisfies OrbitalResponse);
  }
});
