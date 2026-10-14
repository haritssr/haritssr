"use client";

import { Switch } from "@base-ui/react/switch";

export default function SwitchDemo() {
  return (
    <Switch.Root
      aria-label="Enable notifications"
      className="interactive-elevation focus-visible:outline-action data-checked:bg-action bg-border block w-11 rounded-full p-1 outline-hidden focus-visible:outline-2"
      defaultChecked
      id="s1"
    >
      <Switch.Thumb className="bg-switch-thumb shadow-control block h-4 w-4 rounded-full transition-transform duration-100 will-change-transform data-checked:translate-x-5" />
    </Switch.Root>
  );
}
