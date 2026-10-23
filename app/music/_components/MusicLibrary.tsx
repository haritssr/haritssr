"use client";

import { Menu } from "@base-ui/react/menu";
import { Popover } from "@base-ui/react/popover";
import {
  ArrowDownTrayIcon,
  ArrowPathRoundedSquareIcon,
  BackwardIcon,
  AdjustmentsHorizontalIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import Button from "@/components/Button";
import Slider from "@/components/Slider";

import { includedTrack } from "../data";
import type { MusicSession, MusicTrack } from "../utils/musicState";
import type MusicStore from "../utils/MusicStore";
import EditSongDialog from "./EditSongDialog";
import MusicArtwork from "./MusicArtwork";
import MusicProgress from "./MusicProgress";
import { useMusicStore } from "./MusicProvider";
import useMusicOffline from "./useMusicOffline";

import styles from "../Music.module.css";

export default function MusicLibrary() {
  const store = useMusicStore();
  return store ? (
    <Library store={store} />
  ) : (
    <output className="text-muted">Loading Music…</output>
  );
}

function Library({ store }: { store: MusicStore }) {
  const { tracks, ready, importing, notice, error } = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getSnapshot
  );
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  useMusicOffline(tracks.length);
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        event.code !== "Space" ||
        event.defaultPrevented ||
        event.repeat ||
        event.isComposing ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      ) {
        return;
      }
      const { target } = event;
      if (
        (target instanceof HTMLElement && target.isContentEditable) ||
        (target instanceof Element &&
          target.closest(
            "input, textarea, select, button, a, summary, [role='button'], [role='textbox'], [role='slider'], [role='menuitem'], [role='dialog'], [role='alertdialog']"
          ) !== null) ||
        document.querySelector("[role='dialog'], [role='alertdialog']") !== null
      ) {
        return;
      }
      const snapshot = store.getSnapshot();
      if (!snapshot.ready) {
        return;
      }
      event.preventDefault();
      if (store.currentTrack()) {
        store.toggle();
      } else {
        const first = snapshot.tracks.at(0);
        if (first !== undefined) {
          store.startTrack(
            first.id,
            snapshot.tracks.map((track) => track.id)
          );
        }
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [store]);
  const search = query.trim().toLocaleLowerCase();
  const filtered = tracks.filter((track) =>
    `${track.title} ${track.artist} ${track.album} ${track.filename}`
      .toLocaleLowerCase()
      .includes(search)
  );
  return (
    <div className="min-w-0 space-y-12">
      {importing !== null || notice !== null || error !== null ? (
        <div className="space-y-3">
          {importing === null ? null : (
            <output className="text-action block text-sm wrap-break-word">
              Importing {importing}
            </output>
          )}
          {notice === null ? null : (
            <output className="text-foreground block text-sm">{notice}</output>
          )}
          {error === null ? null : (
            <p className="text-danger text-sm wrap-break-word" role="alert">
              {error}
            </p>
          )}
        </div>
      ) : null}
      <div className="min-w-0">
        <div
          aria-label="Library"
          className="border-border min-w-0 overflow-hidden rounded-xl border"
          onDragOver={(event) => {
            event.preventDefault();
          }}
          onDrop={(event) => {
            event.preventDefault();
            if (ready && importing === null) {
              void store.importFiles([...event.dataTransfer.files]);
            }
          }}
        >
          <div className="border-border flex flex-col items-stretch gap-3 border-b p-3 sm:flex-row sm:items-center">
            <label className="block min-w-0 flex-1">
              <span className="sr-only">Search your library</span>
              <input
                className="form-control border-border text-foreground/90 placeholder:text-muted focus:border-foreground/80 focus:ring-foreground/20 w-full min-w-0 appearance-none rounded-lg border bg-white px-3 py-2 text-sm outline-hidden focus:ring-2"
                onChange={(event) => {
                  setQuery(event.currentTarget.value);
                }}
                placeholder="Search songs, artists, albums…"
                type="search"
                value={query}
              />
            </label>
            <div className="border-border bg-interface-hover flex min-h-10 min-w-0 flex-1 items-center justify-center gap-1 rounded-lg border border-dashed p-2">
              <input
                accept=".mp3,audio/mpeg"
                aria-label="Import MP3 files"
                className="sr-only"
                disabled={!ready || importing !== null}
                multiple
                onChange={(event) => {
                  void store.importFiles([
                    ...(event.currentTarget.files ?? []),
                  ]);
                  event.currentTarget.value = "";
                }}
                ref={input}
                type="file"
              />
              <Button
                disabled={!ready || importing !== null}
                onClick={() => {
                  input.current?.click();
                }}
                size="text"
                variant="neutral-subtle-underlined"
              >
                Import
              </Button>
              <span className="text-muted truncate text-sm">
                or drop MP3 files here
              </span>
            </div>
          </div>
          <SongList
            store={store}
            filtered={filtered}
            empty={tracks.length === 0}
            ready={ready}
          />
        </div>
      </div>
    </div>
  );
}

function PlaybackIcon({ playing }: { playing: boolean }) {
  return playing ? (
    <PauseIcon aria-hidden="true" className="size-6" />
  ) : (
    <PlayIcon aria-hidden="true" className="size-6" />
  );
}

function TrackMenu({ track, store }: { track: MusicTrack; store: MusicStore }) {
  const [editing, setEditing] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const item =
    "hover:bg-interface-hover data-highlighted:bg-interface-hover cursor-pointer rounded-md px-3 py-2 text-sm outline-hidden";
  return (
    <>
      <Menu.Root>
        <Menu.Trigger
          ref={trigger}
          aria-label={`Actions for ${track.title}`}
          render={<Button size="icon-large" variant="icon" />}
        >
          <AdjustmentsHorizontalIcon aria-hidden="true" className="size-5" />
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner align="end" className="z-80" sideOffset={6}>
            <Menu.Popup
              className={`${styles.accent} border-border bg-background shadow-floating min-w-40 rounded-xl border p-1 outline-hidden`}
            >
              <Menu.Item
                className={item}
                onClick={() => {
                  setEditing(true);
                }}
              >
                Edit song details
              </Menu.Item>
              {includedTrack(track.id) ? null : (
                <Menu.Item
                  className={`${item} text-danger`}
                  onClick={() => {
                    void store.removeTrack(track.id);
                  }}
                >
                  Remove from library
                </Menu.Item>
              )}
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
      {editing ? (
        <EditSongDialog
          track={track}
          store={store}
          onClose={() => {
            setEditing(false);
          }}
          finalFocus={trigger}
        />
      ) : null}
    </>
  );
}

function PlaybackControls({ store }: { store: MusicStore }) {
  const { session, playing, volumeSupported } = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getSnapshot
  );
  const current = store.currentTrack();
  const repeatLabels = { off: "Off", all: "All", one: "One" };
  const nextRepeat: Record<MusicSession["repeat"], MusicSession["repeat"]> = {
    off: "all",
    all: "one",
    one: "off",
  };
  return (
    <div
      aria-label="Playback controls"
      className="ml-2 flex flex-wrap items-center justify-end gap-0 lg:ml-5"
    >
      <Button
        aria-label="Previous song"
        disabled={!current}
        onClick={() => {
          store.previous();
        }}
        size="icon-large"
        variant="icon"
      >
        <BackwardIcon aria-hidden="true" className="size-5" />
      </Button>
      <Button
        aria-label={playing ? "Pause music" : "Play music"}
        disabled={!current}
        onClick={() => {
          store.toggle();
        }}
        size="icon-large"
        variant="icon"
      >
        <PlaybackIcon playing={playing} />
      </Button>
      <Button
        aria-label="Next song"
        disabled={!current}
        onClick={() => {
          store.next();
        }}
        size="icon-large"
        variant="icon"
      >
        <ForwardIcon aria-hidden="true" className="size-5" />
      </Button>
      <div className="flex items-center gap-0">
        <Button
          aria-label="Shuffle"
          title={session.shuffle ? "Shuffle: On" : "Shuffle: Off"}
          size="icon-large"
          aria-pressed={session.shuffle}
          onClick={() => {
            store.preferences({ shuffle: !session.shuffle });
          }}
          variant={session.shuffle ? "icon-active" : "icon"}
        >
          <svg
            aria-hidden="true"
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h2c5 0 9 12 14 12h2m-4-4 4 4-4 4M3 18h2c2 0 4-2 5.5-4m3-4C15 8 17 6 19 6h2m-4-4 4 4-4 4" />
          </svg>
        </Button>
        <Button
          aria-label={`Repeat: ${repeatLabels[session.repeat]}. Switch to ${repeatLabels[nextRepeat[session.repeat]].toLowerCase()}`}
          title={`Repeat: ${repeatLabels[session.repeat]}`}
          size="icon-large"
          onClick={() => {
            store.preferences({
              repeat: nextRepeat[session.repeat],
            });
          }}
          variant={session.repeat === "off" ? "icon" : "icon-active"}
        >
          <span aria-hidden="true" className="relative block size-5">
            <ArrowPathRoundedSquareIcon className="size-5" />
            {session.repeat === "one" ? (
              <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                1
              </span>
            ) : null}
          </span>
        </Button>
        <Popover.Root>
          <Popover.Trigger
            aria-label="Music volume"
            title="Music volume"
            render={<Button size="icon-large" variant="icon" />}
          >
            {session.muted || session.volume === 0 ? (
              <SpeakerXMarkIcon aria-hidden="true" className="size-5" />
            ) : (
              <SpeakerWaveIcon aria-hidden="true" className="size-5" />
            )}
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner
              align="end"
              className="z-50"
              side="top"
              sideOffset={8}
            >
              <Popover.Popup className="border-border bg-background w-56 rounded-xl border p-3 shadow-xl outline-hidden">
                {volumeSupported ? (
                  <Slider
                    label="Music volume"
                    max={100}
                    min={0}
                    onValueChange={(volume) => {
                      store.preferences({
                        volume: volume / 100,
                        muted: volume === 0,
                      });
                    }}
                    step={1}
                    value={session.muted ? 0 : Math.round(session.volume * 100)}
                    valueText={`${session.muted ? 0 : Math.round(session.volume * 100)}%`}
                  />
                ) : (
                  <p className="text-muted text-xs">
                    Use device volume controls.
                  </p>
                )}
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </div>
  );
}

function SongList({
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
          className={`group/song relative min-w-0 overflow-hidden ${track.id === current?.id ? "bg-interface-hover" : ""} ${drag?.id === track.id ? "bg-action/5 opacity-60" : ""} ${drag?.target === track.id && drag.id !== track.id ? dropIndicator : ""}`}
          data-current={track.id === current?.id}
          data-music-track={track.id}
          key={track.id}
        >
          <div className="flex min-w-0 flex-wrap items-center gap-0 px-3 py-2">
            <button
              aria-label={`Reorder ${track.title}. Drag or use up and down arrow keys.`}
              className="text-muted hover:bg-foreground/5 hover:text-foreground focus-visible:outline-action flex min-h-10 w-6 shrink-0 cursor-grab touch-none items-center justify-center rounded-sm focus-visible:outline-2 active:cursor-grabbing"
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
            <div className="flex min-w-0 flex-1 basis-64 items-center gap-3 sm:gap-4">
              <button
                aria-label={`${track.id === current?.id && playing ? "Pause" : "Play"} ${track.title}${includedTrack(track.id) ? "" : " (imported song)"}`}
                className="focus-visible:outline-action text-foreground group-data-[current=true]/song:text-music-accent -my-2 flex min-w-0 flex-1 cursor-pointer items-center gap-0 rounded-md text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
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
                  className="text-muted group-data-[current=true]/song:text-music-accent size-10"
                  track={track}
                />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 text-sm font-medium">
                    <span className="text-foreground group-data-[current=true]/song:text-music-accent truncate">
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
                <div className="max-w-xs min-w-0 flex-1">
                  <MusicProgress store={store} />
                </div>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center justify-end gap-0">
              {track.id === current?.id ? (
                <PlaybackControls store={store} />
              ) : null}
              <TrackMenu store={store} track={track} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
