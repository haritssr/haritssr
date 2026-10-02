"use client";

import { Checkbox } from "@base-ui/react/checkbox";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function CheckboxDemo() {
  return (
    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
      <Checkbox.Root
        className="focus-visible:outline-action data-checked:border-action data-checked:bg-action border-border hover:border-action-hover hover:bg-border data-checked:shadow-action flex h-6 w-6 items-center justify-center rounded-md border bg-white shadow-sm outline-hidden focus-visible:outline-2"
        defaultChecked
        id="c1"
      >
        <Checkbox.Indicator className="text-white">
          <CheckIcon className="h-5 w-5" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label className="text-foreground select-none" htmlFor="c1">
        Accept terms and conditions.
      </label>
    </div>
  );
}
