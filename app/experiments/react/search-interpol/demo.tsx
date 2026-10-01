"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";

interface Notice {
  _links: Links;
  date_of_birth?: string | null;
  entity_id: string;
  forename: string;
  name: string;
}

interface Links {
  thumbnail?: Images;
}

interface Images {
  href: string;
}

export default function ReactSearchInterpolDemo() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setNotices([]);
    setLoading(false);
    setError(null);
    if (!debouncedSearch.trim() || search !== debouncedSearch) {
      return;
    }

    const controller = new AbortController();
    async function fetchData() {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          forename: debouncedSearch.trim(),
          resultPerPage: "50",
        });
        const response = await fetch(
          `https://ws-public.interpol.int/notices/v1/red?${params}`,
          { signal: controller.signal }
        );
        if (!response.ok) {
          throw new Error(`Interpol search failed: ${response.status}`);
        }
        const data: unknown = await response.json();
        const results = getNotices(data);
        if (!controller.signal.aborted) {
          setNotices(results);
        }
      } catch {
        if (!controller.signal.aborted) {
          setError("Notices could not be loaded. Try another search.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }
    void fetchData();
    return () => {
      controller.abort();
    };
  }, [debouncedSearch, search]);

  return (
    <>
      <SubTitle>
        <ExplanationList>
          <li>
            Inspired by{" "}
            <ExternalLink
              href="https://www.youtube.com/watch?v=PySFIsgXNZ0"
              name="TomDoesTech"
            />
          </li>
          <li>
            Data source{" "}
            <ExternalLink
              href="https://ws-public.interpol.int/notices/v1/red"
              name="ws-public interpol"
            />
          </li>
          <li>Already applied debounce on search</li>
          <li>
            Search by name with the result of prisoners from interpol public API
          </li>
        </ExplanationList>
      </SubTitle>
      <SourceCodeLink />

      <input
        aria-label="Search Interpol notices"
        className="cursor-text rounded border px-2 py-1 hover:border-zinc-700 focus:border-zinc-700 focus:ring-2 focus:ring-zinc-200 focus:outline-hidden"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="search"
        type="search"
        value={search}
      />

      {loading || (search.trim() && search !== debouncedSearch) ? (
        <output className="block">Searching…</output>
      ) : null}
      {error ? <p role="alert">{error}</p> : null}
      <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4">
        {notices.map((notice) => (
          <div key={notice.entity_id}>
            {/* Conditionally show image if the 'notices' have a href (src attribute of img) */}
            {!!notice._links.thumbnail?.href && (
              <div>
                <Image
                  alt={notice.name}
                  blurDataURL={notice._links.thumbnail.href}
                  height="100"
                  src={notice._links.thumbnail.href}
                  width="100"
                />
                <div>{notice.forename}</div>
                <div>{notice.date_of_birth}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

// generate new input value after certain delayed time (in ms) using useEffect
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function getNotices(value: unknown): Notice[] {
  if (
    typeof value !== "object" ||
    value === null ||
    !("_embedded" in value) ||
    typeof value._embedded !== "object" ||
    value._embedded === null ||
    !("notices" in value._embedded) ||
    !Array.isArray(value._embedded.notices) ||
    !value._embedded.notices.every(isNotice)
  ) {
    throw new TypeError("Interpol search response is invalid");
  }
  return value._embedded.notices;
}

function isNotice(value: unknown): value is Notice {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const notice = value as Partial<Notice>;
  return (
    typeof notice.entity_id === "string" &&
    typeof notice.forename === "string" &&
    typeof notice.name === "string" &&
    (notice.date_of_birth === null ||
      notice.date_of_birth === undefined ||
      typeof notice.date_of_birth === "string") &&
    typeof notice._links === "object" &&
    notice._links !== null &&
    (notice._links.thumbnail === undefined ||
      (typeof notice._links.thumbnail === "object" &&
        notice._links.thumbnail !== null &&
        typeof notice._links.thumbnail.href === "string"))
  );
}
