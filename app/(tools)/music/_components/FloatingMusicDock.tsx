"use client";

import { MusicalNoteIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ForwardIcon, PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";

import Button from "@/components/Button";
import {
  FloatingDockNotice,
  FloatingDockSlot,
} from "@/components/floating/FloatingDock";
import FloatingPlayer from "@/components/floating/FloatingPlayer";
import { formatRemainingTime } from "@/components/floating/formatRemainingTime";
import InternalLink from "@/components/InternalLink";

import { musicTime } from "../utils/musicState";
import type MusicStore from "../utils/MusicStore";

import styles from "../Music.module.css";

export default function FloatingMusicDock({ store }: { store: MusicStore }) {
  const pathname = usePathname();
  const { ready, session, playing, error } = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getSnapshot
  );
  const track = store.currentTrack();
  if (pathname === "/music" || !ready || session.dismissed || !track) {
    return null;
  }
  const fullPlayer = (
    <FloatingPlayer>
      <InternalLink
        className="relative mr-1 min-w-0 flex-1 before:absolute before:inset-x-0 before:-inset-y-3.5"
        href="/music"
        variant="floating"
        onClick={(event) => {
          if (!navigator.onLine) {
            event.preventDefault();
            window.location.assign("/music");
          }
        }}
      >
        <span className="flex min-w-0 items-center justify-between gap-2">
          <span className="text-foreground flex min-w-0 items-center gap-1 text-sm leading-4 font-medium">
            <MusicalNoteIcon aria-hidden="true" className="size-4 shrink-0" />
            <span className="truncate">{track.title}</span>
          </span>
          <MusicTimeLeft store={store} />
        </span>
      </InternalLink>
      <Button
        aria-label="Pause and dismiss music"
        data-floating-details=""
        onClick={() => {
          store.dismiss();
        }}
        size="floating-control"
        variant="floating-control"
      >
        <XMarkIcon aria-hidden="true" className="size-5" strokeWidth={2.5} />
      </Button>
      <Button
        aria-label="Next song"
        onClick={() => {
          store.next();
        }}
        size="floating-control"
        variant="floating-control"
      >
        <ForwardIcon aria-hidden="true" className="size-5 translate-x-px" />
      </Button>
      <Button
        aria-label={playing ? "Pause music" : "Play music"}
        data-floating-space="music"
        onClick={() => {
          store.toggle();
        }}
        size="floating-control"
        variant="floating-control"
      >
        {playing ? (
          <PauseIcon aria-hidden="true" className="size-5" />
        ) : (
          <PlayIcon aria-hidden="true" className="size-5 translate-x-px" />
        )}
      </Button>
    </FloatingPlayer>
  );
  return (
    <>
      {error === null ? null : (
        <FloatingDockNotice>
          <p
            className="border-border bg-background text-danger border-hairline pointer-events-auto w-full rounded-xl p-3 text-sm sm:w-[22.4rem]"
            role="alert"
          >
            {error}
          </p>
        </FloatingDockNotice>
      )}
      <FloatingDockSlot position="music">
        <section
          aria-label="Floating music player"
          className={`${styles.accent} pointer-events-auto w-full sm:w-[22.4rem]`}
        >
          {fullPlayer}
        </section>
      </FloatingDockSlot>
    </>
  );
}

function MusicTimeLeft({ store }: { store: MusicStore }) {
  const { position, duration } = useSyncExternalStore(
    store.subscribeClock,
    store.getClock,
    store.getClock
  );
  const remaining = Math.max(0, duration - position);
  return (
    <span
      data-floating-details=""
      className="text-accent shrink-0 text-sm leading-4 whitespace-nowrap tabular-nums"
    >
      {duration > 0 ? (
        <>
          <span className="sr-only">{formatRemainingTime(remaining)}</span>
          <span aria-hidden="true">-{musicTime(remaining)}</span>
        </>
      ) : (
        <>
          <span className="sr-only">Time remaining unavailable</span>
          <span aria-hidden="true">—</span>
        </>
      )}
    </span>
  );
}
