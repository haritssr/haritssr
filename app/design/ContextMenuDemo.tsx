import { ContextMenu } from "@base-ui/react/context-menu";
import { useState } from "react";

export default function ContextMenuDemo() {
  const [action, setAction] = useState("Right-click the panel");

  return (
    <div className="space-y-2">
      <ContextMenu.Root>
        <ContextMenu.Trigger className="focus-visible:outline-action border-border bg-foreground/5 text-foreground/70 hover:bg-foreground/10 flex min-h-20 w-full max-w-xs items-center justify-center rounded-lg border border-dashed px-3 text-sm outline-hidden focus-visible:outline-2">
          Right-click here
        </ContextMenu.Trigger>
        <ContextMenu.Portal>
          <ContextMenu.Positioner>
            <ContextMenu.Popup className="border-border z-50 min-w-40 rounded-lg border bg-white p-1 shadow-xl">
              <ContextMenu.Item
                className="text-foreground/80 data-highlighted:bg-foreground/10 cursor-pointer rounded-md px-2 py-1.5 text-sm outline-hidden"
                onClick={() => {
                  setAction("Edit selected");
                }}
              >
                Edit
              </ContextMenu.Item>
              <ContextMenu.Item
                className="text-foreground/80 data-highlighted:bg-foreground/10 cursor-pointer rounded-md px-2 py-1.5 text-sm outline-hidden"
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
      <p className="text-foreground/60 text-xs">{action}</p>
    </div>
  );
}
