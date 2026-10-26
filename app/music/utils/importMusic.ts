import { includedMusic } from "../data";
import { saveTrack } from "./musicDatabase";
import type { MusicTrack } from "./musicState";

function fileSignature(file: File): string {
  return JSON.stringify([file.name, file.size, file.lastModified]);
}

async function thumbnail(data: Uint8Array, type: string): Promise<Blob | null> {
  const blob = new Blob([new Uint8Array(data)], { type });
  let bitmap: ImageBitmap | undefined;
  try {
    bitmap = await createImageBitmap(blob);
    const scale = Math.min(1, 256 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext("2d");
    if (!context) {
      return null;
    }
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    // oxlint-disable-next-line promise/avoid-new -- Canvas encoding uses a callback API.
    return await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/webp", 0.8);
    });
  } catch {
    return null;
  } finally {
    bitmap?.close();
  }
}

function tagText(value: string | undefined, fallback: string): string {
  const text = value?.trim() ?? "";
  return text.length > 0 ? text : fallback;
}

async function readMusicFile(
  file: File
): Promise<{ track: MusicTrack; artwork: Blob | null }> {
  if (!file.name.toLowerCase().endsWith(".mp3") || file.size === 0) {
    throw new Error("Choose a non-empty MP3 file.");
  }
  const { parseBlob, selectCover } = await import("music-metadata");
  const metadata = await parseBlob(file, { duration: true });
  if (
    metadata.format.container !== "MPEG" ||
    metadata.format.codec?.endsWith("Layer 3") !== true
  ) {
    throw new Error("This file is not a supported MP3.");
  }
  const included = includedMusic.find(
    (song) =>
      song.size === file.size &&
      (file.name === song.filename || file.name === `${song.id.slice(9)}.mp3`)
  );
  const filenameTitle = file.name
    .replace(/\.mp3$/i, "")
    .replaceAll(/[-_]+/g, " ")
    .replaceAll(/\b\w/g, (letter) => letter.toUpperCase());
  const cover = selectCover(metadata.common.picture);
  const artwork = cover ? await thumbnail(cover.data, cover.format) : null;
  return {
    track: {
      id: crypto.randomUUID(),
      signature: fileSignature(file),
      filename: file.name,
      title: tagText(metadata.common.title, included?.title ?? filenameTitle),
      artist: tagText(
        metadata.common.artist,
        included?.artist ?? "Unknown artist"
      ),
      album: tagText(metadata.common.album, ""),
      duration: metadata.format.duration ?? 0,
      size: file.size,
      hasArtwork: artwork !== null,
    },
    artwork,
  };
}

export async function importMusicFiles(
  files: File[],
  tracks: MusicTrack[],
  onProgress: (message: string) => void,
  onTrack: (track: MusicTrack) => void
) {
  let imported = 0;
  let skipped = 0;
  const failures: string[] = [];
  const signatures = new Set(tracks.map((track) => track.signature));
  for (const [index, file] of files.entries()) {
    onProgress(`${index + 1}/${files.length}: ${file.name}`);
    if (signatures.has(fileSignature(file))) {
      skipped += 1;
      continue;
    }
    try {
      // oxlint-disable-next-line no-await-in-loop -- Process one MP3 at a time to bound import memory.
      const { track, artwork } = await readMusicFile(file);
      // oxlint-disable-next-line no-await-in-loop -- Commit this file before loading another MP3.
      await saveTrack(track, file, artwork);
      signatures.add(track.signature);
      onTrack(track);
      imported += 1;
    } catch (error) {
      let reason = "Import failed.";
      if (error instanceof Error) {
        reason = error.message;
      }
      if (
        error instanceof DOMException &&
        error.name === "QuotaExceededError"
      ) {
        reason = "Not enough device storage.";
      }
      failures.push(`${file.name}: ${reason}`);
    }
  }
  return {
    imported,
    notice: `${imported} imported${skipped ? `, ${skipped} duplicates skipped` : ""}.`,
    error: failures.length ? failures.join(" ") : null,
  };
}
