import { Tooltip } from "@base-ui/react/tooltip";
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";

import { useTimer } from "@/app/(tools)/timer/_components/TimerProvider";
import { timerDate } from "@/app/(tools)/timer/utils/timer";
import Button from "@/components/Button";
import { ButtonGroup, ButtonGroupItem } from "@/components/ButtonGroup";

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
  const { snapshot, refresh, pendingCount } = useTimer(
    "snapshot",
    "refresh",
    "pendingCount"
  );
  const input = useRef<HTMLInputElement>(null);
  const [working, setWorking] = useState(false);
  const [backupError, setBackupError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const feedbackTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const disabled = working || pendingCount > 0 || snapshot?.mode !== "turso";

  useEffect(
    () => () => {
      if (feedbackTimeout.current !== null) {
        clearTimeout(feedbackTimeout.current);
      }
    },
    []
  );

  function showFeedback(label: string) {
    if (feedbackTimeout.current !== null) {
      clearTimeout(feedbackTimeout.current);
    }
    setFeedback(label);
    feedbackTimeout.current = setTimeout(() => {
      setFeedback("");
      feedbackTimeout.current = null;
    }, 2000);
  }

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
        <ButtonGroup aria-label="Timer backup">
          <BackupButton
            label="Export"
            open={feedback === "Export"}
            disabled={disabled}
            onClick={() => {
              showFeedback("Export");
              void perform(exportData);
            }}
          >
            <ArrowUpTrayIcon aria-hidden="true" className="size-4.5 stroke-2" />
          </BackupButton>
          <BackupButton
            label="Import"
            open={feedback === "Import"}
            disabled={disabled}
            onClick={() => {
              showFeedback("Import");
              input.current?.click();
            }}
          >
            <ArrowDownTrayIcon
              aria-hidden="true"
              className="size-4.5 stroke-2"
            />
          </BackupButton>
        </ButtonGroup>
      )}
    </>
  );
}

function BackupButton({
  label,
  open,
  disabled,
  onClick,
  children,
}: {
  label: string;
  open: boolean;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <Tooltip.Root open={open} triggerId={id}>
      <Tooltip.Trigger
        id={id}
        closeOnClick={false}
        render={
          <ButtonGroupItem
            aria-label={`${label} Timer backup`}
            disabled={disabled}
            onClick={onClick}
          />
        }
      >
        {children}
        <span className="hidden lg:inline">{label}</span>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner
          side="top"
          align="center"
          sideOffset={8}
          positionMethod="fixed"
          className="pointer-events-none z-100 sm:hidden"
        >
          <Tooltip.Popup className="bg-foreground text-background rounded-md px-2.5 py-1.5 text-sm shadow-xl">
            {label}
            <Tooltip.Arrow className="data-[side=bottom]:bottom-full data-[side=bottom]:rotate-180 data-[side=top]:top-full">
              <svg
                aria-hidden="true"
                width="10"
                height="5"
                viewBox="0 0 10 5"
                className="fill-foreground"
              >
                <path d="M0 0h10L5 5Z" />
              </svg>
            </Tooltip.Arrow>
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
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
