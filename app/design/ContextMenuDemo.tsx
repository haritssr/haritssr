import { ContextMenu } from "@base-ui/react/context-menu";
import { useState } from "react";

export default function ContextMenuDemo() {
  const [action, setAction] = useState("Right-click the panel");

  return (
    <div className="space-y-2">
      <ContextMenu.Root>
        <ContextMenu.Trigger className="focus-visible:outline-action flex min-h-20 w-full max-w-xs items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-zinc-50 px-3 text-sm text-zinc-600 outline-hidden hover:bg-zinc-100 focus-visible:outline-2">
          Right-click here
        </ContextMenu.Trigger>
        <ContextMenu.Portal>
          <ContextMenu.Positioner>
            <ContextMenu.Popup className="z-50 min-w-40 rounded-lg border border-zinc-300 bg-white p-1 shadow-xl">
              <ContextMenu.Item
                className="cursor-pointer rounded-md px-2 py-1.5 text-sm text-zinc-700 outline-hidden data-highlighted:bg-zinc-100"
                onClick={() => {
                  setAction("Edit selected");
                }}
              >
                Edit
              </ContextMenu.Item>
              <ContextMenu.Item
                className="cursor-pointer rounded-md px-2 py-1.5 text-sm text-zinc-700 outline-hidden data-highlighted:bg-zinc-100"
                onClick={() => {
                  setAction("Duplicate selected");
                }}
              >
                Duplicate
              </ContextMenu.Item>
            </ContextMenu.Popup>
          </ContextMenu.Positioner>
        </ContextMenu.Portal>
      </ContextMenu.Root>
      <p className="text-xs text-zinc-500">{action}</p>
    </div>
  );
}
