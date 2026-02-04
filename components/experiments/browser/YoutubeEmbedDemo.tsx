"use client";

import SubTitle from "@/components/SubTitle";

export default function YoutubeEmbedDemo() {
  return (
    <>
      <SubTitle>Youtube Embed</SubTitle>
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
