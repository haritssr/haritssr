"use client";

import { parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs";
import { useId } from "react";

import { filterExperiments } from "@/data/experimentExplorer";
import type { ExperimentSummary } from "@/data/experimentExplorer";

import ExperimentResults from "./ExperimentResults";
import { SelectField } from "./SelectField";

const sortOptions = [
  { label: "Recently updated", value: "recent" },
  { label: "Title A–Z", value: "title" },
];

const parsers = {
  q: parseAsString.withDefault(""),
  domain: parseAsString.withDefault(""),
  tag: parseAsString.withDefault(""),
  sort: parseAsStringLiteral(["recent", "title"]).withDefault("recent"),
};

export default function ExperimentExplorer({
  items,
}: {
  items: readonly ExperimentSummary[];
}) {
  const id = useId();
  const [filters, setFilters] = useQueryStates(parsers, {
    history: "push",
    shallow: true,
    scroll: false,
  });
  const domains = [
    ...new Map(
      items.map((item) => [
        item.domain,
        { label: item.domainTitle, value: item.domain },
      ])
    ).values(),
  ];
  const tags = [...new Set(items.flatMap((item) => item.tags))].toSorted();
  const domain = domains.some((option) => option.value === filters.domain)
    ? filters.domain
    : "";
  const tag = tags.includes(filters.tag) ? filters.tag : "";
  const results = filterExperiments(items, { ...filters, domain, tag });
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2 sm:col-span-3">
          <label
            htmlFor={id}
            className="text-foreground/80 block text-sm font-medium"
          >
            Search experiments
          </label>
          <input
            id={id}
            type="search"
            autoComplete="off"
            value={filters.q}
            onChange={(event) => {
              void setFilters(
                { q: event.target.value },
                { history: "replace" }
              );
            }}
            placeholder="Search titles, descriptions, and topics…"
            className="form-control border-border focus:border-action w-full rounded-lg border px-3 py-2 outline-none"
          />
        </div>
        <SelectField
          label="Category"
          value={domain}
          options={[{ label: "All categories", value: "" }, ...domains]}
          onValueChange={(value) => {
            void setFilters({ domain: value });
          }}
        />
        <SelectField
          label="Topic"
          value={tag}
          options={[
            { label: "All topics", value: "" },
            ...tags.map((value) => ({
              value,
              label: value.replaceAll("-", " "),
            })),
          ]}
          onValueChange={(value) => {
            void setFilters({ tag: value });
          }}
        />
        <SelectField
          label="Sort"
          value={filters.sort}
          options={sortOptions}
          onValueChange={(value) => {
            void setFilters({ sort: value === "title" ? "title" : "recent" });
          }}
        />
      </div>
      <div className="flex items-center justify-between gap-4 text-sm">
        <output aria-live="polite" className="text-muted">
          {results.length} of {items.length} experiments
        </output>
        <button
          type="button"
          className="text-action focus-visible:outline-action cursor-pointer rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
          onClick={() => {
            void setFilters(null);
          }}
        >
          Clear filters
        </button>
      </div>
      {results.length === 0 ? (
        <p className="text-muted bg-foreground/5 rounded-xl p-6">
          No experiments match these filters. Try another search or clear the
          filters.
        </p>
      ) : (
        <ExperimentResults items={results} />
      )}
    </div>
  );
}
