import FlowDiagram from "@/components/FlowDiagram";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import Table from "@/components/Table";
import { commitDay } from "@/utils/commits/changelog";
import { getCommitHistory } from "@/utils/commits/commitHistory";
import { createPageMetadata } from "@/utils/metadata/pageMetadata";

import OfflineStatus from "./OfflineStatus";
import { musicRelationships } from "./relationships";

const commitWeekday = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Jakarta",
  weekday: "short",
});

const commitTime = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Jakarta",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export const metadata = createPageMetadata({
  title: "Music Details",
  description: "How included songs, local imports, and offline playback work.",
  path: "/music/details",
});

export default async function MusicDetailsPage() {
  const history = await getCommitHistory();
  const commits = history
    .filter((commit) => /\bmusic\b/iu.test(commit.subject))
    .toSorted(
      (left, right) =>
        Date.parse(left.date) - Date.parse(right.date) ||
        left.hash.localeCompare(right.hash)
    );

  return (
    <>
      <PageHeader
        back={{ href: "/music", name: "Music" }}
        path="/music/details"
      >
        <PageTitle>Details</PageTitle>
        <PageDescription>
          How Music handles your library, playback, and offline listening, with
          a history of its changes.
        </PageDescription>
      </PageHeader>
      <div className="space-y-16">
        <Section title="Logics" contentClassName="max-w-3xl">
          <div className="space-y-5">
            <ul className="text-foreground marker:text-foreground list-outside list-disc space-y-2 pl-5">
              <li>
                <span className="font-medium">Two sources, one library</span>
                <span className="text-muted block">
                  Included songs stream from this site and need a connection.
                  Imported MP3s play from this browser. Included songs cannot be
                  removed through the player.
                </span>
              </li>
              <li>
                <span className="font-medium">Imports stay local</span>
                <span className="text-muted block">
                  Audio, artwork, metadata, and playback settings are stored in
                  IndexedDB on this device. Imported files are never uploaded or
                  changed. Clearing site data or browser storage eviction
                  removes the saved library.
                </span>
              </li>
              <li>
                <span className="font-medium">
                  Each import stands on its own
                </span>
                <span className="text-muted block">
                  Files import one at a time. Matching filename, size, and
                  modification time count as a duplicate. A failed import keeps
                  the songs already imported.
                </span>
              </li>
              <li>
                <span className="font-medium">
                  Library order is playback order
                </span>
                <span className="text-muted block">
                  Songs start in alphabetical order. Reorder them with drag
                  handles or arrow keys while a handle is focused. New imports
                  follow manually ordered songs; shuffle changes playback order.
                </span>
              </li>
              <li>
                <span className="font-medium">
                  Next and repeat have distinct rules
                </span>
                <span className="text-muted block">
                  Repeat One repeats a song only when it finishes automatically.
                  Manual Next wraps to the first song at the end; automatic
                  playback stops at the end when repeat is off.
                </span>
              </li>
              <li>
                <span className="font-medium">Playback follows you</span>
                <span className="text-muted block">
                  The same player continues across page navigation. Reloading
                  restores the song, position, and settings paused. Starting
                  playback in another tab pauses the previous tab. Closing the
                  floating player pauses it and keeps the selected song. Music
                  and Timer sounds can play together. When both floating players
                  are visible, Music sits above Timer in separate pills with
                  both sets of controls accessible.
                </span>
              </li>
              <li>
                <span className="font-medium">
                  Space controls visible playback
                </span>
                <span className="text-muted block">
                  On Music, Space plays or pauses and can start the first song.
                  Elsewhere it works while the floating player is visible.
                  Typing, focused controls, and open dialogs keep their normal
                  keyboard behavior.
                </span>
              </li>
              <li>
                <span className="font-medium">
                  Offline playback needs preparation
                </span>
                <span className="text-muted block">
                  Open Music online in production to prepare the player for
                  offline reopening. Imported songs can then play offline.
                  Included songs are not downloaded during setup. This Details
                  page only checks readiness.
                </span>
              </li>
              <li>
                <span className="font-medium">Offline status</span>
                <span className="text-muted block">
                  <OfflineStatus />
                </span>
              </li>
            </ul>
          </div>
        </Section>
        <Section title="How this works">
          <FlowDiagram
            definition={musicRelationships}
            title="Music components and data flow"
          />
          <div className="text-muted max-w-3xl space-y-3">
            <p>
              One persistent player owns audio and playback state. The library,
              song controls, and floating player use the same store; progress
              displays subscribe separately to playback time.
            </p>
            <p>
              Browser media controls, tab coordination, and sequential imports
              have separate modules. Imports commit to this device before the
              library updates. The offline cache holds the public player shell
              and immutable assets, while imported audio stays in IndexedDB.
            </p>
          </div>
        </Section>
        <Section title="Changelog">
          <Table>
            <caption className="sr-only">
              Music commits, oldest first. Dates and times use Jakarta time
              (WIB).
            </caption>
            <thead>
              <tr className="divide-border bg-foreground/5 divide-x">
                <th
                  className="w-px px-3 text-center font-medium whitespace-nowrap"
                  scope="col"
                >
                  No
                </th>
                <th className="px-3 text-left font-medium" scope="col">
                  Name
                </th>
                <th className="w-32 px-3 text-left font-medium" scope="col">
                  Date
                </th>
                <th
                  className="px-3 text-left font-medium whitespace-nowrap"
                  scope="col"
                >
                  Time (UTC+7)
                </th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {commits.map((commit, index) => (
                <tr className="divide-border divide-x" key={commit.hash}>
                  <td className="px-3 py-2 text-center align-top">
                    {index + 1}
                  </td>
                  <td className="px-3 py-2 align-top wrap-anywhere">
                    {commit.subject}
                  </td>
                  <td className="px-3 py-2 align-top whitespace-nowrap">
                    <time dateTime={commit.date}>
                      {commitDay(commit.date)},{" "}
                      {commitWeekday.format(new Date(commit.date))}
                    </time>
                  </td>
                  <td className="px-3 py-2 align-top whitespace-nowrap tabular-nums">
                    <time dateTime={commit.date}>
                      {commitTime.format(new Date(commit.date))}
                    </time>
                  </td>
                </tr>
              ))}
              {commits.length === 0 && (
                <tr>
                  <td className="text-muted px-3 py-2" colSpan={4}>
                    No Music commits yet.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Section>
      </div>
    </>
  );
}
