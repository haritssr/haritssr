import "server-only";
import type { RouteDoc } from "@/data/routes";
import { getRouteManifest } from "@/utils/routeManifest";

export function getSearchIndex(): RouteDoc[] {
  return getRouteManifest().map(
    ({ route, title, description, group, suggestion }) => ({
      route,
      title,
      description,
      group,
      suggestion,
    })
  );
}
