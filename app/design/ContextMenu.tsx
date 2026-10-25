"use client";

import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { useState } from "react";

export default function ContextMenu() {
  const [action, setAction] = useState("");

  return (
    <div className="space-y-2">
      <BaseContextMenu.Root>
        <BaseContextMenu.Trigger className="focus-visible:outline-action border-border bg-foreground/5 text-foreground/70 flex min-h-20 w-full max-w-full cursor-pointer items-center justify-center rounded-lg border border-dashed px-3 text-sm outline-hidden focus-visible:outline-2">
          Right-click here
        </BaseContextMenu.Trigger>
        <BaseContextMenu.Portal>
          <BaseContextMenu.Positioner>
            <BaseContextMenu.Popup className="border-border z-50 min-w-40 rounded-lg border bg-white p-1 shadow-xl">
              <BaseContextMenu.Item
                className="text-foreground/80 data-highlighted:bg-foreground/10 cursor-pointer rounded-md px-2 py-1.5 text-sm outline-hidden"
                onClick={() => {
                  setAction("Edit selected");
                }}
              >
                Edit
              </BaseContextMenu.Item>
              <BaseContextMenu.Item
                className="text-foreground/80 data-highlighted:bg-foreground/10 cursor-pointer rounded-md px-2 py-1.5 text-sm outline-hidden"
                onClick={() => {
                  setAction("Duplicate selected");
                }}
              >
                Duplicate
              </BaseContextMenu.Item>
            </BaseContextMenu.Popup>
          </BaseContextMenu.Positioner>
        </BaseContextMenu.Portal>
      </BaseContextMenu.Root>
      {action ? <p className="text-muted text-xs">{action}</p> : null}
    </div>
  );
}
