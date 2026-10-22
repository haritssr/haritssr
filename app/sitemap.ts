import type { MetadataRoute } from "next";

import { getRouteManifest } from "@/utils/routeManifest";
import { SITE_URL } from "@/utils/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return getRouteManifest().map(({ route, lastModified }) => ({
    url: `${SITE_URL}${route}`,
    ...(lastModified === undefined ? {} : { lastModified }),
  }));
}
