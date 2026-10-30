"use client";

// Store instances must be recreated after Fast Refresh to pick up new methods.
// @refresh reset

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import MusicStore from "../utils/MusicStore";
import FloatingMusicDock from "./FloatingMusicDock";

export default function MusicRuntime({
  onReady,
}: {
  onReady: (store: MusicStore) => void;
}) {
  const pathname = usePathname();
  // oxlint-disable-next-line react/hook-use-state -- One stable external store owns the audio runtime.
  const [store] = useState(() => new MusicStore());
  useEffect(() => {
    onReady(store);
    void store.connect();
    return store.disconnect;
  }, [onReady, store]);
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
      const current = store.currentTrack();
      if (pathname !== "/music" && (snapshot.session.dismissed || !current)) {
        return;
      }
      if (current) {
        event.preventDefault();
        store.toggle();
      } else {
        const first = snapshot.tracks.at(0);
        if (first !== undefined) {
          event.preventDefault();
          store.startTrack(
            first.id,
            snapshot.tracks.map((track) => track.id)
          );
        }
      }
    }
    if (pathname !== "/timer") {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [pathname, store]);
  return <FloatingMusicDock store={store} />;
}
