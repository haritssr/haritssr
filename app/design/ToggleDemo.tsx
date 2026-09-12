"use client";

import { Toggle } from "@base-ui/react/toggle";
import { useState } from "react";

export default function ToggleDemo() {
  const [pressed, setPressed] = useState(false);

  return (
    <Toggle
      aria-label="Toggle example"
      className="focus-visible:outline-action data-pressed:text-action rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-800 shadow-sm outline-hidden select-none hover:bg-zinc-50 focus-visible:outline-2 data-pressed:border-blue-300 data-pressed:shadow-blue-100"
      onPressedChange={setPressed}
      pressed={pressed}
    >
      {pressed ? "State: on" : "State: off"}
    </Toggle>
  );
}
