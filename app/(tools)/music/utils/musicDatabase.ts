import { includedMusic } from "../data";
import { isMusicTrack, sortMusicTracks } from "./musicState";
import type { MusicSession, MusicTrack } from "./musicState";

let database: Promise<IDBDatabase> | undefined;

async function requestValue<T>(request: IDBRequest<T>): Promise<T> {
  // oxlint-disable-next-line promise/avoid-new -- IndexedDB exposes events rather than promises.
  return await new Promise((resolve, reject) => {
    request.addEventListener(
      "success",
      () => {
        resolve(request.result);
      },
      { once: true }
    );
    request.addEventListener(
      "error",
      () => {
        reject(request.error ?? new Error("Music storage failed."));
      },
      { once: true }
    );
  });
}

async function completed(transaction: IDBTransaction): Promise<void> {
  // oxlint-disable-next-line promise/avoid-new -- A write is successful only after its transaction commits.
  await new Promise<void>((resolve, reject) => {
    transaction.addEventListener(
      "complete",
      () => {
        resolve();
      },
      { once: true }
    );
    transaction.addEventListener(
      "abort",
      () => {
        reject(
          transaction.error ?? new Error("Music storage was interrupted.")
        );
      },
      { once: true }
    );
    transaction.addEventListener(
      "error",
      () => {
        reject(transaction.error ?? new Error("Music storage failed."));
      },
      { once: true }
    );
  });
}

async function openDatabase(): Promise<IDBDatabase> {
  database ??= (async () => {
    const request = indexedDB.open("haritssr-music", 1);
    request.addEventListener("upgradeneeded", () => {
      const db = request.result;
      db.createObjectStore("tracks", { keyPath: "id" }).createIndex(
        "signature",
        "signature",
        { unique: true }
      );
      db.createObjectStore("audio");
      db.createObjectStore("artwork");
      db.createObjectStore("settings");
    });
    const db = await requestValue(request);
    db.addEventListener("versionchange", () => {
      db.close();
      database = undefined;
    });
    return db;
  })();
  try {
    return await database;
  } catch (error) {
    database = undefined;
    throw error;
  }
}

export async function loadLibrary(): Promise<MusicTrack[]> {
  const db = await openDatabase();
  const value: unknown = await requestValue(
    db.transaction("tracks").objectStore("tracks").getAll()
  );
  if (!Array.isArray(value)) {
    return sortMusicTracks([...includedMusic]);
  }
  const entries: unknown[] = value;
  const saved = entries.filter(isMusicTrack).map((song) => {
    const original = includedMusic.find(
      (item) =>
        item.id === song.id ||
        (item.size === song.size && song.filename === `${item.id.slice(9)}.mp3`)
    );
    return original && song.metadataEdited !== true
      ? { ...song, title: original.title, artist: original.artist }
      : song;
  });
  const merged = new Map(
    includedMusic.map((song) => [song.id, song as MusicTrack])
  );
  for (const song of saved) {
    merged.set(song.id, song);
  }
  return sortMusicTracks([...merged.values()]);
}

export async function loadMusicSession(): Promise<unknown> {
  const db = await openDatabase();
  return await requestValue(
    db.transaction("settings").objectStore("settings").get("session")
  );
}

async function writeMusic(
  stores: string[],
  mutate: (transaction: IDBTransaction) => void
): Promise<void> {
  const db = await openDatabase();
  const transaction = db.transaction(stores, "readwrite");
  const done = completed(transaction);
  try {
    mutate(transaction);
  } catch (error) {
    transaction.abort();
    try {
      await done;
    } catch {
      // Consume the abort rejection before reporting the original write failure.
    }
    throw error;
  }
  await done;
}

export async function saveMusicSession(session: MusicSession): Promise<void> {
  await writeMusic(["settings"], (transaction) => {
    transaction.objectStore("settings").put(session, "session");
  });
}

export async function saveTrack(
  track: MusicTrack,
  audio: Blob,
  artwork: Blob | null
): Promise<void> {
  await writeMusic(["tracks", "audio", "artwork"], (transaction) => {
    transaction.objectStore("tracks").add(track);
    transaction.objectStore("audio").add(audio, track.id);
    if (artwork) {
      transaction.objectStore("artwork").add(artwork, track.id);
    }
  });
}

export async function deleteTrack(id: string): Promise<void> {
  await writeMusic(["tracks", "audio", "artwork"], (transaction) => {
    for (const name of ["tracks", "audio", "artwork"]) {
      transaction.objectStore(name).delete(id);
    }
  });
}

export async function loadMusicBlob(
  id: string,
  kind: "audio" | "artwork"
): Promise<Blob | undefined> {
  const db = await openDatabase();
  const value: unknown = await requestValue(
    db.transaction(kind).objectStore(kind).get(id)
  );
  return value instanceof Blob ? value : undefined;
}

export async function saveTrackDetails(track: MusicTrack): Promise<void> {
  await writeMusic(["tracks"], (transaction) => {
    transaction.objectStore("tracks").put(track);
  });
}

export async function saveLibraryOrder(tracks: MusicTrack[]): Promise<void> {
  await writeMusic(["tracks"], (transaction) => {
    const store = transaction.objectStore("tracks");
    for (const track of tracks) {
      store.put(track);
    }
  });
}
