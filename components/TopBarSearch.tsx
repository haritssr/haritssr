"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { RouteDoc } from "../data/routes";
import { searchRoutes } from "../data/routes";

export default function TopBarSearch() {
  const [isOpen, setIsOpen] = useState<true | false>(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const results = useMemo(() => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return [];
    }

    return searchRoutes(trimmedQuery);
  }, [query]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  function openSearch() {
    setIsOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }

  function handleSelect(route: string) {
    setIsOpen(false);
    setQuery("");
    router.push(route);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (results.length > 0) {
      handleSelect(results[0].route);
    }
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        aria-label="Search routes"
        className="flex cursor-pointer items-center justify-center"
        onClick={openSearch}
        title="Search"
        type="button"
      >
        <MagnifyingGlassIcon className="block size-5 text-zinc-800 hover:text-zinc-400" />
      </button>

      {Boolean(isOpen) && (
        <div className="absolute top-8 right-0 z-50 w-72 rounded-md border border-zinc-200 bg-white p-2 shadow-lg">
          <form onSubmit={handleSubmit}>
            <input
              className="w-full rounded-md border border-zinc-300 px-2 py-1.5 text-sm outline-none focus:border-zinc-500"
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setIsOpen(false);
                }
              }}
              placeholder="Search route..."
              ref={inputRef}
              type="search"
              value={query}
            />
          </form>

          <div className="mt-2 max-h-72 overflow-auto">
            {query.trim().length === 0 && (
              <div className="px-2 py-1 text-xs text-zinc-500">
                Type to search routes
              </div>
            )}

            {query.trim().length > 0 && results.length === 0 && (
              <div className="px-2 py-1 text-xs text-zinc-500">
                No route found
              </div>
            )}

            {results.map((result: RouteDoc) => {
              const isActive = pathname === result.route;

              return (
                <Link
                  className={`block rounded px-2 py-1.5 text-sm ${
                    isActive
                      ? "bg-zinc-100 text-zinc-900"
                      : "text-zinc-700 hover:bg-zinc-100"
                  }`}
                  href={result.route}
                  key={result.id}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                  }}
                >
                  <div className="font-medium">{result.title}</div>
                  <div className="text-xs text-zinc-500">{result.route}</div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
