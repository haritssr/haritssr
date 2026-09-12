"use client";

import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";

export default function YoutubeEmbedDemo() {
  return (
    <>
      <SubTitle>Youtube Embed</SubTitle>
      <div className="mb-14">
        <SourceCodeLink />
      </div>
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; pictureBin-picture"
        allowFullScreen={true}
        className="aspect-video w-full"
        sandbox="allow-scripts allow-presentation"
        src="https://www.youtube.com/embed/JXeJANDKwDc"
        title="YouTube video player"
      />
    </>
  );
}
