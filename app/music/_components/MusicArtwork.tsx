"use client";

import { MusicalNoteIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import { loadMusicBlob } from "../utils/musicDatabase";
import type { MusicTrack } from "../utils/musicState";

export default function MusicArtwork({
  track,
  className = "text-muted size-10",
}: {
  track?: MusicTrack;
  className?: string;
}) {
  const [image, setImage] = useState<{ id: string; url: string } | null>(null);
  const id = track?.id;
  const hasArtwork = track?.hasArtwork;
  useEffect(() => {
    if (id === undefined || hasArtwork !== true) {
      return () => {
        /* No artwork URL was created. */
      };
    }
    let cancelled = false;
    let url: string | undefined;
    void loadMusicBlob(id, "artwork")
      .then((blob) => {
        if (!blob || cancelled) {
          return;
        }
        url = URL.createObjectURL(blob);
        setImage({ id, url });
      })
      .catch(() => {
        /* Keep the music icon if artwork is unavailable. */
      });
    return () => {
      cancelled = true;
      if (url !== undefined) {
        URL.revokeObjectURL(url);
      }
    };
  }, [id, hasArtwork]);
  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-lg ${className}`}
    >
      {image?.id === id && image ? (
        // oxlint-disable-next-line nextjs/no-img-element -- Device-local blob thumbnails cannot use the server image optimizer.
        <img
          alt=""
          className="h-full w-full object-cover"
          height={256}
          src={image.url}
          width={256}
        />
      ) : (
        <MusicalNoteIcon aria-hidden="true" className="size-1/2" />
      )}
    </span>
  );
}
