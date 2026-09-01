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

const searchableFields = ["firstName", "lastName", "maidenName"] as const;

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

export default function ReactSearchTableDemo() {
  const [query, setQuery] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);

  const debouncedSearch = useDebounce(query, 1000);

  useEffect(() => {
    const dataFetch = async () => {
      const response = await fetch(`/api/searchWithApi?q=${debouncedSearch}`);
      const data: unknown = await response.json();
      setUsers(Array.isArray(data) ? data.filter(isUser) : []);
    };
    dataFetch();
  }, [debouncedSearch]);

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
      <div className="mb-14">
        <SourceCodeLink />
      </div>
      <input
        className="mb-5 rounded-md border-[1.5px] border-zinc-500 px-2 py-1 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-200"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        type="search"
        value={query}
      />
      <table className="border">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Mainden Name</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((item) =>
              searchableFields.some((key) =>
                item[key].toLowerCase().includes(query.toLowerCase())
              )
            )
            .map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.firstName}</td>
                <td>{d.lastName}</td>
                <td>{d.maidenName}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
