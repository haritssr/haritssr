import { Button as BaseButton } from "@base-ui/react/button";
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import { Suspense, useRef, useState } from "react";
import type { ReactNode } from "react";

import { useTimer } from "@/app/timer/_components/TimerProvider";
import { timerDate } from "@/app/timer/utils/timer";
import Button from "@/components/Button";

const BACKUP_ACTION_CLASS =
  "border-border text-muted hover:bg-foreground/5 focus-visible:outline-foreground corner-squircle relative -ml-px inline-flex min-h-8.5 cursor-pointer items-center justify-center border px-2 py-1.5 text-sm transition-colors duration-150 first:ml-0 first:rounded-l-xl last:rounded-r-xl focus-visible:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 data-disabled:cursor-not-allowed data-disabled:opacity-50 motion-reduce:transition-none";

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

async function importData(file: File) {
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("Choose a Timer backup smaller than 10 MB.");
  }
  const response = await fetch("/api/timer?backup=1", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: await file.text(),
  });
  const { z } = await import("zod");
  const result = z
    .object({
      imported: z.number().optional(),
      skipped: z.number().optional(),
      error: z.string().optional(),
    })
    .parse(await response.json());
  if (!response.ok) {
    throw new Error(result.error ?? "Backup could not be imported.");
  }
  return result;
}

export default function TimerDataControls({
  children,
}: {
  children: (actions: ReactNode) => ReactNode;
}) {
  const { snapshot, refresh, pendingCount } = useTimer();
  const input = useRef<HTMLInputElement>(null);
  const [working, setWorking] = useState(false);
  const [backupError, setBackupError] = useState<string | null>(null);
  const disabled = working || pendingCount > 0 || snapshot?.mode !== "turso";

  async function perform(operation: () => Promise<void>) {
    setWorking(true);
    setBackupError(null);
    try {
      await operation();
    } catch (error) {
      setBackupError(
        error instanceof Error
          ? error.message
          : "The backup could not be processed."
      );
    }
    setWorking(false);
  }

  return (
    <>
      <div className="space-y-2 text-sm">
        <Suspense>
          <SignInError />
        </Suspense>
        <div className="flex flex-wrap items-center gap-3">
          {snapshot?.mode === "demo" ? (
            <p className="text-muted">
              Sample activities. Personal Timer access is restricted to the
              owner.
            </p>
          ) : null}
        </div>
        <input
          accept="application/json,.json"
          aria-label="Import Timer backup"
          className="sr-only"
          disabled={disabled}
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (file === undefined) {
              return;
            }
            void perform(async () => {
              await importData(file);
              await refresh();
            });
          }}
          ref={input}
          tabIndex={-1}
          type="file"
        />
        {backupError === null ? null : (
          <div
            className="text-danger flex flex-wrap items-center gap-3"
            role="alert"
          >
            <p>{backupError}</p>
            <Button
              onClick={() => {
                setBackupError(null);
                void refresh();
              }}
              variant="outline"
            >
              Retry
            </Button>
          </div>
        )}
      </div>
      {children(
        <div className="isolate inline-flex shrink-0 items-center rounded">
          <BaseButton
            aria-label="Export Timer backup"
            className={BACKUP_ACTION_CLASS}
            disabled={disabled}
            onClick={() => {
              void perform(exportData);
            }}
            title="Export"
          >
            <ArrowDownTrayIcon aria-hidden="true" className="size-4.5" />
          </BaseButton>
          <BaseButton
            aria-label="Import Timer backup"
            className={BACKUP_ACTION_CLASS}
            disabled={disabled}
            onClick={() => {
              input.current?.click();
            }}
            title="Import"
          >
            <ArrowUpTrayIcon aria-hidden="true" className="size-4.5" />
          </BaseButton>
        </div>
      )}
    </>
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
