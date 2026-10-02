"use client";

import { Switch } from "@base-ui/react/switch";

export default function SwitchDemo() {
  return (
    <Switch.Root
      aria-label="Enable notifications"
      className="focus-visible:outline-action data-checked:bg-action bg-border block w-11 rounded-full p-1 outline-hidden transition-colors focus-visible:outline-2"
      defaultChecked
      id="s1"
    >
      <Switch.Thumb className="block h-4 w-4 rounded-full bg-white shadow transition-transform duration-100 will-change-transform data-checked:translate-x-5" />
    </Switch.Root>
  );
}
