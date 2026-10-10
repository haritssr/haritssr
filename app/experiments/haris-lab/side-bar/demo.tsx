"use client";

import { Accordion } from "@base-ui/react/accordion";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import SourceCodeLink from "@/components/SourceCodeLink";

export default function SideBarDemo() {
  const [openChapters, setOpenChapters] = useState<string[]>([]);
  const openAll = chapterTitles.every((title) => openChapters.includes(title));

  return (
    <div className="w-full space-y-5">
      <SourceCodeLink />
      {fisika.map((domain) => (
        <div key={domain.title}>
          <div className="pl-2 text-lg font-medium">{domain.title}</div>
          <button
            type="button"
            onClick={() => setOpenChapters(openAll ? [] : chapterTitles)}
          >
            {openAll ? "Close All" : "Open All"}
          </button>
          <Accordion.Root
            multiple
            value={openChapters}
            onValueChange={setOpenChapters}
          >
            {domain.chapters.map((chapter) =>
              chapter === undefined ? null : (
                <Accordion.Item
                  className="w-full rounded-md px-2 hover:bg-zinc-100 sm:w-1/3"
                  key={chapter.title}
                  value={chapter.title}
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="group flex w-full items-center justify-between py-1">
                      {chapter.title}
                      <ChevronRightIcon
                        aria-hidden="true"
                        className="h-4 w-4 group-data-panel-open:rotate-90"
                      />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel className="pl-3">
                    {chapter.topics.map((topic) => (
                      <div
                        key={topic}
                        className="cursor-pointer hover:bg-zinc-200"
                      >
                        {topic}
                      </div>
                    ))}
                  </Accordion.Panel>
                </Accordion.Item>
              )
            )}
          </Accordion.Root>
        </div>
      ))}
    </div>
  );
}

type fisikaType = {
  title: string;
  chapters: ({ title: string; topics: string[] } | undefined)[];
}[];

const fisika: fisikaType = [
  {
    title: "Termodinamika",
    chapters: [
      {
        title: "Suhu",
        topics: ["Topic 1", "Topic 2", "Topic 3", "Topic 4"],
      },
      {
        title: "Kalor",
        topics: ["Topic 1", "Topic 2", "Topic 3", "Topic 4"],
      },
      {
        title: "Pemuaian",
        topics: ["Topic 1", "Topic 2", "Topic 3", "Topic 4"],
      },
      {
        title: "Radiasi Benda Hitam",
        topics: ["Topic 1", "Topic 2", "Topic 3", "Topic 4"],
      },
    ],
  },
  {
    title: "Fluida",
    chapters: [
      {
        title: "Fluida Statis",
        topics: ["Topic 1", "Topic 2", "Topic 3", "Topic 4"],
      },
      {
        title: "Fluida Dinamis",
        topics: ["Topic 1", "Topic 2", "Topic 3", "Topic 4"],
      },
    ],
  },
];

const chapterTitles = fisika.flatMap((domain) =>
  domain.chapters.flatMap((chapter) =>
    chapter === undefined ? [] : [chapter.title]
  )
);
