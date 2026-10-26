"use client";

import { Dialog } from "@base-ui/react/dialog";
import { useState } from "react";
import type { RefObject } from "react";

import Button from "@/components/Button";

import type { MusicTrack } from "../utils/musicState";
import type MusicStore from "../utils/MusicStore";

import styles from "../Music.module.css";

export default function EditSongDialog({
  track,
  store,
  onClose,
  finalFocus,
}: {
  track: MusicTrack;
  store: MusicStore;
  onClose: () => void;
  finalFocus: RefObject<HTMLButtonElement | null>;
}) {
  const [title, setTitle] = useState(track.title);
  const [artist, setArtist] = useState(
    track.artist === "Unknown artist" ? "" : track.artist
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const inputClass =
    "border-border bg-background focus-visible:outline-action mt-2 block w-full rounded-lg border px-3 py-2 focus-visible:outline-2";
  return (
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open && !saving) {
          onClose();
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="bg-foreground/50 fixed inset-0 z-80" />
        <Dialog.Popup
          finalFocus={finalFocus}
          className={`${styles.accent} border-border bg-background fixed top-1/2 left-1/2 z-80 max-h-[85dvh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border p-5 shadow-xl outline-hidden`}
        >
          <Dialog.Title className="text-lg font-semibold">
            Edit song details
          </Dialog.Title>
          <Dialog.Description className="text-muted mt-2 text-sm">
            Changes stay on this device.
          </Dialog.Description>
          <form
            className="mt-5 space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              if (saving) {
                return;
              }
              setSaving(true);
              setError("");
              void store.editTrack(track.id, title, artist).then((saved) => {
                setSaving(false);
                if (saved) {
                  onClose();
                } else {
                  setError(
                    "Couldn’t save changes. Check that site storage is available and try again."
                  );
                }
              });
            }}
          >
            <label className="block">
              Title
              <input
                className={inputClass}
                required
                value={title}
                onChange={(event) => {
                  setTitle(event.currentTarget.value);
                }}
              />
            </label>
            <label className="block">
              Artist
              <input
                className={inputClass}
                placeholder="Unknown artist"
                value={artist}
                onChange={(event) => {
                  setArtist(event.currentTarget.value);
                }}
              />
            </label>
            {error ? (
              <p role="alert" className="text-danger text-sm">
                {error}
              </p>
            ) : null}
            <div className="flex justify-end gap-3">
              <Dialog.Close
                disabled={saving}
                render={<Button variant="secondary" />}
              >
                Cancel
              </Dialog.Close>
              <Button type="submit" disabled={saving || !title.trim()}>
                {saving ? "Saving…" : "Save"}
              </Button>
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
