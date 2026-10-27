"use client";

import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function Checkbox() {
  return (
    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
      <BaseCheckbox.Root
        className="interactive-elevation focus-visible:outline-action data-checked:border-action data-checked:bg-action border-border hover:border-action-hover hover:bg-border flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border bg-white outline-hidden focus-visible:outline-2"
        defaultChecked
        id="c1"
      >
        <BaseCheckbox.Indicator className="text-white">
          <CheckIcon className="h-5 w-5" />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      <label
        className="text-foreground cursor-pointer select-none"
        htmlFor="c1"
      >
        Accept terms and conditions.
      </label>
    </div>
  );
}
