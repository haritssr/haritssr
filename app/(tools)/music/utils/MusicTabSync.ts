import { isMusicRecord, MUSIC_CLAIM_KEY } from "./musicState";

export default class MusicTabSync {
  private channel: BroadcastChannel | null = null;
  private readonly tab = crypto.randomUUID();
  private claim = "";
  ownsSession = true;
  private readonly onClaim: () => void;
  private readonly onLibrary: () => void;

  constructor(onClaim: () => void, onLibrary: () => void) {
    this.onClaim = onClaim;
    this.onLibrary = onLibrary;
  }

  connect() {
    window.addEventListener("storage", this.storage);
    try {
      this.channel = new BroadcastChannel("haritssr-music:v1");
      this.channel.addEventListener(
        "message",
        (event: MessageEvent<unknown>) => {
          if (!isMusicRecord(event.data)) {
            return;
          }
          const { data } = event;
          if (data.type === "play" && typeof data.claim === "string") {
            this.receiveClaim(data.claim);
          }
          if (data.type === "library") {
            this.onLibrary();
          }
        }
      );
    } catch {
      /* Storage events provide cross-tab coordination when available. */
    }
  }

  disconnect() {
    this.channel?.close();
    this.channel = null;
    window.removeEventListener("storage", this.storage);
  }

  private readonly receiveClaim = (claim: string) => {
    if (claim <= this.claim) {
      return;
    }
    this.claim = claim;
    this.ownsSession = false;
    this.onClaim();
  };

  private readonly storage = (event: StorageEvent) => {
    if (event.key === MUSIC_CLAIM_KEY && event.newValue !== null) {
      this.receiveClaim(event.newValue);
    }
    if (event.key === "haritssr-music-library:v1") {
      this.onLibrary();
    }
  };

  claimPlayback() {
    this.ownsSession = true;
    this.claim = `${String(Date.now()).padStart(16, "0")}:${this.tab}`;
    try {
      localStorage.setItem(MUSIC_CLAIM_KEY, this.claim);
    } catch {
      /* BroadcastChannel can still coordinate playback. */
    }
    this.channel?.postMessage({ type: "play", claim: this.claim });
  }

  announceLibrary() {
    this.channel?.postMessage({ type: "library" });
    try {
      localStorage.setItem("haritssr-music-library:v1", crypto.randomUUID());
    } catch {
      /* The current tab remains usable. */
    }
  }
}
