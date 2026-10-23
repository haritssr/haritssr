"use client";

import { useState } from "react";

import GlobalErrorContent from "@/components/GlobalErrorContent";

const previewError = Object.assign(new Error("Preview"), {
  digest: "preview-error-id",
});

export default function GlobalErrorPreview() {
  const [attempts, setAttempts] = useState(0);
  return (
    <div className="space-y-5">
      <div className="border-border rounded-xl border px-5">
        <GlobalErrorContent
          error={previewError}
          fullScreen={false}
          retry={() => {
            setAttempts((count) => count + 1);
          }}
        />
      </div>
      <p aria-live="polite" className="text-muted text-sm">
        {attempts > 0
          ? `Retry requested (${attempts}). This preview keeps the site running.`
          : "This is the same interface used by the global error boundary. Try again demonstrates its recovery action."}
      </p>
    </div>
  );
}
