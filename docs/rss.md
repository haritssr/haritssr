# RSS Feed

The writing RSS feed is available at [`/feed.xml`](https://www.haritssr.com/feed.xml).
The site footer includes a link to the feed. Visitors can paste this URL into
an RSS reader such as Feedly, Inoreader, NetNewsWire, or Thunderbird.

The feed is generated from the local writing index:

1. Writing is added to `data/writing/*.mdx` with a `publishedAt` value in
   `YYYY-MM-DD` format.
2. `utils/writings.ts` parses and validates the frontmatter, derives the slug
   and word count, and loads the writing into `allWritings`.
3. `app/feed.xml/route.ts` passes the collection to `utils/rss.ts`.
4. The renderer creates an RSS 2.0 document with each writing's title,
   summary, canonical URL, publication date, and topic.

The feed contains summaries that link to the full writings. Its
`lastBuildDate` reflects the feed generation time so changes to existing
writings are visible to RSS readers. In production, the statically generated
feed is updated during deployment, so a new deployment is required for a new
writing to appear in the live feed.
