"use client";

// Store instances must be recreated after Fast Refresh to pick up new methods.
// @refresh reset

import { useEffect, useState } from "react";

import MusicStore from "../utils/MusicStore";
import FloatingMusicDock from "./FloatingMusicDock";

export default function MusicRuntime({
  onReady,
}: {
  onReady: (store: MusicStore) => void;
}) {
  // oxlint-disable-next-line react/hook-use-state -- One stable external store owns the audio runtime.
  const [store] = useState(() => new MusicStore());
  useEffect(() => {
    onReady(store);
    void store.connect();
    return store.disconnect;
  }, [onReady, store]);
  return <FloatingMusicDock store={store} />;
}
