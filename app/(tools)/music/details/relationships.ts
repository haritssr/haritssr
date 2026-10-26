export const musicRelationships = `flowchart TD
  accTitle: Music components, playback, and device storage
  accDescr: MusicProvider loads a persistent runtime on demand. MusicLibrary composes search and import controls, the sortable song list, playback controls, and song actions. The store owns audio and queue state, delegating browser media controls, tab synchronization, and sequential imports to focused modules. Imported files stay in IndexedDB; included songs stream from public assets. The service worker caches only the public player shell and immutable assets.
  Layout["app/layout.tsx"] --> Provider["MusicProvider: lazy activation"]
  Provider --> Runtime["MusicRuntime: lifetime and Space shortcut"]
  Runtime --> Store["MusicStore: audio, queue, session, subscriptions"]
  Runtime --> Dock["FloatingMusicDock"]
  Page["/music"] --> Library["MusicLibrary: search, imports, feedback"]
  Library --> List["MusicSongList: selection and sorting"]
  List --> Controls["MusicPlaybackControls: playback, repeat, shuffle, volume"]
  List --> Menu["MusicTrackMenu and EditSongDialog"]
  List --> Progress["MusicProgress: separate clock subscription"]
  Dock --> Progress
  Library --> Store
  Controls --> Store
  Menu --> Store
  Store --> Rules["musicState: restore, queue choice, ordering"]
  Store --> Media["MusicMediaSession: device controls and artwork"]
  Store --> Tabs["MusicTabSync: playback claims and library messages"]
  Tabs --> OtherTabs["BroadcastChannel and storage events"]
  Store --> Imports["importMusic: sequential decoding and commits"]
  Imports --> Database["musicDatabase: IndexedDB transactions"]
  Store --> Database
  Media --> Database
  Database --> Local[("Device-local audio, artwork, tracks, settings")]
  Store --> Included["public/music: included song streams"]
  Library --> Offline["useMusicOffline: prepare public shell"]
  Offline --> Worker["Existing service worker: document and immutable assets only"]
`;
