export interface MusicTrack {
  id: string;
  signature: string;
  filename: string;
  title: string;
  artist: string;
  order?: number;
  metadataEdited?: boolean;
  album: string;
  duration: number;
  hasArtwork: boolean;
  size: number;
}

interface QueueEntry {
  key: string;
  trackId: string;
}

export interface MusicSession {
  queue: QueueEntry[];
  currentKey: string | null;
  position: number;
  volume: number;
  muted: boolean;
  shuffle: boolean;
  repeat: "off" | "all" | "one";
  dismissed: boolean;
  history: string[];
  visited: string[];
  upNext: string[];
}

export const MUSIC_ACTIVE_KEY = "haritssr-music-active:v1";
export const MUSIC_CLAIM_KEY = "haritssr-music-claim:v1";

export function emptySession(): MusicSession {
  return {
    queue: [],
    currentKey: null,
    position: 0,
    volume: 0.5,
    muted: false,
    shuffle: false,
    repeat: "off",
    dismissed: true,
    history: [],
    visited: [],
    upNext: [],
  };
}

export function isMusicRecord(
  value: unknown
): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isMusicTrack(value: unknown): value is MusicTrack {
  if (!isMusicRecord(value)) {
    return false;
  }
  return (
    ["id", "signature", "filename", "title", "artist", "album"].every(
      (field) => typeof value[field] === "string"
    ) &&
    typeof value.duration === "number" &&
    Number.isFinite(value.duration) &&
    value.duration >= 0 &&
    typeof value.size === "number" &&
    typeof value.hasArtwork === "boolean"
  );
}

function restoreQueue(value: unknown, tracks: MusicTrack[]): QueueEntry[] {
  if (!Array.isArray(value)) {
    return [];
  }
  const entries: unknown[] = value;
  const ids = new Set(tracks.map((track) => track.id));
  const keys = new Set<string>();
  const queue: QueueEntry[] = [];
  for (const entry of entries) {
    if (
      isMusicRecord(entry) &&
      typeof entry.key === "string" &&
      typeof entry.trackId === "string" &&
      ids.has(entry.trackId) &&
      !keys.has(entry.key)
    ) {
      queue.push({ key: entry.key, trackId: entry.trackId });
      keys.add(entry.key);
    }
  }
  return queue;
}

export function restoreSession(
  value: unknown,
  tracks: MusicTrack[]
): MusicSession {
  const session = emptySession();
  if (!isMusicRecord(value)) {
    return session;
  }
  const record = value;
  session.queue = restoreQueue(record.queue, tracks);
  const keys = new Set(session.queue.map((entry) => entry.key));
  session.currentKey =
    typeof record.currentKey === "string" && keys.has(record.currentKey)
      ? record.currentKey
      : null;
  for (const field of ["position", "volume"] as const) {
    if (typeof record[field] === "number" && Number.isFinite(record[field])) {
      session[field] = Math.max(0, record[field]);
    }
  }
  session.volume = Math.min(1, session.volume);
  for (const field of ["muted", "shuffle", "dismissed"] as const) {
    if (typeof record[field] === "boolean") {
      session[field] = record[field];
    }
  }
  if (record.repeat === "all" || record.repeat === "one") {
    session.repeat = record.repeat;
  }
  for (const field of ["history", "visited", "upNext"] as const) {
    if (Array.isArray(record[field])) {
      session[field] = record[field].filter(
        (key): key is string => typeof key === "string" && keys.has(key)
      );
    }
  }
  if (session.currentKey === null) {
    session.position = 0;
    session.dismissed = true;
  }
  return session;
}

export function nextQueueKey(
  session: MusicSession,
  manual: boolean,
  random = Math.random
): string | null {
  const { queue, currentKey, repeat, shuffle } = session;
  if (!queue.length) {
    return null;
  }
  if (!manual && repeat === "one" && currentKey !== null) {
    return currentKey;
  }
  const priority = session.upNext.find(
    (key) => key !== currentKey && queue.some((entry) => entry.key === key)
  );
  if (priority !== undefined) {
    return priority;
  }
  const fallbackKey =
    manual || repeat === "all" ? (queue[0]?.key ?? null) : null;
  if (shuffle) {
    let candidates = queue.filter(
      ({ key }) => key !== currentKey && !session.visited.includes(key)
    );
    if (!candidates.length && repeat === "all") {
      candidates = queue.filter(({ key }) => key !== currentKey);
      if (!candidates.length) {
        return currentKey;
      }
    }
    return (
      candidates[Math.floor(random() * candidates.length)]?.key ?? fallbackKey
    );
  }
  const index = queue.findIndex(({ key }) => key === currentKey);
  return queue[index + 1]?.key ?? fallbackKey;
}

export function musicTime(seconds: number): string {
  const safe = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, "0")}`;
}

export function sortMusicTracks(tracks: MusicTrack[]): MusicTrack[] {
  return tracks.toSorted(
    (left, right) =>
      (left.order ?? Number.MAX_SAFE_INTEGER) -
        (right.order ?? Number.MAX_SAFE_INTEGER) ||
      left.title.localeCompare(right.title) ||
      left.artist.localeCompare(right.artist) ||
      left.id.localeCompare(right.id)
  );
}
