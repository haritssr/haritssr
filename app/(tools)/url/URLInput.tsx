"use client";

import { Switch } from "@base-ui/react/switch";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

import Button from "@/components/Button";

import CompactCopyButton from "./CompactCopyButton";
import { normalizePastedURL } from "./urlParts";

export const URL_FIELD_CLASS_NAME =
  "form-control text-foreground/90 placeholder:text-muted block w-full min-w-0 appearance-none rounded-lg border bg-white px-3 py-2 text-sm outline-hidden focus:ring-2 border-border focus:border-action focus:ring-action/20 resize-none overflow-hidden leading-5 wrap-anywhere";

function resizeURLField(field: HTMLTextAreaElement) {
  field.style.height = "auto";
  const borderHeight = field.offsetHeight - field.clientHeight;
  field.style.height = `${field.scrollHeight + borderHeight}px`;
}

export default function URLInput({
  value,
  invalid,
  automatic,
  onAutomaticChange,
  onChange,
}: {
  value: string;
  invalid: boolean;
  automatic: boolean;
  onAutomaticChange: (checked: boolean) => void;
  onChange: (value: string) => void;
}) {
  const fieldRef = useRef<HTMLTextAreaElement | null>(null);
  const [pasteError, setPasteError] = useState("");
  const sourceRef = useCallback((field: HTMLTextAreaElement) => {
    fieldRef.current = field;
    let width = field.clientWidth;
    resizeURLField(field);
    field.focus({ preventScroll: true });
    const observer = new ResizeObserver(() => {
      if (field.clientWidth !== width) {
        width = field.clientWidth;
        resizeURLField(field);
      }
    });
    observer.observe(field);
    return () => {
      observer.disconnect();
      fieldRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    if (fieldRef.current?.value === value) {
      resizeURLField(fieldRef.current);
    }
  }, [value]);

  function clear() {
    setPasteError("");
    onChange("");
    const field = fieldRef.current;
    if (field) {
      field.value = "";
      resizeURLField(field);
      field.focus();
    }
  }

  async function paste() {
    try {
      const text = await navigator.clipboard.readText();
      const field = fieldRef.current;
      if (!field || field.value !== "") {
        return;
      }
      const normalized = normalizePastedURL(text);
      field.value = normalized;
      resizeURLField(field);
      onChange(normalized);
      setPasteError("");
      field.focus();
    } catch {
      setPasteError(
        "Couldn’t read the clipboard. Paste into the field instead."
      );
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <div className="relative">
          <textarea
            id="source-url"
            ref={sourceRef}
            className={`${URL_FIELD_CLASS_NAME} ${value ? "" : "pr-20"}`}
            rows={1}
            spellCheck={false}
            autoCapitalize="none"
            placeholder="Paste a URL to inspect and clean"
            value={value}
            aria-label="Original URL"
            aria-describedby={invalid ? "url-example url-help" : "url-example"}
            aria-invalid={invalid}
            onChange={(event) => {
              setPasteError("");
              resizeURLField(event.currentTarget);
              onChange(event.currentTarget.value);
            }}
            onPaste={(event) => {
              const pasted = event.clipboardData.getData("text/plain");
              const normalized = normalizePastedURL(pasted);
              if (normalized === pasted) {
                return;
              }
              event.preventDefault();
              const field = event.currentTarget;
              field.setRangeText(
                normalized,
                field.selectionStart,
                field.selectionEnd,
                "end"
              );
              resizeURLField(field);
              onChange(field.value);
            }}
          />
          {value ? null : (
            <Button
              className="absolute top-1/2 right-1.25 -translate-y-1/2"
              onClick={() => {
                void paste();
              }}
              size="input-action"
              variant="primary"
            >
              Paste
            </Button>
          )}
        </div>
        {pasteError ? (
          <output className="text-danger mt-2 block text-sm">
            {pasteError}
          </output>
        ) : null}
        <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <p
            id="url-example"
            className="text-muted/80 min-w-0 text-sm break-all"
          >
            <span className="select-none">Example: </span>
            https://docs.example.com:8443/guides/setup?lang=en&amp;view=compact#install
          </p>
          <div className="flex w-full flex-wrap items-center justify-between gap-3 sm:w-auto">
            <label
              htmlFor="automatic-parse"
              className="flex shrink-0 cursor-pointer items-center gap-2 text-sm"
            >
              Automatic
              <Switch.Root
                id="automatic-parse"
                checked={automatic}
                onCheckedChange={onAutomaticChange}
                className="focus-visible:outline-action data-checked:bg-action bg-border block w-11 cursor-pointer rounded-full p-1 outline-hidden focus-visible:outline-2"
              >
                <Switch.Thumb className="bg-surface block h-4 w-4 rounded-full transition-transform duration-100 data-checked:translate-x-5" />
              </Switch.Root>
            </label>
            {value ? (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Clear URL"
                  className="text-foreground bg-foreground/5 hover:bg-foreground/10 focus-visible:outline-action cursor-pointer rounded-md px-1.5 py-0.5 text-sm focus-visible:outline-2"
                  onClick={clear}
                >
                  Clear
                </button>
                <CompactCopyButton
                  key={value}
                  value={value}
                  label="Original URL"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {invalid ? (
        <p id="url-help" className="text-danger text-sm">
          Enter a complete URL, including its scheme (for example, https://).
        </p>
      ) : null}
    </div>
  );
}
