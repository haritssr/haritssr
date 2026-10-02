"use client";
import { Select } from "@base-ui/react/select";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useId } from "react";

export function SelectField({
  label,
  labelPlacement = "above",
  onValueChange,
  options,
  placeholder,
  value,
}: {
  label: string;
  labelPlacement?: "above" | "inside";
  onValueChange: (value: string) => void;
  options: readonly { label: string; value: string }[];
  placeholder?: string;
  value: string | null;
}) {
  const id = useId();

  return (
    <div className="min-w-0 space-y-2">
      <label
        className={
          labelPlacement === "inside"
            ? "sr-only"
            : "text-foreground/80 block text-sm font-medium"
        }
        htmlFor={id}
      >
        {label}
      </label>
      <Select.Root
        items={options}
        modal={false}
        onValueChange={(next) => {
          if (next !== null) {
            onValueChange(next);
          }
        }}
        value={value}
      >
        <Select.Trigger
          className="form-control border-border text-foreground/80 focus-visible:border-action hover:bg-foreground/5 flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border bg-white px-3 py-2 text-sm outline-none"
          id={id}
        >
          <span className="inline-flex min-w-0 items-center gap-2">
            {labelPlacement === "inside" ? (
              <span className="text-muted">{label}:</span>
            ) : null}
            <Select.Value placeholder={placeholder} />
          </span>
          <Select.Icon>
            <ChevronDownIcon aria-hidden="true" className="size-4 shrink-0" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner alignItemWithTrigger={false} sideOffset={4}>
            <Select.Popup className="border-border z-50 max-w-[calc(100vw-2rem)] min-w-(--anchor-width) overflow-hidden rounded-lg border bg-white shadow-lg">
              <Select.List className="scrollbar-subtle max-h-72 overflow-y-auto p-1">
                {options.map((option) => (
                  <Select.Item
                    className="text-foreground/80 data-highlighted:bg-foreground/5 relative cursor-pointer rounded-md py-2 pr-9 pl-3 text-sm outline-hidden"
                    key={option.value}
                    value={option.value}
                  >
                    <Select.ItemText>{option.label}</Select.ItemText>
                    <Select.ItemIndicator className="absolute top-2.5 right-3">
                      <CheckIcon aria-hidden="true" className="size-4" />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
