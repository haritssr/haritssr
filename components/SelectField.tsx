"use client";
import { Select } from "@base-ui/react/select";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useId } from "react";
import type { ReactNode } from "react";

export function SelectField({
  label,
  labelPlacement = "above",
  onValueChange,
  options,
  placeholder,
  variant = "outlined",
  value,
  valueLang,
}: {
  label: ReactNode;
  labelPlacement?: "above" | "inside";
  onValueChange: (value: string) => void;
  options: readonly { label: string; value: string }[];
  placeholder?: string;
  variant?: "outlined" | "plain";
  value: string | null;
  valueLang?: string;
}) {
  const id = useId();

  return (
    <div className="min-w-0">
      <label
        className={
          labelPlacement === "inside"
            ? "sr-only"
            : "text-foreground/80 mb-1.5 block text-sm font-medium"
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
          className={`form-control flex w-full cursor-pointer items-center justify-between border text-left outline-hidden ${variant === "plain" ? "text-foreground/80 focus-visible:outline-action gap-0.5 rounded-lg border-transparent bg-transparent text-base shadow-none focus-visible:outline-2" : "corner-squircle focus-visible:outline-action border-border text-foreground gap-3 rounded-md px-3 py-2.5 text-sm focus-visible:outline-2 supports-[corner-shape:squircle]:rounded-xl"}`}
          id={id}
        >
          <span className="inline-flex min-w-0 items-center gap-2">
            {labelPlacement === "inside" ? (
              <span className="text-muted">{label}:</span>
            ) : null}
            <Select.Value lang={valueLang} placeholder={placeholder} />
          </span>
          <Select.Icon
            className={`inline-flex transition-transform data-popup-open:rotate-180 motion-reduce:transition-none ${variant === "plain" ? "duration-150" : "duration-200"}`}
          >
            <ChevronDownIcon
              aria-hidden="true"
              className={`shrink-0 ${variant === "plain" ? "size-4" : "text-foreground size-5"}`}
              strokeWidth={variant === "plain" ? 2.5 : 1.5}
            />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner alignItemWithTrigger={false} sideOffset={4}>
            <Select.Popup
              className={`border-border z-50 max-w-[calc(100vw-2rem)] min-w-(--anchor-width) overflow-hidden border bg-white ${variant === "plain" ? "rounded-lg" : "corner-squircle rounded-md supports-[corner-shape:squircle]:rounded-xl"}`}
            >
              <Select.List className="scrollbar-subtle max-h-72 overflow-y-auto p-1">
                {options.map((option) => (
                  <Select.Item
                    className="text-foreground/80 data-highlighted:bg-foreground/5 relative cursor-pointer rounded-md py-2 pr-9 pl-3 text-sm outline-hidden"
                    key={option.value}
                    value={option.value}
                  >
                    <Select.ItemText lang={valueLang}>
                      {option.label}
                    </Select.ItemText>
                    <Select.ItemIndicator className="absolute top-2.5 right-3">
                      <CheckIcon
                        aria-hidden="true"
                        className="size-4"
                        strokeWidth={variant === "plain" ? 2.5 : 1.5}
                      />
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
