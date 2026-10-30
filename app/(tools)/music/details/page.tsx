import ToolChangelog from "@/app/(tools)/_components/ToolChangelog";
import Accordion, { AccordionItem } from "@/components/Accordion";
import ExplanationList from "@/components/ExplanationList";
import FlowDiagram from "@/components/FlowDiagram";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import { createPageMetadata } from "@/utils/metadata/pageMetadata";

import OfflineStatus from "./OfflineStatus";
import { musicRelationships } from "./relationships";

const musicFlow = `flowchart TD
  accTitle: How Music plays your library
  accDescr: Included songs stream online, while imported MP3s are stored in this browser. One shared player serves the library and floating controls. Preparing the player online enables offline playback of imported songs.
  Included["Included songs: online streams"] --> Player["Shared audio player"]
  Imports["Imported MP3s"] --> Library[("Library on this device")]
  Library --> Player
  Controls["Library and floating controls"] --> Player
  Player --> Sound["Playback across the site"]
  Preparation["Open Music online"] --> Offline["Save the player for offline reopening"]
  Offline --> Library
`;

export const metadata = createPageMetadata({
  title: "Music Details",
  description: "How included songs, local imports, and offline playback work.",
  path: "/music/details",
});

export default function MusicDetailsPage() {
  return (
    <>
      <PageHeader
        back={{ href: "/music", name: "Music" }}
        path="/music/details"
      >
        <PageTitle>Details</PageTitle>
        <PageDescription>
          Listen to music, organize your library, and take your own songs
          offline.
        </PageDescription>
      </PageHeader>
      <div className="space-y-16">
        <Section
          id="what-you-can-do"
          title="What you can do"
          contentClassName="max-w-3xl"
        >
          <ExplanationList>
            <li>Stream included songs or import MP3s from your device.</li>
            <li>
              Search your library and reorder songs by dragging or using the
              keyboard.
            </li>
            <li>
              Shuffle, repeat, seek, and adjust the volume while listening.
            </li>
            <li>Keep listening across the site with the floating player.</li>
            <li>
              Press Space to play or pause on Music or while the floating player
              is visible. Notifications and retry actions take priority.
            </li>
            <li>
              Play imported songs offline after opening Music online to prepare
              it.
            </li>
          </ExplanationList>
        </Section>
        <Section
          id="playback-and-storage"
          title="What to know"
          contentClassName="max-w-3xl"
        >
          <ExplanationList>
            <li>
              Your imported songs stay on this device and are never uploaded.
            </li>
            <li>
              Clearing browser storage removes imported songs and saved
              settings.
            </li>
            <li>
              Included songs need a connection and cannot be removed from the
              player.
            </li>
            <li>
              Imports skip files with matching names, sizes, and modification
              times, and keep successful imports if another file fails.
            </li>
            <li>
              Repeat One repeats a finished song; manual Next wraps to the first
              song even when repeat is off.
            </li>
            <li>
              Reloading restores playback paused, and playing in another tab
              pauses the previous one.
            </li>
            <li>
              Offline status: <OfflineStatus />
            </li>
          </ExplanationList>
        </Section>
        <Section id="how-this-works" title="How it works">
          <p className="max-w-3xl">
            One shared player keeps music running across page navigation.
            Imported audio and library settings live in this browser, and the
            offline cache stores the player so imported songs can play without a
            connection.
          </p>
          <FlowDiagram definition={musicFlow} title="Music data flow" />
          <Accordion>
            <AccordionItem
              excludeFromContents
              title="Technical reference"
              value="technical-reference"
            >
              <div className="space-y-5">
                <p className="max-w-3xl">
                  Imported audio, artwork, metadata, and settings use IndexedDB.
                  The service worker saves the public player shell and immutable
                  assets, while included songs continue to stream from the site.
                </p>
                <FlowDiagram
                  definition={musicRelationships}
                  title="Music component map"
                />
              </div>
            </AccordionItem>
          </Accordion>
        </Section>
        <ToolChangelog tool="music" />
      </div>
    </>
  );
}
