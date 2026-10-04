import { readFileSync } from "node:fs";
import nodePath from "node:path";

import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

import { isExperimentAvailable } from "@/utils/databaseExperiments";
import { OPEN_GRAPH_IMAGE_SIZE } from "@/utils/pageMetadata";

import OpenGraphCard from "./OpenGraphCard";

const background = `data:image/png;base64,${readFileSync(
  nodePath.join(process.cwd(), "public/images/og-watercolor-blue-mint.png")
).toString("base64")}`;

export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title")?.trim() ?? "Harits Syah";
  const description =
    searchParams.get("description")?.trim() ??
    "Projects, experiments & writing.";
  const path = searchParams.get("path") ?? "/";

  if (
    title.length === 0 ||
    title.length > 220 ||
    description.length > 800 ||
    path.length > 300 ||
    !/^\/(?!\/)[^?#\s]*$/u.test(path)
  ) {
    return new Response("Invalid image parameters", { status: 400 });
  }

  const [, section, domain, experiment] = path.split("/");
  if (
    section === "experiments" &&
    domain &&
    experiment &&
    !isExperimentAvailable(domain, experiment)
  ) {
    return new Response("Not found", { status: 404 });
  }

  return new ImageResponse(
    <OpenGraphCard
      title={title}
      description={description}
      path={path}
      background={background}
    />,
    {
      ...OPEN_GRAPH_IMAGE_SIZE,
      headers: {
        "Cache-Control":
          "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      },
    }
  );
}
