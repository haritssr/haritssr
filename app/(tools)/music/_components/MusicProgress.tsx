"use client";

import { useSyncExternalStore } from "react";

import Slider from "@/components/Slider";

import { musicTime } from "../utils/musicState";
import type MusicStore from "../utils/MusicStore";

export default function MusicProgress({ store }: { store: MusicStore }) {
  const { position, duration } = useSyncExternalStore(
    store.subscribeClock,
    store.getClock,
    store.getClock
  );
  return (
    <div className="space-y-1.5">
      <div className="text-muted relative flex justify-between text-xs tabular-nums">
        <span className="text-accent">{musicTime(position)}</span>
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
