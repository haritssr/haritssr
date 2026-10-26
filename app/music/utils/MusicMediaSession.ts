import { loadMusicBlob } from "./musicDatabase";
import type { MusicTrack } from "./musicState";

interface MusicMediaControls {
  read: () => {
    track: MusicTrack | undefined;
    playing: boolean;
    position: number;
    duration: number;
    connected: boolean;
  };
  play: () => Promise<void>;
  pause: () => void;
  next: () => void;
  previous: () => void;
  seek: (position: number) => void;
}

export default class MusicMediaSession {
  private mediaArtwork: string | null = null;
  private mediaTrackId: string | null = null;
  private readonly controls: MusicMediaControls;

  constructor(controls: MusicMediaControls) {
    this.controls = controls;
  }

  disconnect() {
    if (this.mediaArtwork !== null) {
      URL.revokeObjectURL(this.mediaArtwork);
      this.mediaArtwork = null;
    }
    this.mediaTrackId = null;
    if ("mediaSession" in navigator) {
      for (const action of [
        "play",
        "pause",
        "previoustrack",
        "nexttrack",
        "seekto",
        "seekbackward",
        "seekforward",
      ] as const) {
        try {
          navigator.mediaSession.setActionHandler(action, null);
        } catch {
          /* Optional browser capability. */
        }
      }
      navigator.mediaSession.metadata = null;
      navigator.mediaSession.playbackState = "none";
    }
  }

  update() {
    if (!("mediaSession" in navigator)) {
      return;
    }
    const { track, playing } = this.controls.read();
    if ((track?.id ?? null) !== this.mediaTrackId) {
      if (this.mediaArtwork !== null) {
        URL.revokeObjectURL(this.mediaArtwork);
        this.mediaArtwork = null;
      }
      this.mediaTrackId = track?.id ?? null;
      if (track?.hasArtwork === true) {
        void this.loadMediaArtwork(track.id);
      }
    }
    try {
      navigator.mediaSession.metadata = track
        ? new MediaMetadata({
            title: track.title,
            artist: track.artist,
            album: track.album,
            artwork:
              this.mediaArtwork === null ? [] : [{ src: this.mediaArtwork }],
          })
        : null;
      let playbackState: MediaSessionPlaybackState = "none";
      if (track) {
        playbackState = playing ? "playing" : "paused";
      }
      navigator.mediaSession.playbackState = playbackState;
      const actions: [MediaSessionAction, MediaSessionActionHandler][] = [
        [
          "play",
          () => {
            void this.controls.play();
          },
        ],
        ["pause", this.controls.pause],
        [
          "nexttrack",
          () => {
            this.controls.next();
          },
        ],
        ["previoustrack", this.controls.previous],
        [
          "seekto",
          (details) => {
            if (details.seekTime !== undefined) {
              this.controls.seek(details.seekTime);
            }
          },
        ],
        [
          "seekbackward",
          (details) => {
            this.controls.seek(
              this.controls.read().position - (details.seekOffset ?? 10)
            );
          },
        ],
        [
          "seekforward",
          (details) => {
            this.controls.seek(
              this.controls.read().position + (details.seekOffset ?? 10)
            );
          },
        ],
      ];
      for (const [action, handler] of actions) {
        try {
          navigator.mediaSession.setActionHandler(action, handler);
        } catch {
          /* Each action is optional. */
        }
      }
      this.updatePosition();
    } catch {
      /* Media controls do not affect in-app playback. */
    }
  }
  private async loadMediaArtwork(id: string) {
    try {
      const blob = await loadMusicBlob(id, "artwork");
      if (
        blob === undefined ||
        this.mediaTrackId !== id ||
        !this.controls.read().connected
      ) {
        return;
      }
      this.mediaArtwork = URL.createObjectURL(blob);
      this.update();
    } catch {
      /* Artwork is optional for platform media controls. */
    }
  }

  updatePosition() {
    const { position, duration } = this.controls.read();
    if (
      !("mediaSession" in navigator) ||
      typeof navigator.mediaSession.setPositionState !== "function" ||
      duration <= 0
    ) {
      return;
    }
    try {
      navigator.mediaSession.setPositionState({
        duration,
        position: Math.min(position, duration),
      });
    } catch {
      /* Optional platform integration. */
    }
  }
}
