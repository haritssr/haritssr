"use client";
import { NumberField } from "@base-ui/react/number-field";
import {
  ArrowPathIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import type { CSSProperties } from "react";
import { useId, useRef } from "react";

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
  onReset?: () => void;
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
  onReset,
  invalid = false,
  variant = "inline",
  step = "any",
  format = DEFAULT_FORMAT,
  ...props
}: NumberInputProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const inputStyle: CSSProperties & { "--number-input-width": string } = {
    "--number-input-width": `calc(${Math.max(3, String(value ?? "").length)}ch + 1.5rem)`,
  };
  return (
    <NumberField.Root
      {...props}
      className={
        variant === "field"
          ? "flex w-full min-w-0 flex-col gap-1"
          : "inline-flex max-w-full"
      }
      id={id}
      value={value}
      onValueChange={onValueChange}
      step={step}
      format={format}
    >
      <div
        className={
          variant === "field" ? "flex min-h-6 items-center gap-1" : "sr-only"
        }
      >
        <label
          className={
            variant === "field" ? "text-muted text-sm capitalize" : undefined
          }
          htmlFor={id}
        >
          {label}
        </label>
        {variant === "field" && onReset && value !== null && value !== 0 ? (
          <button
            aria-label={`Reset ${label} to zero`}
            className="text-muted hover:text-foreground focus-visible:outline-action flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={props.disabled}
            onClick={() => {
              inputRef.current?.focus();
              onReset();
            }}
            title={`Reset ${label} to zero`}
            type="button"
          >
            <ArrowPathIcon aria-hidden="true" className="size-4" />
          </button>
        ) : null}
      </div>
      <NumberField.Group className="corner-squircle border-border focus-within:border-action flex min-w-0 items-center rounded-md border supports-[corner-shape:squircle]:rounded-xl">
        <NumberField.Decrement
          aria-label={`Decrease ${label}`}
          className="group corner-squircle border-border text-foreground hover:bg-interface-hover focus-visible:outline-action flex h-8 w-9 shrink-0 cursor-pointer items-center justify-center rounded-l-md border-r focus-visible:outline-2 data-disabled:cursor-not-allowed data-disabled:hover:bg-transparent supports-[corner-shape:squircle]:rounded-l-xl"
        >
          <MinusIcon
            aria-hidden="true"
            className="size-4 group-data-disabled:opacity-50"
          />
        </NumberField.Decrement>
        <NumberField.Input
          aria-invalid={invalid}
          className={`form-control h-8 min-w-0 bg-transparent text-center text-sm tabular-nums outline-none ${variant === "field" ? "w-full flex-1 px-1" : "w-(--number-input-width) px-3"}`}
          style={inputStyle}
          ref={inputRef}
        />
        <NumberField.Increment
          aria-label={`Increase ${label}`}
          className="group corner-squircle border-border text-foreground hover:bg-interface-hover focus-visible:outline-action flex h-8 w-9 shrink-0 cursor-pointer items-center justify-center rounded-r-md border-l focus-visible:outline-2 data-disabled:cursor-not-allowed data-disabled:hover:bg-transparent supports-[corner-shape:squircle]:rounded-r-xl"
        >
          <PlusIcon
            aria-hidden="true"
            className="size-4 group-data-disabled:opacity-50"
          />
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  );
}
