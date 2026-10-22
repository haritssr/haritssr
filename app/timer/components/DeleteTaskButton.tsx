import { AlertDialog } from "@base-ui/react/alert-dialog";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import type { ComponentProps } from "react";

import Button from "@/components/Button";

export default function DeleteTaskButton({
  onDelete,
  children,
  ...buttonProps
}: Omit<ComponentProps<typeof Button>, "onClick"> & {
  onDelete: () => Promise<boolean> | Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(false);

  async function confirmDelete() {
    setDeleting(true);
    setError(false);
    try {
      if ((await onDelete()) === false) {
        setError(true);
      } else {
        setOpen(false);
      }
    } catch {
      setError(true);
    }
    setDeleting(false);
  }

  return (
    <AlertDialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!deleting) {
          setOpen(next);
          setError(false);
        }
      }}
    >
      <AlertDialog.Trigger
        render={
          <Button aria-label="Delete task" title="Delete" {...buttonProps} />
        }
      >
        {children ?? <TrashIcon aria-hidden="true" className="size-5" />}
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop
          forceRender
          className="bg-foreground/40 fixed inset-0 z-100"
        />
        <AlertDialog.Popup className="border-border bg-background text-foreground shadow-floating fixed top-1/2 left-1/2 z-100 w-[calc(100%-3rem)] max-w-xs -translate-x-1/2 -translate-y-1/2 rounded-xl border p-5 outline-hidden">
          <AlertDialog.Title className="font-semibold">
            Delete task?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-muted mt-2 text-sm">
            This task will be permanently deleted.
          </AlertDialog.Description>
          {error ? (
            <p className="text-danger mt-3 text-sm" role="alert">
              The task could not be deleted. Please try again.
            </p>
          ) : null}
          <div className="mt-5 flex justify-end gap-3">
            <AlertDialog.Close
              disabled={deleting}
              render={<Button variant="secondary" />}
            >
              Cancel
            </AlertDialog.Close>
            <Button
              aria-label="Confirm delete task"
              title="Delete"
              loading={deleting}
              variant="danger-subtle"
              onClick={() => {
                void confirmDelete();
              }}
            >
              Delete
            </Button>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
