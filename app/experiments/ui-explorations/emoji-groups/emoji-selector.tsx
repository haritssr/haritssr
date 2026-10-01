"use client";

import { Select } from "@base-ui/react/select";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useId, useState } from "react";

interface EmojiItem {
  emoji: string;
  name: string;
}

interface EmojiGroup {
  category: string;
  description: string;
  items: EmojiItem[];
  title: string;
  tone: string;
}

interface EmojiGrouping {
  description: string;
  groups: readonly EmojiGroup[];
  id: string;
  label: string;
}

interface EmojiSelectorProps {
  groupings: readonly EmojiGrouping[];
  initialGrouping: string;
}

const SELECT_TRIGGER_CLASS_NAME =
  "form-control border-border text-foreground/90 focus-visible:outline-action hover:bg-foreground/5 inline-flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border bg-white px-3 py-2 text-sm outline-hidden focus-visible:outline-2";

export default function EmojiSelector({
  groupings,
  initialGrouping,
}: EmojiSelectorProps) {
  const selectId = useId();
  const [selectedId, setSelectedId] = useState(initialGrouping);
  const selectedGrouping =
    groupings.find((grouping) => grouping.id === selectedId) ?? groupings[0];

  if (selectedGrouping === undefined) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="border-border flex flex-col gap-4 rounded-xl border bg-white p-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex w-full max-w-xs flex-col gap-1.5">
          <label className="text-foreground/70 text-sm" htmlFor={selectId}>
            Group emoji by
          </label>
          <Select.Root
            onValueChange={(value) => {
              if (
                typeof value === "string" &&
                groupings.some((grouping) => grouping.id === value)
              ) {
                setSelectedId(value);
              }
            }}
            value={selectedId}
          >
            <Select.Trigger className={SELECT_TRIGGER_CLASS_NAME} id={selectId}>
              <Select.Value />
              <Select.Icon>
                <ChevronDownIcon aria-hidden="true" className="size-4" />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner sideOffset={4}>
                <Select.Popup className="border-border z-50 min-w-[var(--anchor-width)] overflow-hidden rounded-lg border bg-white shadow-xl">
                  <Select.List className="p-1">
                    {groupings.map((grouping) => (
                      <Select.Item
                        className="text-foreground data-highlighted:bg-foreground/10 relative flex cursor-pointer items-center rounded-md py-1.5 pr-8 pl-2 text-sm outline-hidden select-none"
                        key={grouping.id}
                        value={grouping.id}
                      >
                        <Select.ItemText>{grouping.label}</Select.ItemText>
                        <Select.ItemIndicator className="absolute right-2">
                          <CheckIcon aria-hidden="true" className="size-4" />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.List>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </div>

        <p
          aria-live="polite"
          className="text-foreground/65 max-w-2xl text-sm leading-relaxed"
        >
          {selectedGrouping.description}
        </p>
      </div>

      <p aria-live="polite" className="text-foreground/60 text-sm">
        {selectedGrouping.groups.length} collections
      </p>

      <section
        aria-label={`${selectedGrouping.label} emoji groupings`}
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {selectedGrouping.groups.map((group) => (
          <article
            className="border-border overflow-hidden rounded-xl border bg-white"
            key={group.title}
          >
            <div className="border-border flex items-start gap-3 border-b px-4 py-4">
              <span
                aria-hidden="true"
                className={`mt-1.5 size-2.5 shrink-0 rounded-full ${group.tone}`}
              />
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                  <h2 className="text-foreground font-semibold">
                    {group.title}
                  </h2>
                  <span className="text-foreground/55 text-xs font-medium tracking-wide uppercase">
                    {group.category}
                  </span>
                </div>
                <p className="text-foreground/65 text-sm leading-relaxed">
                  {group.description}
                </p>
              </div>
            </div>

            <ul className="grid grid-cols-4 gap-2 p-3">
              {group.items.map((item) => (
                <li
                  className="border-border/70 bg-foreground/[0.025] flex min-h-20 flex-col items-center justify-center gap-1 rounded-lg border px-1 py-2 text-center"
                  key={`${group.title}-${item.name}`}
                >
                  <span aria-hidden="true" className="text-3xl leading-none">
                    {item.emoji}
                  </span>
                  <span className="text-foreground/65 text-[11px] leading-tight">
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}
