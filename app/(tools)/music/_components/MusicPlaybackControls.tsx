"use client";

import { Popover } from "@base-ui/react/popover";
import {
  ArrowPathRoundedSquareIcon,
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import { useState, useSyncExternalStore } from "react";

import Button from "@/components/Button";
import Slider from "@/components/Slider";

import type { MusicSession } from "../utils/musicState";
import type MusicStore from "../utils/MusicStore";

import styles from "../Music.module.css";

function PlaybackIcon({ playing }: { playing: boolean }) {
  return playing ? (
    <PauseIcon aria-hidden="true" className="size-6" />
  ) : (
    <PlayIcon aria-hidden="true" className="size-6" />
  );
}

export default function MusicPlaybackControls({
  store,
}: {
  store: MusicStore;
}) {
  const { session, playing, volumeSupported } = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getSnapshot
  );
  const [volumeOpen, setVolumeOpen] = useState(false);
  const muted = session.muted || session.volume === 0;
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
      className="contents lg:ml-5 lg:flex lg:items-center lg:justify-end lg:gap-0"
    >
      <Button
        aria-label="Previous song"
        disabled={!current}
        onClick={() => {
          store.previous();
        }}
        size="icon-circle"
        variant="icon-hover"
      >
        <BackwardIcon aria-hidden="true" className="size-5 -translate-x-px" />
      </Button>
      <Button
        aria-label={playing ? "Pause music" : "Play music"}
        disabled={!current}
        onClick={() => {
          store.toggle();
        }}
        size="icon-circle"
        variant="icon-hover"
      >
        <PlaybackIcon playing={playing} />
      </Button>
      <Button
        aria-label="Next song"
        disabled={!current}
        onClick={() => {
          store.next();
        }}
        size="icon-circle"
        variant="icon-hover"
      >
        <ForwardIcon aria-hidden="true" className="size-5 translate-x-px" />
      </Button>
      <div className="contents lg:flex lg:items-center lg:gap-0">
        <Button
          aria-label="Shuffle"
          title={session.shuffle ? "Shuffle: On" : "Shuffle: Off"}
          size="icon-circle"
          aria-pressed={session.shuffle}
          onClick={() => {
            store.preferences({ shuffle: !session.shuffle });
          }}
          variant={session.shuffle ? "icon-active-hover" : "icon-hover"}
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
          size="icon-circle"
          onClick={() => {
            store.preferences({
              repeat: nextRepeat[session.repeat],
            });
          }}
          variant={
            session.repeat === "off" ? "icon-hover" : "icon-active-hover"
          }
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
        <Popover.Root
          open={volumeOpen}
          onOpenChange={(open) => {
            setVolumeOpen(open);
          }}
        >
          <Popover.Trigger
            aria-label="Music volume"
            openOnHover
            delay={0}
            closeDelay={150}
            render={
              <Button
                size="icon-circle"
                variant={volumeOpen ? "icon-active-hover" : "icon-hover"}
              />
            }
          >
            {muted ? (
              <SpeakerXMarkIcon aria-hidden="true" className="size-5" />
            ) : (
              <SpeakerWaveIcon aria-hidden="true" className="size-5" />
            )}
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Positioner
              align="center"
              className="z-50"
              side="top"
              sideOffset={2}
            >
              <Popover.Popup
                aria-label="Music volume"
                initialFocus={false}
                className={`${styles.volumeControls} border-border bg-background/70 shadow-foreground/10 border-hairline flex flex-col items-center gap-2 rounded-full px-2 pt-4 pb-2 shadow-lg outline-hidden backdrop-blur-md [corner-shape:round] ${volumeSupported ? "" : "w-40"}`}
              >
                {volumeSupported ? (
                  <Slider
                    label="Music volume"
                    orientation="vertical"
                    variant="music"
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
                <Button
                  aria-label={muted ? "Unmute music" : "Mute music"}
                  aria-pressed={muted}
                  title={muted ? "Unmute music" : "Mute music"}
                  size="text"
                  variant="icon"
                  onClick={() => {
                    store.preferences({
                      muted: !muted,
                      ...(muted && session.volume === 0 ? { volume: 1 } : {}),
                    });
                  }}
                >
                  {muted ? (
                    <SpeakerXMarkIcon aria-hidden="true" className="size-5" />
                  ) : (
                    <SpeakerWaveIcon aria-hidden="true" className="size-5" />
                  )}
                </Button>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </div>
  );
}
