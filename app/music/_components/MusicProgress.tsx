"use client";

import { useSyncExternalStore } from "react";

import Slider from "@/components/Slider";

import { musicTime } from "../utils/musicState";
import type MusicStore from "../utils/MusicStore";

export default function MusicProgress({
  store,
  compact = false,
}: {
  store: MusicStore;
  compact?: boolean;
}) {
  const { position, duration } = useSyncExternalStore(
    store.subscribeClock,
    store.getClock,
    store.getClock
  );
  if (compact) {
    return (
      <progress
        aria-label="Song progress"
        className="bg-border [&::-webkit-progress-bar]:bg-border block h-2 w-full min-w-0 appearance-none overflow-hidden rounded-full border-0 sm:h-1.5 [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-(--music-progress-fill) [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-(--music-progress-fill)"
        max={duration || 1}
        value={Math.min(position, duration || 0)}
      />
    );
  }
  return (
    <div className="space-y-1.5">
      <div className="text-muted relative flex justify-between text-xs tabular-nums">
        <span className="text-music-accent">{musicTime(position)}</span>
        <span>
          {duration > 0
            ? `-${musicTime(Math.max(0, duration - position))}`
            : "—"}
        </span>
      </div>
      {duration > 0 ? (
        <Slider
          label="Song position"
          max={duration}
          min={0}
          onValueChange={(value) => {
            store.seek(value);
          }}
          step={1}
          trackClassName="h-2"
          variant="music"
          value={Math.min(position, duration)}
          valueText={`${musicTime(position)} of ${musicTime(duration)}`}
        />
      ) : (
        <p className="text-muted text-sm">
          Duration available when playback starts.
        </p>
      )}
    </div>
  );
}
