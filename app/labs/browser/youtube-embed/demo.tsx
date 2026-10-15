"use client";

import LabPageHeader from "@/components/LabPageHeader";
import PageDescription from "@/components/PageDescription";

export default function YoutubeEmbedDemo() {
  return (
    <>
      <LabPageHeader>
        <PageDescription>Youtube Embed</PageDescription>
      </LabPageHeader>

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
