import { includedMusic, includedTrack } from "../data";
import { importMusicFiles } from "./importMusic";
import {
  deleteTrack,
  loadLibrary,
  loadMusicBlob,
  loadMusicSession,
  saveMusicSession,
  saveLibraryOrder,
  saveTrackDetails,
} from "./musicDatabase";
import MusicMediaSession from "./MusicMediaSession";
import {
  emptySession,
  MUSIC_ACTIVE_KEY,
  nextQueueKey,
  restoreSession,
  sortMusicTracks,
} from "./musicState";
import type { MusicSession, MusicTrack } from "./musicState";
import MusicTabSync from "./MusicTabSync";

interface MusicSnapshot {
  ready: boolean;
  tracks: MusicTrack[];
  session: MusicSession;
  playing: boolean;
  volumeSupported: boolean;
  importing: string | null;
  error: string | null;
  notice: string | null;
}

interface MusicClock {
  position: number;
  duration: number;
}

export default class MusicStore {
  private state: MusicSnapshot = {
    ready: false,
    tracks: [],
    session: emptySession(),
    playing: false,
    volumeSupported: true,
    importing: null,
    error: null,
    notice: null,
  };
  private clock: MusicClock = { position: 0, duration: 0 };
  private readonly listeners = new Set<() => void>();
  private readonly clockListeners = new Set<() => void>();
  private audio: HTMLAudioElement | null = null;
  private url: string | null = null;
  private loadedTrack: string | null = null;
  private readonly tabs = new MusicTabSync(
    () => {
      this.sequence += 1;
      this.audio?.pause();
      this.update({ playing: false });
    },
    () => {
      void this.refreshLibrary();
    }
  );
  private sequence = 0;
  private generation = 0;
  private lastSave = 0;
  private lastPosition = 0;
  private dirty = false;
  private storageAvailable = true;
  private readonly media = new MusicMediaSession({
    read: () => ({
      track: this.currentTrack(),
      playing: this.state.playing,
      position: this.clock.position,
      duration: this.clock.duration,
      connected: this.audio !== null,
    }),
    play: async () => {
      await this.play();
    },
    pause: () => {
      this.pause();
    },
    next: () => {
      this.next();
    },
    previous: () => {
      this.previous();
    },
    seek: (position) => {
      this.seek(position);
    },
  });

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };
  getSnapshot = () => this.state;
  subscribeClock = (listener: () => void) => {
    this.clockListeners.add(listener);
    return () => {
      this.clockListeners.delete(listener);
    };
  };
  getClock = () => this.clock;

  private update(patch: Partial<MusicSnapshot>) {
    this.state = { ...this.state, ...patch };
    for (const listener of this.listeners) {
      listener();
    }
  }

  private updateClock(position: number, duration = this.clock.duration) {
    this.clock = { position, duration };
    for (const listener of this.clockListeners) {
      listener();
    }
  }

  currentTrack(): MusicTrack | undefined {
    const entry = this.state.session.queue.find(
      ({ key }) => key === this.state.session.currentKey
    );
    return this.state.tracks.find(({ id }) => id === entry?.trackId);
  }

  private session(patch: Partial<MusicSession>) {
    this.dirty = true;
    this.update({ session: { ...this.state.session, ...patch } });
    this.persist();
  }

  private persist() {
    if (!this.state.ready || !this.tabs.ownsSession || !this.dirty) {
      return;
    }
    this.lastSave = Date.now();
    const session = { ...this.state.session, position: this.clock.position };
    try {
      localStorage.setItem(
        MUSIC_ACTIVE_KEY,
        session.currentKey !== null && !session.dismissed ? "true" : "false"
      );
    } catch {
      /* Browser storage may be unavailable. */
    }
    if (!this.storageAvailable) {
      return;
    }
    void saveMusicSession(session).catch(() => {
      this.update({
        error:
          "Your playback position could not be saved. Free some device storage and try again.",
      });
    });
  }

  private async refreshLibrary() {
    try {
      const tracks = await loadLibrary();
      const session = restoreSession(this.state.session, tracks);
      if (session.currentKey !== this.state.session.currentKey) {
        this.unload();
        this.updateClock(0, 0);
      }
      this.update({ tracks, session });
    } catch {
      this.update({
        error: "The library could not be refreshed. Reload Music to try again.",
      });
    }
  }

  async connect(): Promise<void> {
    this.generation += 1;
    const { generation } = this;
    const audio = new Audio();
    audio.preload = "metadata";
    this.audio = audio;
    audio.addEventListener("timeupdate", this.timeupdate);
    audio.addEventListener("loadedmetadata", this.metadata);
    audio.addEventListener("durationchange", this.durationchange);
    audio.addEventListener("play", this.started);
    audio.addEventListener("pause", this.paused);
    audio.addEventListener("ended", this.ended);
    audio.addEventListener("error", this.failed);
    this.tabs.connect();
    window.addEventListener("pagehide", this.pagehide);
    try {
      const [tracks, stored] = await Promise.all([
        loadLibrary(),
        loadMusicSession(),
      ]);
      if (generation !== this.generation) {
        return;
      }
      this.storageAvailable = true;
      const session = restoreSession(stored, tracks);
      this.update({ tracks, session, ready: true });
      this.updateClock(session.position, this.currentTrack()?.duration ?? 0);
      this.applyVolume();
      this.media.update();
    } catch {
      if (generation === this.generation) {
        this.storageAvailable = false;
        this.update({
          ready: true,
          tracks: sortMusicTracks([...includedMusic]),
          notice:
            "Included songs are ready to play. Allow site storage to import songs and save playback settings.",
        });
        this.applyVolume();
      }
    }
  }

  disconnect = () => {
    this.persist();
    this.generation += 1;
    this.sequence += 1;
    this.tabs.disconnect();
    window.removeEventListener("pagehide", this.pagehide);
    if (this.audio) {
      for (const [name, handler] of [
        ["timeupdate", this.timeupdate],
        ["loadedmetadata", this.metadata],
        ["durationchange", this.durationchange],
        ["play", this.started],
        ["pause", this.paused],
        ["ended", this.ended],
        ["error", this.failed],
      ] as const) {
        this.audio.removeEventListener(name, handler);
      }
      this.unload();
      this.audio = null;
    }
    this.media.disconnect();
  };

  private readonly pagehide = () => {
    this.persist();
  };
  private readonly timeupdate = () => {
    if (!this.audio) {
      return;
    }
    this.dirty = true;
    this.updateClock(this.audio.currentTime);
    this.media.updatePosition();
    if (Date.now() - this.lastSave > 5000) {
      this.persist();
    }
  };
  private readonly metadata = () => {
    if (!this.audio) {
      return;
    }
    const { duration } = this.audio;
    if (Number.isFinite(duration)) {
      this.audio.currentTime = Math.min(
        this.lastPosition,
        Math.max(0, duration - 0.01)
      );
      this.updateClock(this.audio.currentTime, duration);
      this.media.updatePosition();
    }
  };
  private readonly durationchange = () => {
    if (this.audio && Number.isFinite(this.audio.duration)) {
      this.updateClock(this.clock.position, this.audio.duration);
    }
  };
  private readonly started = () => {
    this.update({ playing: true });
    this.media.update();
  };
  private readonly paused = () => {
    this.update({ playing: false });
    this.persist();
    this.media.update();
  };
  private readonly ended = () => {
    this.next(false);
  };
  private readonly failed = () => {
    this.update({
      playing: false,
      error:
        "This song could not be played. Check your connection for included songs, or reimport a local file.",
    });
    this.media.update();
  };

  private unload() {
    this.sequence += 1;
    this.audio?.pause();
    this.audio?.removeAttribute("src");
    this.audio?.load();
    if (this.url !== null) {
      URL.revokeObjectURL(this.url);
      this.url = null;
    }
    this.loadedTrack = null;
    this.update({ playing: false });
  }

  play = async () => {
    const track = this.currentTrack();
    if (!track || !this.audio || !this.state.ready) {
      return;
    }
    this.tabs.claimPlayback();
    this.session({ dismissed: false });
    this.update({ error: null });
    const { audio } = this;
    this.sequence += 1;
    const { sequence } = this;
    try {
      if (this.loadedTrack !== track.id) {
        const included = includedTrack(track.id);
        const blob = included
          ? undefined
          : await loadMusicBlob(track.id, "audio");
        if (sequence !== this.sequence) {
          return;
        }
        if (!included && !blob) {
          throw new Error("Missing music file");
        }
        if (this.url !== null) {
          URL.revokeObjectURL(this.url);
          this.url = null;
        }
        this.lastPosition = this.clock.position;
        if (included) {
          audio.src = included.src;
        } else if (blob) {
          this.url = URL.createObjectURL(blob);
          audio.src = this.url;
        }
        this.loadedTrack = track.id;
      } else if (audio.ended) {
        audio.currentTime = 0;
      }
      this.applyVolume();
      await audio.play();
      if (sequence !== this.sequence) {
        return;
      }
      this.media.update();
    } catch (error) {
      if (sequence !== this.sequence) {
        return;
      }
      this.update({
        playing: false,
        error:
          error instanceof DOMException && error.name === "NotAllowedError"
            ? "Playback needs your permission. Press Play again."
            : "This song could not be played. Check your connection for included songs, or reimport a local file.",
      });
    }
  };

  pause = () => {
    this.sequence += 1;
    this.audio?.pause();
    this.update({ playing: false });
    this.persist();
    this.media.update();
  };
  toggle = () => {
    if (this.state.playing) {
      this.pause();
    } else {
      void this.play();
    }
  };
  dismiss = () => {
    this.pause();
    this.session({ dismissed: true });
  };

  private select(
    key: string,
    playing: boolean,
    history = this.state.session.history
  ) {
    const { session } = this.state;
    const entry = session.queue.find((item) => item.key === key);
    if (!entry) {
      return;
    }
    this.unload();
    this.updateClock(
      0,
      this.state.tracks.find(({ id }) => id === entry.trackId)?.duration ?? 0
    );
    this.session({
      currentKey: key,
      position: 0,
      history: history.slice(-200),
      visited: [...new Set([...session.visited, key])],
      upNext: session.upNext.filter((item) => item !== key),
      dismissed: false,
    });
    this.media.update();
    if (playing) {
      void this.play();
    }
  }

  startTrack = (trackId: string, orderedIds: string[]) => {
    const queue = orderedIds.map((id) => ({
      key: crypto.randomUUID(),
      trackId: id,
    }));
    const selected = queue.find((entry) => entry.trackId === trackId);
    if (!selected) {
      return;
    }
    this.update({
      session: {
        ...this.state.session,
        queue,
        history: [],
        visited: [],
        upNext: [],
      },
    });
    this.select(selected.key, true, []);
  };
  next = (manual = true) => {
    const { session } = this.state;
    const key = nextQueueKey(session, manual);
    if (key === null) {
      this.pause();
      return;
    }
    const wasPlaying = !manual || this.state.playing;
    const history =
      session.currentKey !== null && session.currentKey !== key
        ? [...session.history, session.currentKey]
        : session.history;
    if (
      session.shuffle &&
      session.visited.includes(key) &&
      (manual || session.repeat === "all") &&
      key !== session.currentKey
    ) {
      this.update({ session: { ...session, visited: [] } });
    }
    this.select(key, wasPlaying, history);
  };
  previous = () => {
    if (this.clock.position > 3) {
      this.seek(0);
      return;
    }
    const { session, playing } = this.state;
    const previous =
      session.history.at(-1) ??
      session.queue[
        session.queue.findIndex(({ key }) => key === session.currentKey) - 1
      ]?.key;
    if (previous === undefined) {
      this.seek(0);
    } else {
      this.select(previous, playing, session.history.slice(0, -1));
    }
  };
  seek = (position: number) => {
    this.dirty = true;
    const safe = Math.min(
      Math.max(0, position),
      this.clock.duration || Math.max(0, position)
    );
    this.lastPosition = safe;
    if (this.audio && this.loadedTrack !== null && this.audio.readyState >= 1) {
      this.audio.currentTime = safe;
    }
    this.updateClock(safe);
    this.persist();
    this.media.updatePosition();
  };
  preferences = (
    patch: Partial<
      Pick<MusicSession, "volume" | "muted" | "shuffle" | "repeat">
    >
  ) => {
    this.session({
      ...patch,
      ...(patch.shuffle === undefined
        ? {}
        : {
            visited:
              this.state.session.currentKey === null
                ? []
                : [this.state.session.currentKey],
          }),
    });
    this.applyVolume();
    this.media.updatePosition();
  };
  private applyVolume() {
    if (!this.audio) {
      return;
    }
    let supported = true;
    try {
      this.audio.volume = this.state.session.volume;
      supported =
        Math.abs(this.audio.volume - this.state.session.volume) < 0.01;
    } catch {
      supported = false;
    }
    this.audio.muted = this.state.session.muted;
    if (this.state.volumeSupported !== supported) {
      this.update({ volumeSupported: supported });
    }
  }

  moveTrack = async (id: string, direction: -1 | 1) => {
    const { tracks } = this.state;
    const index = tracks.findIndex((track) => track.id === id);
    const target = index + direction;
    if (index === -1 || target < 0 || target >= tracks.length) {
      return;
    }
    await this.reorderTrack(id, tracks[target].id, direction === 1);
  };

  reorderTrack = async (id: string, targetId: string, after: boolean) => {
    const tracks = [...this.state.tracks];
    const index = tracks.findIndex((track) => track.id === id);
    if (index === -1 || id === targetId) {
      return;
    }
    const [movedTrack] = tracks.splice(index, 1);
    const target = tracks.findIndex((song) => song.id === targetId);
    if (target === -1) {
      return;
    }
    tracks.splice(target + (after ? 1 : 0), 0, movedTrack);
    const ordered = tracks.map((track, order) => ({ ...track, order }));
    try {
      await saveLibraryOrder(ordered);
      this.update({ tracks: ordered, error: null });
      const ranks = new Map(ordered.map((track, order) => [track.id, order]));
      const queue = this.state.session.queue.toSorted(
        (left, right) =>
          (ranks.get(left.trackId) ?? 0) - (ranks.get(right.trackId) ?? 0)
      );
      this.session({ queue, upNext: [] });
      this.tabs.announceLibrary();
    } catch {
      this.update({ error: "The song order could not be saved. Try again." });
    }
  };

  editTrack = async (
    id: string,
    title: string,
    artist: string
  ): Promise<boolean> => {
    const track = this.state.tracks.find((song) => song.id === id);
    if (!track || !title.trim()) {
      return false;
    }
    const updated = {
      ...track,
      title: title.trim(),
      artist: artist.trim() || "Unknown artist",
      metadataEdited: true,
    };
    try {
      await saveTrackDetails(updated);
      this.update({
        tracks: sortMusicTracks(
          this.state.tracks.map((song) => (song.id === id ? updated : song))
        ),
        error: null,
      });
      this.media.update();
      this.tabs.announceLibrary();
      return true;
    } catch {
      return false;
    }
  };

  removeTrack = async (id: string) => {
    if (includedTrack(id)) {
      return;
    }
    try {
      await deleteTrack(id);
      const { session } = this.state;
      const index = session.queue.findIndex(
        (entry) => entry.key === session.currentKey
      );
      const active = this.currentTrack()?.id === id;
      const tracks = this.state.tracks.filter((track) => track.id !== id);
      const queue = session.queue.filter((entry) => entry.trackId !== id);
      if (active) {
        this.unload();
        this.updateClock(0, 0);
      }
      this.update({
        tracks,
        session: restoreSession(
          { ...session, queue, currentKey: active ? null : session.currentKey },
          tracks
        ),
      });
      if (active) {
        const next =
          session.queue
            .slice(index + 1)
            .find((entry) => entry.trackId !== id) ?? queue.at(-1);
        if (next) {
          this.select(next.key, false);
        }
      }
      this.persist();
      this.media.update();
      this.tabs.announceLibrary();
    } catch {
      this.update({
        error: "The song could not be removed. Please try again.",
      });
    }
  };

  importFiles = async (files: File[]) => {
    if (this.state.importing !== null || !files.length) {
      return;
    }
    this.update({ error: null, notice: null });
    const { imported, notice, error } = await importMusicFiles(
      files,
      this.state.tracks,
      (importing) => {
        this.update({ importing });
      },
      (track) => {
        this.update({ tracks: sortMusicTracks([...this.state.tracks, track]) });
      }
    );
    this.update({ importing: null, notice, error });
    if (imported) {
      this.tabs.announceLibrary();
      try {
        await navigator.storage?.persist?.();
      } catch {
        /* Persistence is optional. */
      }
    }
  };
}
