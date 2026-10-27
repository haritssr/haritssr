"use client";

import {
  BellIcon,
  CheckIcon,
  ClockIcon,
  MusicalNoteIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

import Accordion, { AccordionItem } from "@/components/Accordion";
import TabBarButtom from "@/components/TabBarButtom";

type Item = "timer" | "music" | "notice";
type Concept = "peek" | "side" | "top" | "companion" | "shared" | "expandable";

const concepts: { id: Concept; title: string; description: string }[] = [
  {
    id: "peek",
    title: "Peek stack",
    description: "Overlapping edges reveal the other items.",
  },
  {
    id: "side",
    title: "Side tabs",
    description: "Switch items using tabs beside the current pill.",
  },
  {
    id: "top",
    title: "Top tabs",
    description: "A small strip switches the visible pill.",
  },
  {
    id: "companion",
    title: "Compact companion",
    description: "Other items remain visible as compact cues.",
  },
  {
    id: "shared",
    title: "Shared container",
    description: "One surface holds an expanded item and compact rows.",
  },
  {
    id: "expandable",
    title: "Expandable stack",
    description: "A summary opens the full set of items.",
  },
];

const items: Record<
  Item,
  {
    label: string;
    title: string;
    detail: string;
    color: string;
    progress: string;
  }
> = {
  timer: {
    label: "Timer",
    title: "Thinking",
    detail: "-23:09",
    color: "bg-success",
    progress: "w-1/4",
  },
  music: {
    label: "Music",
    title: "I WANT",
    detail: "-0:57",
    color: "bg-music",
    progress: "w-2/3",
  },
  notice: {
    label: "Notification",
    title: "Task completed",
    detail: "Your task is done.",
    color: "bg-action",
    progress: "w-full",
  },
};
const surface =
  "corner-squircle border-border bg-background/90 shadow-foreground/10 rounded-2xl border shadow-md backdrop-blur-md";
const focus =
  "focus-visible:outline-action focus-visible:outline-2 focus-visible:outline-offset-2";

function ItemIcon({ item }: { item: Item }) {
  const icons = { timer: ClockIcon, music: MusicalNoteIcon, notice: BellIcon };
  const Icon = icons[item];
  return <Icon aria-hidden="true" className="size-4 shrink-0" />;
}

function Pill({
  item,
  playing,
  onToggle,
}: {
  item: Item;
  playing: boolean;
  onToggle: () => void;
}) {
  const data = items[item];
  return (
    <div className={`${surface} flex min-w-0 items-center gap-2 px-3 py-2`}>
      <ItemIcon item={item} />
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center justify-between gap-2 text-xs">
          <span className="truncate font-medium">{data.title}</span>
          {item !== "notice" && (
            <span className="text-muted shrink-0 tabular-nums">
              {data.detail}
            </span>
          )}
        </div>
        {item === "notice" ? (
          <p className="text-muted truncate text-xs">{data.detail}</p>
        ) : (
          <div className="bg-slider-track-hover mt-1 h-1.5 overflow-hidden rounded-full">
            <div
              className={`${data.color} ${data.progress} h-full rounded-full`}
            />
          </div>
        )}
      </div>
      <button
        aria-label={
          item === "notice"
            ? "Acknowledge simulated notification"
            : `${playing ? "Pause" : "Play"} simulated ${data.label}`
        }
        className={`${focus} ${data.color} flex size-10 shrink-0 items-center justify-center rounded-full text-white shadow-sm`}
        onClick={onToggle}
        type="button"
      >
        {item === "notice" && <CheckIcon className="size-4" />}
        {item !== "notice" &&
          (playing ? (
            <PauseIcon className="size-4" />
          ) : (
            <PlayIcon className="size-4" />
          ))}
      </button>
    </div>
  );
}

function Cue({
  item,
  onClick,
  compact = false,
}: {
  item: Item;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      aria-label={`Show ${items[item].label}`}
      className={`${focus} border-border bg-background hover:bg-surface-hover flex min-h-10 min-w-10 items-center justify-center gap-1.5 rounded-xl border px-2 text-xs`}
      onClick={onClick}
      type="button"
    >
      <ItemIcon item={item} />
      {!compact && <span>{items[item].label}</span>}
      <span
        aria-hidden="true"
        className={`${items[item].color} size-1.5 shrink-0 rounded-full`}
      />
    </button>
  );
}

function Preview({ concept }: { concept: (typeof concepts)[number] }) {
  const [count, setCount] = useState<1 | 2 | 3>(2);
  const [selected, setSelected] = useState<Item>("timer");
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState<Record<"timer" | "music", boolean>>({
    timer: true,
    music: true,
  });
  const visible: Item[] = ["timer"];
  if (count >= 2) {
    visible.unshift("music");
  }
  if (count === 3) {
    visible.unshift("notice");
  }
  const current = visible.includes(selected) ? selected : "timer";
  const others = visible.filter((item) => item !== current);
  const pill = (item: Item) => (
    <Pill
      item={item}
      playing={item === "notice" || playing[item]}
      onToggle={() => {
        if (item === "notice") {
          setCount(2);
          setSelected("timer");
        } else {
          setPlaying((state) => ({ ...state, [item]: !state[item] }));
        }
      }}
    />
  );
  const cue = (item: Item, compact = false) => (
    <Cue
      compact={compact}
      item={item}
      key={item}
      onClick={() => {
        setSelected(item);
      }}
    />
  );

  return (
    <li className="border-border bg-foreground/2 flex min-w-0 flex-col gap-3 rounded-xl border border-dashed p-4">
      <div>
        <h4 className="font-medium">{concept.title}</h4>
        <p className="text-muted text-sm">{concept.description}</p>
      </div>
      <fieldset className="flex flex-wrap gap-1">
        <legend className="sr-only">{concept.title} item count</legend>
        {([1, 2, 3] as const).map((value) => (
          <button
            aria-pressed={count === value}
            className={`${focus} ${count === value ? "bg-foreground text-background" : "bg-surface-hover text-foreground"} min-h-10 rounded-lg px-3 text-xs`}
            key={value}
            onClick={() => {
              setCount(value);
            }}
            type="button"
          >
            {value} {value === 1 ? "item" : "items"}
          </button>
        ))}
      </fieldset>
      <div className="border-border bg-surface-hover flex min-h-56 min-w-0 flex-1 flex-col justify-end gap-2 rounded-xl border p-2">
        {concept.id === "peek" && (
          <div className="flex min-w-0 flex-col items-center">
            {others.map((item) => (
              <button
                aria-label={`Show ${items[item].label}`}
                className={`${focus} ${surface} relative -mb-2 flex h-12 w-[90%] items-start justify-between px-3 pt-1 text-xs`}
                key={item}
                onClick={() => {
                  setSelected(item);
                }}
                type="button"
              >
                <span className="flex items-center gap-1">
                  <ItemIcon item={item} />
                  {items[item].label}
                </span>
                <span
                  className={`${items[item].color} mt-1 size-2 rounded-full`}
                />
              </button>
            ))}
            <div className="relative w-full">{pill(current)}</div>
          </div>
        )}
        {concept.id === "side" && (
          <div className="flex min-w-0 items-center gap-1">
            <div className="min-w-0 flex-1">{pill(current)}</div>
            {others.length > 0 && (
              <div className="flex flex-col gap-1">
                {others.map((item) => cue(item, true))}
              </div>
            )}
          </div>
        )}
        {concept.id === "top" && (
          <div className="space-y-1">
            {others.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1">
                {others.map((item) => cue(item))}
              </div>
            )}
            {pill(current)}
          </div>
        )}
        {concept.id === "companion" && (
          <div className="space-y-1">
            {others.length > 0 && (
              <div className="flex flex-wrap justify-end gap-1">
                {others.map((item) => (
                  <button
                    aria-label={`Show ${items[item].label}`}
                    className={`${focus} ${surface} flex min-h-10 min-w-24 items-center gap-2 px-2 text-xs`}
                    key={item}
                    onClick={() => {
                      setSelected(item);
                    }}
                    type="button"
                  >
                    <ItemIcon item={item} />
                    <span className="min-w-0 flex-1 text-left">
                      <span className="block">{items[item].label}</span>
                      <span className="bg-slider-track-hover mt-1 block h-1 overflow-hidden rounded-full">
                        <span
                          className={`${items[item].color} ${items[item].progress} block h-full`}
                        />
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            )}
            {pill(current)}
          </div>
        )}
        {concept.id === "shared" && (
          <div className={`${surface} space-y-1 p-1`}>
            {others.map((item) => (
              <button
                className={`${focus} hover:bg-surface-hover flex min-h-10 w-full items-center gap-2 rounded-xl px-2 text-left text-xs`}
                key={item}
                onClick={() => {
                  setSelected(item);
                }}
                type="button"
              >
                <ItemIcon item={item} />
                <span className="min-w-0 flex-1 truncate">
                  {items[item].title}
                </span>
                <span className={`${items[item].color} size-2 rounded-full`} />
              </button>
            ))}
            {pill(current)}
          </div>
        )}
        {concept.id === "expandable" && (
          <div className="space-y-1">
            {expanded &&
              visible.map((item) => <div key={item}>{pill(item)}</div>)}
            <button
              aria-expanded={expanded}
              className={`${focus} ${surface} flex min-h-10 w-full items-center justify-between gap-2 px-3 text-xs`}
              onClick={() => {
                setExpanded((value) => !value);
              }}
              type="button"
            >
              <span>
                {expanded
                  ? "Hide items"
                  : `${visible.length} active ${visible.length === 1 ? "item" : "items"}`}
              </span>
              <span className="flex gap-2">
                {visible.map((item) => (
                  <ItemIcon item={item} key={item} />
                ))}
              </span>
            </button>
          </div>
        )}
        <TabBarButtom preview />
      </div>
    </li>
  );
}

export default function FloatingTaskVariations() {
  return (
    <div className="border-border border-t border-dashed pt-5">
      <Accordion>
        <AccordionItem
          excludeFromContents
          title="Compact floating area"
          value="compact-floating-area"
        >
          <div className="text-foreground space-y-4">
            <p className="text-muted text-sm">
              Explore simulated layouts for Music, Timer, and notifications.
            </p>
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {concepts.map((concept) => (
                <Preview concept={concept} key={concept.id} />
              ))}
            </ul>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
