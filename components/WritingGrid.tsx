import { allWritings } from "@/utils/writings";

import InternalLink from "./InternalLink";
import MoreItemsLink from "./MoreItemsLink";

export default function WritingGrid({ mobileLimit }: { mobileLimit?: number }) {
  const remainingWritings = Math.max(
    allWritings.length - (mobileLimit ?? allWritings.length),
    0
  );

  return (
    <div className="grid gap-3 sm:gap-x-5 sm:gap-y-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {allWritings.map((writing, index) => (
        <InternalLink
          className={
            mobileLimit !== undefined && index >= mobileLimit
              ? "hidden! sm:inline-flex!"
              : undefined
          }
          href={`/writing/${writing.slug}`}
          key={writing.slug}
        >
          {writing.title}
        </InternalLink>
      ))}
      {remainingWritings > 0 ? (
        <MoreItemsLink
          className="sm:hidden!"
          count={remainingWritings}
          href="/writing"
          itemName="writing"
        />
      ) : null}
    </div>
  );
}
