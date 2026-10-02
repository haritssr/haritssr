"use client";

import { useEffect, useState } from "react";

import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
}

export default function ReactSearchTableDemo() {
  const [query, setQuery] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(query, 1000);

  useEffect(() => {
    setUsers([]);
    setError(null);
    setLoading(false);
    if (query !== debouncedSearch) {
      return;
    }

    const controller = new AbortController();
    const dataFetch = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ q: debouncedSearch });
        const response = await fetch(`/api/searchWithApi?${params}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`People search failed: ${response.status}`);
        }
        const data: unknown = await response.json();
        if (!Array.isArray(data) || !data.every(isUser)) {
          throw new TypeError("People search response is invalid");
        }
        if (!controller.signal.aborted) {
          setUsers(data);
        }
      } catch {
        if (!controller.signal.aborted) {
          setError("People could not be loaded. Try another search.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };
    void dataFetch();
    return () => {
      controller.abort();
    };
  }, [debouncedSearch, query]);

  return (
    <>
      <SubTitle>
        <ExplanationList>
          <li>
            Inspired by{" "}
            <ExternalLink
              href="https://www.youtube.com/watch?v=MY6ZZIn93V8"
              name="Lama Dev"
            />
          </li>
          <li>
            Data source: the local{" "}
            <code className="rounded-md border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 font-mono text-sm">
              /api/searchWithApi
            </code>{" "}
            route.
          </li>
          <li>Already applied debounce on search.</li>
        </ExplanationList>
      </SubTitle>
      <SourceCodeLink />
      <input
        aria-label="Search people"
        className="mb-5 rounded-md border-[1.5px] border-zinc-500 px-2 py-1 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-hidden"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        placeholder="Search"
        type="search"
        value={query}
      />
      {loading || query !== debouncedSearch ? (
        <output className="block">Searching…</output>
      ) : null}
      {error ? <p role="alert">{error}</p> : null}
      <div className="scrollbar-subtle w-full overflow-x-auto">
        <table
          aria-busy={loading || query !== debouncedSearch}
          className="border"
        >
          <caption className="sr-only">People search results</caption>
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Maiden Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.firstName}</td>
                <td>{d.lastName}</td>
                <td>{d.maidenName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function isUser(value: unknown): value is User {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const user = value as Record<string, unknown>;
  return (
    typeof user.id === "number" &&
    typeof user.firstName === "string" &&
    typeof user.lastName === "string" &&
    typeof user.maidenName === "string" &&
    typeof user.age === "number"
  );
}

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
