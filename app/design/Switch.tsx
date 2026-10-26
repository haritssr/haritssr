"use client";

import { Switch as BaseSwitch } from "@base-ui/react/switch";

export default function Switch() {
  return (
    <BaseSwitch.Root
      aria-label="Enable notifications"
      className="focus-visible:outline-action data-checked:bg-action bg-border block w-11 rounded-full p-1 outline-hidden focus-visible:outline-2"
      defaultChecked
      id="s1"
    >
      <BaseSwitch.Thumb className="bg-surface block h-4 w-4 rounded-full transition-transform duration-100 will-change-transform data-checked:translate-x-5" />
    </BaseSwitch.Root>
  );
}
