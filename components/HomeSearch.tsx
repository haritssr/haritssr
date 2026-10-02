"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { useGlobalSearch } from "@/components/TopBarSearch";

export default function HomeSearch() {
  const { hasOpened, open, openSearch, prepareSearch } = useGlobalSearch();

  return (
    <div className="hidden lg:grid lg:grid-cols-4 lg:gap-5">
      <button
        aria-controls={hasOpened ? "global-search-dialog" : undefined}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Search the site"
        className="border-border hover:border-border-hover focus-visible:border-action focus-visible:outline-action text-muted col-span-2 col-start-2 flex h-12 w-full cursor-pointer items-center gap-3 rounded-full border bg-white px-4 text-left text-base transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
        onClick={(event) => {
          openSearch(event.currentTarget);
        }}
        onFocus={prepareSearch}
        onPointerEnter={prepareSearch}
        type="button"
      >
        <MagnifyingGlassIcon
          aria-hidden="true"
          className="text-foreground/70 size-5 shrink-0"
        />
        <span className="truncate">
          Search pages, projects, experiments, blog…
        </span>
      </button>
    </div>
  );
}
