"use client";

import { useCallback, useRef } from "react";

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
  onChange,
}: {
  value: string;
  invalid: boolean;
  onChange: (value: string) => void;
}) {
  const fieldRef = useRef<HTMLTextAreaElement | null>(null);
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

  function clear() {
    onChange("");
    const field = fieldRef.current;
    if (field) {
      field.value = "";
      resizeURLField(field);
      field.focus();
    }
  }

  return (
    <div className="space-y-5">
      <div className="relative">
        <textarea
          id="source-url"
          ref={sourceRef}
          className={`${URL_FIELD_CLASS_NAME} pr-40`}
          rows={1}
          spellCheck={false}
          autoCapitalize="none"
          placeholder="Paste a URL to inspect and clean"
          value={value}
          aria-label="Original URL"
          aria-describedby={invalid ? "url-example url-help" : "url-example"}
          aria-invalid={invalid}
          onChange={(event) => {
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
        <p
          id="url-example"
          className="text-muted/80 mt-2 text-sm wrap-anywhere"
        >
          Example:
          https://docs.example.com:8443/guides/setup?lang=en&amp;view=compact#install
        </p>
        {value ? (
          <div className="absolute top-[7px] right-[7px] flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Clear URL"
              className="text-foreground bg-foreground/5 hover:bg-foreground/10 focus-visible:outline-action cursor-pointer rounded-md px-1.5 py-0.5 text-sm focus-visible:outline-2"
              onClick={clear}
            >
              Clear
            </button>
            <CompactCopyButton key={value} value={value} label="Original URL" />
          </div>
        ) : null}
      </div>
      {invalid ? (
        <p id="url-help" className="text-danger text-sm">
          Enter a complete URL, including its scheme (for example, https://).
        </p>
      ) : null}
    </div>
  );
}
