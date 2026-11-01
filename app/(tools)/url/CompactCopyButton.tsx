"use client";

import { Toast } from "@base-ui/react/toast";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function CompactCopyButton({
  value,
  label,
  className = "",
}: {
  value: string;
  label: string;
  className?: string;
}) {
  const { add } = Toast.useToastManager();
  const [copied, setCopied] = useState(0);
  useEffect(() => {
    const timer = copied
      ? setTimeout(() => {
          setCopied(0);
        }, 2000)
      : undefined;
    return () => {
      clearTimeout(timer);
    };
  }, [copied]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied((previous) => previous + 1);
    } catch {
      add({
        id: "url-copy-error",
        title: "Could not copy",
        description: "Select the text and copy it manually.",
      });
    }
  }
  return (
    <button
      type="button"
      aria-label={copied ? `${label} copied` : `Copy ${label.toLowerCase()}`}
      className={`text-foreground bg-foreground/5 hover:bg-foreground/10 focus-visible:outline-action inline-flex cursor-pointer items-center justify-center gap-1 rounded-md px-1.5 py-0.5 text-sm focus-visible:outline-2 ${className}`}
      onClick={() => {
        void copy();
      }}
    >
      <span className="grid place-items-center">
        <span
          aria-hidden="true"
          className={`col-start-1 row-start-1 ${copied ? "invisible" : ""}`}
        >
          Copy
        </span>
        {copied ? (
          <CheckIcon
            aria-hidden="true"
            className="text-success col-start-1 row-start-1 size-4"
            strokeWidth={3}
          />
        ) : null}
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}
