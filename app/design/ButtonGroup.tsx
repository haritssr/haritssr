"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import { ButtonGroup, ButtonGroupItem } from "@/components/ButtonGroup";

const formattingOptions = ["Bold", "Italic", "Underline"] as const;

export default function ButtonGroupExample() {
  const [page, setPage] = useState(1);
  const [view, setView] = useState<"list" | "grid">("list");
  const [formatting, setFormatting] = useState<string[]>([]);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-3">
        <ButtonGroup aria-label="Example navigation">
          <ButtonGroupItem
            aria-label="Previous"
            disabled={page === 1}
            onClick={() => {
              setPage((current) => current - 1);
            }}
            title="Previous"
          >
            <ChevronLeftIcon aria-hidden="true" className="size-4.5" />
          </ButtonGroupItem>
          <ButtonGroupItem
            aria-label="Next"
            disabled={page === 3}
            onClick={() => {
              setPage((current) => current + 1);
            }}
            title="Next"
          >
            <ChevronRightIcon aria-hidden="true" className="size-4.5" />
          </ButtonGroupItem>
        </ButtonGroup>
        <span aria-live="polite" className="text-muted text-sm tabular-nums">
          {page} / 3
        </span>
      </div>
      <ButtonGroup aria-label="View layout">
        <ButtonGroupItem
          aria-pressed={view === "list"}
          onClick={() => {
            setView("list");
          }}
        >
          List
        </ButtonGroupItem>
        <ButtonGroupItem
          aria-pressed={view === "grid"}
          onClick={() => {
            setView("grid");
          }}
        >
          Grid
        </ButtonGroupItem>
      </ButtonGroup>
      <ButtonGroup aria-label="Text formatting">
        {formattingOptions.map((option) => (
          <ButtonGroupItem
            aria-pressed={formatting.includes(option)}
            key={option}
            onClick={() => {
              setFormatting((current) =>
                current.includes(option)
                  ? current.filter((item) => item !== option)
                  : [...current, option]
              );
            }}
          >
            {option}
          </ButtonGroupItem>
        ))}
      </ButtonGroup>
    </div>
  );
}
