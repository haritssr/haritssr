"use client";

import ExternalLink from "@/components/ExternalLink";
import SubTitle from "@/components/SubTitle";

export default function YoutubeEmbedDemo() {
  return (
    <>
      <SubTitle>Youtube Embed</SubTitle>
      <div className="mb-14">
        <ExternalLink
          href="https://github.com/haritssr/haritssr/tree/try/app/experiments/browser/youtube-embed"
          name="Source code"
        />
      </div>
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; pictureBin-picture"
        allowFullScreen={true}
        className="aspect-video w-full"
        frameBorder="0"
        src="https://www.youtube.com/embed/JXeJANDKwDc"
        title="YouTube video player"
      />
    </>
  );
}
