"use client";

import { Toggle } from "@base-ui/react/toggle";
import { useState } from "react";

export default function ToggleDemo() {
  const [pressed, setPressed] = useState(false);

  return (
    <Toggle
      aria-label="Toggle example"
      className="focus-visible:outline-action data-[pressed]:text-action border-border text-foreground hover:bg-foreground/5 data-[pressed]:border-action data-[pressed]:shadow-action rounded-lg border bg-white px-3 py-1.5 text-sm font-medium shadow-sm outline-hidden select-none focus-visible:outline-2"
      onPressedChange={setPressed}
      pressed={pressed}
    >
      {pressed ? "State: on" : "State: off"}
    </Toggle>
  );
}
