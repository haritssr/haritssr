"use client";

import { Menu } from "@base-ui/react/menu";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";

import Button from "@/components/Button";

import { includedTrack } from "../data";
import type { MusicTrack } from "../utils/musicState";
import type MusicStore from "../utils/MusicStore";
import EditSongDialog from "./EditSongDialog";

import styles from "../Music.module.css";

export default function MusicTrackMenu({
  track,
  store,
}: {
  track: MusicTrack;
  store: MusicStore;
}) {
  const [editing, setEditing] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const item =
    "hover:bg-interface-hover data-highlighted:bg-interface-hover cursor-pointer rounded-md px-3 py-2 text-sm outline-hidden";
  return (
    <>
      <Menu.Root>
        <Menu.Trigger
          ref={trigger}
          aria-label={`Actions for ${track.title}`}
          render={<Button size="icon-circle" variant="icon-hover" />}
        >
          <AdjustmentsHorizontalIcon aria-hidden="true" className="size-5" />
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner align="end" className="z-80" sideOffset={3}>
            <Menu.Popup
              className={`${styles.accent} border-border bg-background shadow-floating min-w-40 rounded-xl border p-1 outline-hidden`}
            >
              <Menu.Item
                className={item}
                onClick={() => {
                  setEditing(true);
                }}
              >
                Edit song details
              </Menu.Item>
              {includedTrack(track.id) ? null : (
                <Menu.Item
                  className={`${item} text-danger`}
                  onClick={() => {
                    void store.removeTrack(track.id);
                  }}
                >
                  Remove from library
                </Menu.Item>
              )}
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
      {editing ? (
        <EditSongDialog
          track={track}
          store={store}
          onClose={() => {
            setEditing(false);
          }}
          finalFocus={trigger}
        />
      ) : null}
    </>
  );
}
