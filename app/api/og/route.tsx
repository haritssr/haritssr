import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import sharp from "sharp";

import { OPEN_GRAPH_IMAGE_SIZE } from "@/utils/metadata/pageMetadata";

import OpenGraphCard from "./OpenGraphCard";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title")?.trim() ?? "Harits Syah";
  const description =
    searchParams.get("description")?.trim() ?? "Projects, labs & writing.";
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

  const image = new ImageResponse(<OpenGraphCard title={title} path={path} />, {
    ...OPEN_GRAPH_IMAGE_SIZE,
  });

  const jpeg = await sharp(Buffer.from(await image.arrayBuffer()))
    .jpeg({ quality: 90, chromaSubsampling: "4:4:4" })
    .toBuffer();

  return new Response(new Uint8Array(jpeg), {
    headers: {
      "Content-Type": "image/jpeg",
      "Content-Length": String(jpeg.length),
      "Cache-Control":
        "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
