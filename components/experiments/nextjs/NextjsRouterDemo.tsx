"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useState } from "react";
import ExternalLink from "@/components/ExternalLink";
import Section from "@/components/Section";
import SubTitle from "@/components/SubTitle";

export default function NextjsRouterDemo() {
  return (
    <Suspense fallback={<div>Loading router demo...</div>}>
      <RouterDemoContent />
    </Suspense>
  );
}

function RouterDemoContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState("");

  // Get current query params
  const currentQuery = searchParams?.toString() || "";
  const queryObj: Record<string, string> = {};
  searchParams?.forEach((value, key) => {
    queryObj[key] = value;
  });

  const style = "text-gray-500 font-mono text-sm";

  // Navigation handlers
  const handlePush = useCallback(() => {
    if (inputValue) {
      const params = new URLSearchParams(searchParams?.toString());
      params.set("q", inputValue);
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [inputValue, pathname, router, searchParams]);

  const handleReplace = useCallback(() => {
    if (inputValue) {
      const params = new URLSearchParams(searchParams?.toString());
      params.set("replace", inputValue);
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [inputValue, pathname, router, searchParams]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleForward = useCallback(() => {
    router.forward();
  }, [router]);

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  return (
    <>
      <SubTitle>
        <ExternalLink
          href="https://nextjs.org/docs/app/api-reference/functions/use-router"
          name="next/navigation"
        />
      </SubTitle>

      <div className="mb-10 space-y-2">
        <Section name="usePathname" />
        <div>
          pathname = <span className={style}>{pathname}</span>
        </div>

        <Section name="useSearchParams" />
        <div>
          searchParams.toString() ={" "}
          <span className={style}>{currentQuery || "(empty)"}</span>
        </div>
        {Object.keys(queryObj).length > 0 && (
          <div className="mt-2">
            <div className="text-sm text-zinc-600">Parsed query params:</div>
            <pre className="mt-1 rounded bg-zinc-100 p-2 text-xs">
              {JSON.stringify(queryObj, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <Section name="router.push" />
      <p className="mb-3 text-sm text-zinc-600">
        Add a query parameter using router.push (adds to history)
      </p>
      <div className="flex flex-wrap gap-2">
        <input
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handlePush()}
          placeholder="Enter value..."
          type="text"
          value={inputValue}
        />
        <button
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
          disabled={!inputValue}
          onClick={handlePush}
          type="button"
        >
          router.push
        </button>
      </div>

      <Section name="router.replace" />
      <p className="mb-3 text-sm text-zinc-600">
        Replace current URL without adding to history
      </p>
      <button
        className="rounded-md bg-zinc-700 px-4 py-2 text-sm text-white hover:bg-zinc-800 disabled:opacity-50"
        disabled={!inputValue}
        onClick={handleReplace}
        type="button"
      >
        router.replace with input value
      </button>

      <Section name="Navigation Methods" />
      <div className="flex flex-wrap gap-2">
        <button
          className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
          onClick={handleBack}
          type="button"
        >
          router.back()
        </button>
        <button
          className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
          onClick={handleForward}
          type="button"
        >
          router.forward()
        </button>
        <button
          className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
          onClick={handleRefresh}
          type="button"
        >
          router.refresh()
        </button>
      </div>

      <Section name="Link Component" />
      <p className="mb-3 text-sm text-zinc-600">
        Using Link from next/link for client-side navigation:
      </p>
      <div className="flex flex-wrap gap-2">
        <a
          className="rounded-md border border-blue-300 bg-blue-50 px-4 py-2 text-sm text-blue-700 hover:bg-blue-100"
          href="/experiments"
        >
          Go to Experiments (regular anchor)
        </a>
      </div>
      <p className="mt-2 text-xs text-zinc-500">
        Note: In App Router, use the Link component from next/link for
        client-side navigation without full page reload.
      </p>
    </>
  );
}
