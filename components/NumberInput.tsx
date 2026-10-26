"use client";
import { NumberField } from "@base-ui/react/number-field";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import type { CSSProperties } from "react";
import { useId } from "react";

type NumberInputProps = Pick<
  NumberField.Root.Props,
  | "disabled"
  | "format"
  | "max"
  | "min"
  | "name"
  | "required"
  | "smallStep"
  | "step"
> & {
  label: string;
  value: number | null;
  onValueChange: (value: number | null) => void;
  invalid?: boolean;
  variant?: "inline" | "field";
};

const DEFAULT_FORMAT: Intl.NumberFormatOptions = {
  maximumSignificantDigits: 21,
  useGrouping: false,
};

export default function NumberInput({
  label,
  value,
  onValueChange,
  invalid = false,
  variant = "inline",
  step = "any",
  format = DEFAULT_FORMAT,
  ...props
}: NumberInputProps) {
  const id = useId();
  const inputStyle: CSSProperties & { "--number-input-width": string } = {
    "--number-input-width": `calc(${Math.max(3, String(value ?? "").length)}ch + 1.5rem)`,
  };
  return (
    <NumberField.Root
      {...props}
      className={
        variant === "field"
          ? "flex w-full min-w-0 flex-col gap-2"
          : "inline-flex max-w-full"
      }
      id={id}
      value={value}
      onValueChange={onValueChange}
      step={step}
      format={format}
    >
      <label
        className={
          variant === "field" ? "text-muted text-sm capitalize" : "sr-only"
        }
        htmlFor={id}
      >
        {label}
      </label>
      <NumberField.Group className="border-border focus-within:border-action flex min-w-0 items-center rounded-lg border">
        <NumberField.Decrement
          aria-label={`Decrease ${label}`}
          className="border-border hover:bg-interface-hover focus-visible:outline-action flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-l-lg border-r focus-visible:outline-2 data-disabled:cursor-default data-disabled:opacity-40"
        >
          <MinusIcon aria-hidden="true" className="size-3" />
        </NumberField.Decrement>
        <NumberField.Input
          aria-invalid={invalid}
          className={`form-control h-9 min-w-0 bg-transparent text-center text-sm tabular-nums outline-none ${variant === "field" ? "w-full flex-1 px-1" : "w-(--number-input-width) px-3"}`}
          style={inputStyle}
        />
        <NumberField.Increment
          aria-label={`Increase ${label}`}
          className="border-border hover:bg-interface-hover focus-visible:outline-action flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-r-lg border-l focus-visible:outline-2 data-disabled:cursor-default data-disabled:opacity-40"
        >
          <PlusIcon aria-hidden="true" className="size-3" />
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  );
}
