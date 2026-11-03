# Music components

The [Music page](../page.tsx) renders `MusicLibrary`; the root layout retains
`MusicProvider` across navigation. The provider lazy-loads `MusicRuntime` on a
Music visit or for a remembered visible player. The runtime creates one store,
connects/disconnects it, handles Space, and renders the floating player.
Floating controls take Space in order: notification, retry, Music, then Timer.
Music keeps priority while its floating player is visible, including when paused.

Music and Timer use separate floating pills, with Music above Timer when both
are visible. Each pill spans the available width on phones, and both players'
controls remain accessible. Below `md`, downward scrolling docks the players
between minimized navigation and Search when bottom navigation is available.
Docked pills retain their title and Play/Pause; secondary controls and remaining
time are hidden. Both players share the available gap when present. Upward
scrolling or expanding navigation restores both full pills. On routes without
bottom navigation, full controls stay in the normal floating position. Pausing
keeps a docked player available.
Live pills animate position and width over 240ms while docking or expanding;
rapid reversals continue from their current visual position. Reduced motion skips
this animation, and route changes do not trigger it.
Both expanded pills are 40px tall, with a single row of content and no progress
bar. Music shows its icon, title, remaining time, Close, and Play/Pause.
Controls use thick neutral icons, compact spacing, and no button circles.

| Responsibility | File |
| --- | --- |
| Search, import/drop controls, feedback, offline preparation | [MusicLibrary.tsx](MusicLibrary.tsx) |
| Song rows, selection, pointer/keyboard reordering | [MusicSongList.tsx](MusicSongList.tsx) |
| Play/pause, previous/next, repeat, shuffle, volume | [MusicPlaybackControls.tsx](MusicPlaybackControls.tsx) |
| Edit/remove menu and dialog focus | [MusicTrackMenu.tsx](MusicTrackMenu.tsx), [EditSongDialog.tsx](EditSongDialog.tsx) |
| Artwork and local blob URL cleanup | [MusicArtwork.tsx](MusicArtwork.tsx) |
| Playback clock display/seeking | [MusicProgress.tsx](MusicProgress.tsx) |
| Persistent compact player | [FloatingMusicDock.tsx](FloatingMusicDock.tsx) |
| Public shell preparation | [useMusicOffline.ts](useMusicOffline.ts) |

`MusicStore` owns the native audio element, selected audio URL, queue transitions,
session persistence, and library mutations. Its snapshot and playback clock have
separate subscriptions, so time updates do not rerender the whole library.

- [MusicMediaSession](../utils/MusicMediaSession.ts) maps store actions/state to
  optional device media controls and owns their artwork URLs and cleanup.
- [MusicTabSync](../utils/MusicTabSync.ts) owns BroadcastChannel/storage listeners,
  playback claims, and library-change announcements. A newer claim pauses the
  previous tab and prevents it from persisting over the new owner's session.
- [importMusic](../utils/importMusic.ts) validates/decodes one MP3 at a time and
  commits it through [musicDatabase](../utils/musicDatabase.ts) before publishing
  it. Duplicate signatures, per-file errors, and earlier successes survive a batch.
- [musicState](../utils/musicState.ts) restores sessions and defines queue choice,
  sorting, and display time. IndexedDB schema and storage keys stay versioned.

Imports stay device-local. Included songs stream from public assets. The service
worker prepares only the public Music document and immutable dependencies; API,
account, and RSC responses remain excluded. See [Details](../details/page.tsx) for
behavior and the [Pele diagram](../details/relationships.ts) for data flow.
