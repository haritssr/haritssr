"use client";

import { useMemo, useSyncExternalStore } from "react";

import type { Progress } from "./model";
import {
  initialProgress,
  restoreProgress,
  serializeProgress,
  STORAGE_KEY,
} from "./model";

interface Snapshot {
  readonly progress: Progress;
  readonly ready: boolean;
  readonly persistent: boolean;
}

const serverSnapshot: Snapshot = {
  progress: initialProgress,
  ready: false,
  persistent: true,
};

function createProgressStore() {
  let snapshot = serverSnapshot;
  const listeners = new Set<() => void>();
  const notify = () => {
    for (const listener of listeners) {
      listener();
    }
  };

  return {
    getSnapshot: () => snapshot,
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      if (!snapshot.ready) {
        let progress = initialProgress;
        let persistent = true;
        try {
          const saved = localStorage.getItem(STORAGE_KEY);
          if (saved !== null && saved.length > 0) {
            try {
              progress = restoreProgress(JSON.parse(saved));
            } catch {
              progress = initialProgress;
            }
          }
        } catch {
          persistent = false;
        }
        snapshot = { progress, ready: true, persistent };
        notify();
      }
      return () => {
        listeners.delete(listener);
      };
    },
    update: (updater: (progress: Progress) => Progress) => {
      if (!snapshot.ready) {
        return;
      }
      const progress = updater(snapshot.progress);
      let { persistent } = snapshot;
      try {
        localStorage.setItem(STORAGE_KEY, serializeProgress(progress));
      } catch {
        persistent = false;
      }
      snapshot = { progress, ready: true, persistent };
      notify();
    },
  };
}

export function useProgress() {
  const store = useMemo(() => createProgressStore(), []);
  const snapshot = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    () => serverSnapshot
  );
  return { ...snapshot, update: store.update };
}
