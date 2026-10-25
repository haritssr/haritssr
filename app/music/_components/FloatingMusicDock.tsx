"use client";

import {
  ForwardIcon,
  MusicalNoteIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";

import Button from "@/components/Button";
import { FloatingDockSlot } from "@/components/floating/FloatingDock";
import InternalLink from "@/components/InternalLink";

import { musicTime } from "../utils/musicState";
import type MusicStore from "../utils/MusicStore";
import MusicProgress from "./MusicProgress";

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
  return (
    <FloatingDockSlot position="music">
      <section
        aria-label="Floating music player"
        className={`${styles.accent} pointer-events-auto w-full space-y-2 sm:w-[22.4rem]`}
      >
        <div className="border-foreground/10 bg-background/70 shadow-foreground/10 flex min-h-(--floating-tabbar-height,3.3125rem) items-center gap-2 rounded-full border py-2 pr-2 pl-3 shadow-lg backdrop-blur-md [corner-shape:round]">
          <InternalLink
            className="mr-auto min-w-0 flex-1"
            href="/music"
            variant="control"
            onClick={(event) => {
              if (!navigator.onLine) {
                event.preventDefault();
                window.location.assign("/music");
              }
            }}
          >
            <span className="block min-w-0 space-y-1.5 max-sm:space-y-2">
              <span className="flex min-w-0 items-center justify-between gap-2">
                <span className="text-foreground flex min-w-0 items-center gap-1 text-sm leading-4 font-medium">
                  <MusicalNoteIcon
                    aria-hidden="true"
                    className="size-4 shrink-0"
                  />
                  <span className="truncate">{track.title}</span>
                </span>
                <MusicTimeLeft store={store} />
              </span>
              <MusicProgress compact store={store} />
            </span>
          </InternalLink>
          <Button
            aria-label="Next song"
            onClick={() => {
              store.next();
            }}
            size="icon-circle"
            variant="outline"
          >
            <ForwardIcon
              aria-hidden="true"
              className="size-4.5 translate-x-px"
              strokeWidth={2}
            />
          </Button>
          <Button
            aria-label="Pause and dismiss music"
            onClick={() => {
              store.dismiss();
            }}
            size="icon-circle"
            variant="outline"
          >
            <XMarkIcon
              aria-hidden="true"
              className="size-4.5"
              strokeWidth={2.5}
            />
          </Button>
          <Button
            aria-label={playing ? "Pause music" : "Play music"}
            onClick={() => {
              store.toggle();
            }}
            size="icon-circle"
            variant="music"
          >
            {playing ? (
              <PauseIcon aria-hidden="true" className="size-4.5" />
            ) : (
              <PlayIcon
                aria-hidden="true"
                className="size-4.5 translate-x-px"
              />
            )}
          </Button>
        </div>
        {error === null ? null : (
          <p
            className="border-border bg-background text-danger rounded-xl border p-3 text-sm"
            role="alert"
          >
            {error}
          </p>
        )}
      </section>
    </FloatingDockSlot>
  );
}

function MusicTimeLeft({ store }: { store: MusicStore }) {
  const { position, duration } = useSyncExternalStore(
    store.subscribeClock,
    store.getClock,
    store.getClock
  );
  return (
    <span className="text-muted shrink-0 text-sm leading-4 whitespace-nowrap tabular-nums">
      {duration > 0 ? `-${musicTime(Math.max(0, duration - position))}` : "—"}
    </span>
  );
}
