"use client";

import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { useState } from "react";

export default function Toggle() {
  const [pressed, setPressed] = useState(false);

  return (
    <BaseToggle
      aria-label="Toggle example"
      className="focus-visible:outline-action data-pressed:text-action border-border text-foreground hover:bg-foreground/5 data-pressed:border-action rounded-lg border bg-white px-3 py-1.5 text-sm font-medium outline-hidden transition-colors duration-150 select-none focus-visible:outline-2"
      onPressedChange={setPressed}
      pressed={pressed}
    >
      {pressed ? "State: on" : "State: off"}
    </BaseToggle>
  );
}
