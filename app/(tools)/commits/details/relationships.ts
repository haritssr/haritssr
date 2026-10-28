export const commitRelationships = `flowchart TD
  accTitle: How commit history reaches the explorer
  accDescr: A manual import copies Git history to a separate Turso database. Cached server reads feed the filtered explorer, API, dated reviews, and tool changelogs. Home uses a separate count cache, while weekly highlights are curated locally.
  Git["Git history"] -->|manual import| Database[("Turso commits database")]
  Database --> History["Shared history cache: 24 hours"]
  Database --> Count["Separate count cache: 24 hours"]
  Count --> Home["Homepage total"]
  Filters["URL filters: period, date, type, and search"] --> Summary["Filter and summarize history"]
  History --> Summary
  Summary --> API["Commits page and cached API responses"]
  API --> Explorer["Activity chart, summary, and timeline"]
  History --> Tools["Dated reviews and tool changelogs"]
  Local["Curated weekly summaries"] --> Changelog["Weekly changelog"]
`;
