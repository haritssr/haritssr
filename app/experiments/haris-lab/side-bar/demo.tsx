"use client";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Accordion } from "radix-ui";
import type React from "react";
import { useRef, useState } from "react";

import SourceCodeLink from "@/components/SourceCodeLink";

export default function SideBarDemo() {
  const [openAll, setOpenAll] = useState<boolean>(false);
  return (
    // Subjek
    <div className="w-full space-y-5">
      <SourceCodeLink />
      {/* Domains */}
      {fisika.map((domain) => (
        <div key={domain.title}>
          <div>
            <div className="pl-2 text-lg font-medium">{domain.title}</div>
            <button
              onClick={() => {
                setOpenAll(!openAll);
              }}
              type="button"
            >
              Open All
            </button>
            <div>{openAll.toString()}</div>
          </div>
          <div>
            {/* Chapters */}
            {domain.chapters.map((chapter) => (
              <AccordionC
                isOpen={openAll}
                key={chapter?.title}
                title={chapter?.title ?? " "}
              >
                {chapter?.topics.map((topic) => (
                  // Topic
                  <div className="cursor-pointer hover:bg-zinc-200" key={topic}>
                    {topic}
                  </div>
                ))}
              </AccordionC>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function AccordionC({
  title,
  children,
  isOpen,
}: {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Accordion.Root
      className="w-full rounded-md px-2 hover:bg-zinc-100 sm:w-1/3"
      type="multiple"
    >
      <Accordion.Item value="item-1">
        <Accordion.Header className="group">
          <Accordion.Trigger
            className="flex w-full items-center justify-between py-1"
            data-state={isOpen ? "open" : "closed"}
          >
            {title} {isOpen.toString()} {isOpen.toString()}
            {ref.current?.dataset.state}
            <ChevronRightIcon className="group-rdx-state-open:rotate-90 h-4 w-4" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="pl-3" ref={ref}>
          {children}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
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
