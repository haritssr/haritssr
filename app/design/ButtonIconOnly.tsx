import { CheckIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

import Button from "@/components/Button";

export default function ButtonIconOnly() {
  return (
    <div className="flex items-center gap-2">
      <Button
        aria-label="Settings"
        size="icon-toolbar"
        title="Settings"
        variant="outline-toolbar"
      >
        <Cog6ToothIcon aria-hidden="true" className="size-4.5 stroke-2" />
      </Button>
      <Button aria-label="Bookmark" size="icon-circle" variant="outline">
        <svg
          aria-hidden="true"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
      <Button
        aria-label="Done"
        size="icon-circle"
        title="Done"
        variant="outline"
      >
        <CheckIcon aria-hidden="true" className="size-5" strokeWidth={2.5} />
      </Button>
    </div>
  );
}
