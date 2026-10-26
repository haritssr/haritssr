export const commitRelationships = `flowchart TD
  accTitle: Commit history storage, calculation, and display
  accDescr: Git history is imported manually into Turso. Server-only cached reads load history and counts. Pure utilities prepare, filter, and summarize records using shared client-server contracts. Pages and the API use the results; the explorer validates API responses. The homepage reads only the count.
  Git["Full Git checkout"] -->|explicit manual import| Import["app/commits/import-commits.ts"]
  Import --> Database[("Separate Turso commits database")]
  Database --> Queries["commitsDatabase: validated server-only reads"]
  Queries --> History["commitHistory: 24-hour history cache"]
  Queries --> Count["commitHistory: separate 24-hour count cache"]
  Count --> Home["Home commit count"]
  History --> Summary["changelogSummary: pure filtering and aggregation"]
  Summary --> Rules["changelog: periods, commit types, activity buckets"]
  Summary --> Page["Commits page"]
  History --> Reviews["Dated reviews and Music changelog"]
  Summary --> API["GET /api/commits: browser and CDN caching"]
  Selection["changelogSelection: URL filters"] --> Page
  Selection --> API
  Contracts["changelogTypes: selection and response contracts"] --> Summary
  Contracts --> Parse["changelogResponse: validate API payloads"]
  API --> Parse
  Parse --> Explorer["ChangelogExplorer: URL filters and results"]
  Page --> Explorer
`;
