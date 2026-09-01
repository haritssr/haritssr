import { allWritings } from "@content-collections";

import InternalLink from "./InternalLink";

export default function WritingGrid() {
  return (
    <div className="grid gap-3 sm:gap-x-5 sm:gap-y-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {allWritings.map((writing) => (
        <InternalLink href={`/writing/${writing.slug}`} key={writing.slug}>
          {writing.title}
        </InternalLink>
      ))}
    </div>
  );
}
