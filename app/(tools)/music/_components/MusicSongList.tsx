"use client";

import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useRef, useState, useSyncExternalStore } from "react";

import { includedTrack } from "../data";
import type { MusicTrack } from "../utils/musicState";
import type MusicStore from "../utils/MusicStore";
import MusicArtwork from "./MusicArtwork";
import MusicPlaybackControls from "./MusicPlaybackControls";
import MusicProgress from "./MusicProgress";
import MusicTrackMenu from "./MusicTrackMenu";

export default function MusicSongList({
  store,
  filtered,
  empty,
  ready,
}: {
  store: MusicStore;
  filtered: MusicTrack[];
  empty: boolean;
  ready: boolean;
}) {
  const list = useRef<HTMLUListElement>(null);
  const [drag, setDrag] = useState<{
    id: string;
    target: string;
    after: boolean;
  } | null>(null);
  const { playing } = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getSnapshot
  );
  const current = store.currentTrack();
  const ids = filtered.map((track) => track.id);
  if (!ready) {
    return (
      <output className="text-muted block p-3">Opening your library…</output>
    );
  }
  if (empty) {
    return (
      <p className="text-muted p-3">
        Your library is empty. Choose a few MP3s from your device to listen here
        and across the site.
      </p>
    );
  }
  if (filtered.length === 0) {
    return <p className="text-muted p-3">No songs match your search.</p>;
  }
  const dropIndicator =
    drag?.after === true
      ? "after:bg-action after:absolute after:inset-x-0 after:bottom-0 after:h-0.5"
      : "before:bg-action before:absolute before:inset-x-0 before:top-0 before:h-0.5";
  return (
    <ul className="divide-border divide-y" ref={list}>
      {filtered.map((track) => (
        <li
          className={`group/song hover:bg-interface-hover relative min-w-0 overflow-hidden ${track.id === current?.id ? "bg-interface-hover" : ""} ${drag?.id === track.id ? "bg-action/5 opacity-60" : ""} ${drag?.target === track.id && drag.id !== track.id ? dropIndicator : ""}`}
          data-current={track.id === current?.id}
          data-music-track={track.id}
          key={track.id}
        >
          <div className="flex min-w-0 flex-wrap items-center gap-2 px-2 py-1.5">
            <button
              aria-label={`Reorder ${track.title}. Drag or use up and down arrow keys.`}
              className="text-muted hover:bg-foreground/5 hover:text-foreground focus-visible:outline-action flex min-h-10 w-4 shrink-0 cursor-grab touch-none items-center justify-center rounded-sm focus-visible:outline-2 active:cursor-grabbing"
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setDrag(null);
                } else if (
                  event.key === "ArrowUp" ||
                  event.key === "ArrowDown"
                ) {
                  event.preventDefault();
                  void store.moveTrack(
                    track.id,
                    event.key === "ArrowUp" ? -1 : 1
                  );
                }
              }}
              onPointerDown={(event) => {
                if (!event.isPrimary || event.button !== 0) {
                  return;
                }
                event.currentTarget.setPointerCapture(event.pointerId);
                setDrag({ id: track.id, target: track.id, after: false });
              }}
              onPointerMove={(event) => {
                if (
                  !drag ||
                  !event.currentTarget.hasPointerCapture(event.pointerId)
                ) {
                  return;
                }
                const rows =
                  list.current?.querySelectorAll<HTMLElement>(
                    "[data-music-track]"
                  );
                if (!rows) {
                  return;
                }
                let nearest: HTMLElement | undefined;
                let distance = Number.POSITIVE_INFINITY;
                for (const row of rows) {
                  const bounds = row.getBoundingClientRect();
                  const delta = Math.abs(
                    event.clientY - (bounds.top + bounds.height / 2)
                  );
                  if (delta < distance) {
                    nearest = row;
                    distance = delta;
                  }
                }
                const target = nearest?.dataset.musicTrack;
                if (nearest && target !== undefined) {
                  const bounds = nearest.getBoundingClientRect();
                  const after = event.clientY > bounds.top + bounds.height / 2;
                  if (target !== drag.target || after !== drag.after) {
                    setDrag({ ...drag, target, after });
                  }
                }
                if (event.clientY < 64) {
                  window.scrollBy(0, -16);
                } else if (event.clientY > window.innerHeight - 64) {
                  window.scrollBy(0, 16);
                }
              }}
              onPointerUp={() => {
                if (drag) {
                  void store.reorderTrack(drag.id, drag.target, drag.after);
                  setDrag(null);
                }
              }}
              onPointerCancel={() => {
                setDrag(null);
              }}
              onLostPointerCapture={() => {
                setDrag(null);
              }}
              title="Drag to reorder"
              type="button"
            >
              <svg
                aria-hidden="true"
                className="size-4"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <circle cx="5" cy="3" r="1.25" />
                <circle cx="11" cy="3" r="1.25" />
                <circle cx="5" cy="8" r="1.25" />
                <circle cx="11" cy="8" r="1.25" />
                <circle cx="5" cy="13" r="1.25" />
                <circle cx="11" cy="13" r="1.25" />
              </svg>
            </button>
            <div className="flex min-w-0 flex-1 basis-0 items-center gap-2 group-data-[current=true]/song:basis-64 sm:gap-0">
              <button
                aria-label={`${track.id === current?.id && playing ? "Pause" : "Play"} ${track.title}${includedTrack(track.id) ? "" : " (imported song)"}`}
                className="focus-visible:outline-action text-foreground group-data-[current=true]/song:text-music -my-2 flex min-w-0 flex-1 cursor-pointer items-center gap-2 rounded-md text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={() => {
                  if (track.id === current?.id) {
                    store.toggle();
                  } else {
                    store.startTrack(track.id, ids);
                  }
                }}
                type="button"
              >
                <MusicArtwork
                  className="text-muted group-data-[current=true]/song:text-music h-10 w-5 [&>svg]:size-5"
                  track={track}
                />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 text-sm font-medium">
                    <span className="text-foreground group-data-[current=true]/song:text-music truncate">
                      {track.title}
                    </span>
                    {includedTrack(track.id) ? null : (
                      <span
                        className="text-muted shrink-0"
                        title="Imported song"
                      >
                        <ArrowDownTrayIcon
                          aria-hidden="true"
                          className="size-3.5"
                        />
                      </span>
                    )}
                  </span>
                  <span className="text-muted block truncate text-xs">
                    {track.artist}
                    {track.album ? ` · ${track.album}` : ""}
                  </span>
                </span>
              </button>
              {track.id === current?.id ? (
                <div className="max-w-xs min-w-0 flex-1 pr-2">
                  <MusicProgress store={store} />
                </div>
              ) : null}
            </div>
            <div className="max-lg:group-data-[current=true]/song:border-border flex flex-wrap items-center justify-end gap-0 max-lg:group-data-[current=true]/song:w-full max-lg:group-data-[current=true]/song:basis-full max-lg:group-data-[current=true]/song:justify-between max-lg:group-data-[current=true]/song:border-t max-lg:group-data-[current=true]/song:border-dashed max-lg:group-data-[current=true]/song:pt-1">
              {track.id === current?.id ? (
                <MusicPlaybackControls store={store} />
              ) : null}
              <MusicTrackMenu store={store} track={track} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
