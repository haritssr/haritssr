import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import type { ReactNode } from "react";

import { useTimer } from "@/app/(tools)/timer/_components/TimerProvider";
import { timerDate } from "@/app/(tools)/timer/utils/timer";
import Button from "@/components/Button";

async function exportData() {
  const response = await fetch("/api/timer?backup=1", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Backup could not be exported. Sign in and try again.");
  }
  const text = await response.text();
  const url = URL.createObjectURL(
    new Blob([text], { type: "application/json" })
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `timer-backup-${timerDate()}.json`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 0);
}

export default function TimerDataControls({
  children,
}: {
  children: ReactNode;
}) {
  const { snapshot } = useTimer("snapshot");
  return (
    <div className="flex flex-col gap-2 text-sm">
      <Suspense>
        <SignInError />
      </Suspense>
      {snapshot?.mode === "demo" ? (
        <p className="text-muted">
          Sample activities. Personal Timer access is restricted to the owner.
        </p>
      ) : null}
      {children}
    </div>
  );
}

export function TimerDownloadButton() {
  const { snapshot, pendingCount } = useTimer("snapshot", "pendingCount");
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function download() {
    setWorking(true);
    setError(null);
    try {
      await exportData();
    } catch (error_) {
      setError(
        error_ instanceof Error
          ? error_.message
          : "The backup could not be downloaded."
      );
    }
    setWorking(false);
  }

  return (
    <div className="space-y-2">
      <Button
        variant="primary"
        disabled={working || pendingCount > 0 || snapshot?.mode !== "turso"}
        onClick={() => {
          void download();
        }}
      >
        <span aria-live="polite">
          {working ? "Downloading..." : "Download all record"}
        </span>
      </Button>
      {error === null ? null : (
        <p className="text-danger text-sm" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function SignInError() {
  const query = useSearchParams();
  return query.get("auth") === "failed" ? (
    <p className="text-danger" role="alert">
      Sign-in failed or this Google account is not allowed. Try again with the
      configured owner account.
    </p>
  ) : null;
}
