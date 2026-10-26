"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
} from "react";
import type { ReactNode } from "react";

import { MUSIC_ACTIVE_KEY } from "../utils/musicState";
import type MusicStore from "../utils/MusicStore";

const MusicRuntime = dynamic(async () => await import("./MusicRuntime"));
const MusicContext = createContext<MusicStore | null>(null);

export default function MusicProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [activated, setActivated] = useState(false);
  const [store, setStore] = useState<MusicStore | null>(null);
  const remembered = useSyncExternalStore(
    subscribeRemembered,
    getRemembered,
    () => false
  );
  if ((pathname === "/music" || remembered) && !activated) {
    setActivated(true);
  }
  return (
    <MusicContext value={store}>
      {children}
      {activated ? <MusicRuntime onReady={setStore} /> : null}
    </MusicContext>
  );
}

export function useMusicStore() {
  return useContext(MusicContext);
}

function getRemembered() {
  try {
    return localStorage.getItem(MUSIC_ACTIVE_KEY) === "true";
  } catch {
    return false;
  }
}

function subscribeRemembered(listener: () => void) {
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener("storage", listener);
  };
}
