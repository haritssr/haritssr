"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRef, useState, useSyncExternalStore } from "react";

import Button from "@/components/Button";

import type MusicStore from "../utils/MusicStore";
import { useMusicStore } from "./MusicProvider";
import MusicSongList from "./MusicSongList";
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
          className={`${styles.controls} border-border min-w-0 overflow-hidden rounded-xl border`}
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
            <label className="relative block min-w-0 flex-1">
              <span className="sr-only">Search your library</span>
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="text-muted pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
              />
              <input
                className="form-control border-border text-foreground/90 placeholder:text-muted focus:border-foreground/80 focus:ring-foreground/20 w-full min-w-0 appearance-none rounded-lg border bg-white py-2 pr-3 pl-9 text-sm outline-hidden focus:ring-2"
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
          <MusicSongList
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
