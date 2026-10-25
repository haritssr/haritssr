"use client";

import { Checkbox } from "@base-ui/react/checkbox";
import { Toast } from "@base-ui/react/toast";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useId, useState } from "react";
import type { ReactNode } from "react";

import Button from "@/components/Button";
import Section from "@/components/Section";
import Table from "@/components/Table";

import { cleanURL, parameterLabel, parseURL } from "./urlParts";

function resizeURLField(field: HTMLTextAreaElement) {
  field.style.height = "auto";
  const borderHeight = field.offsetHeight - field.clientHeight;
  field.style.height = `${field.scrollHeight + borderHeight}px`;
}

function CompactCopyButton({
  value,
  label,
  className = "",
}: {
  value: string;
  label: string;
  className?: string;
}) {
  const { add } = Toast.useToastManager();
  const [copied, setCopied] = useState(0);
  useEffect(() => {
    const timer = copied
      ? setTimeout(() => {
          setCopied(0);
        }, 2000)
      : undefined;
    return () => {
      clearTimeout(timer);
    };
  }, [copied]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied((previous) => previous + 1);
    } catch {
      add({
        id: "url-copy-error",
        title: "Could not copy",
        description: "Select the text and copy it manually.",
        timeout: 5000,
      });
    }
  }
  return (
    <button
      type="button"
      aria-label={copied ? `${label} copied` : `Copy ${label.toLowerCase()}`}
      className={`text-foreground bg-foreground/5 hover:bg-foreground/10 focus-visible:outline-action inline-flex cursor-pointer items-center justify-center gap-1 rounded-md px-1.5 py-0.5 text-sm focus-visible:outline-2 ${className}`}
      onClick={() => {
        void copy();
      }}
    >
      <span className="grid place-items-center">
        <span
          aria-hidden="true"
          className={`col-start-1 row-start-1 ${copied ? "invisible" : ""}`}
        >
          Copy
        </span>
        {copied ? (
          <CheckIcon
            aria-hidden="true"
            className="text-success-hover col-start-1 row-start-1 size-4 brightness-75"
            strokeWidth={3}
          />
        ) : null}
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}

function CopyCell({ value, label }: { value: string; label: string }) {
  return (
    <td className="group/cell text-muted relative py-2 pr-2 pl-3 align-middle font-normal">
      <div className="flex min-h-6 items-center pr-22">
        <span className="min-w-0 flex-1 wrap-anywhere">
          {value || "(empty value)"}
        </span>
        <CompactCopyButton
          key={value}
          value={value}
          label={label}
          className="pointer-events-none absolute top-2 right-2 opacity-0 group-focus-within/cell:pointer-events-auto group-focus-within/cell:opacity-100 group-hover/cell:pointer-events-auto group-hover/cell:opacity-100 [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:opacity-100"
        />
      </div>
    </td>
  );
}

function Option({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Checkbox.Root
        aria-labelledby={id}
        checked={checked}
        onCheckedChange={onChange}
        className="border-border hover:border-action-hover hover:bg-action/10 data-checked:border-action data-checked:bg-action data-checked:hover:border-action-hover data-checked:hover:bg-action-hover focus-visible:outline-action flex size-5 shrink-0 cursor-pointer items-center justify-center rounded border focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <Checkbox.Indicator>
          <CheckIcon className="size-4 text-white" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <div id={id} className="min-w-0 wrap-anywhere">
        {children}
      </div>
    </div>
  );
}

export default function URLCleaner() {
  const { add } = Toast.useToastManager();
  const [input, setInput] = useState("");
  const sourceRef = useCallback((field: HTMLTextAreaElement) => {
    let width = field.clientWidth;
    resizeURLField(field);
    const observer = new ResizeObserver(() => {
      if (field.clientWidth !== width) {
        width = field.clientWidth;
        resizeURLField(field);
      }
    });
    observer.observe(field);
    return () => {
      observer.disconnect();
    };
  }, []);
  const [removed, setRemoved] = useState<Set<number>>(new Set());
  const [removeFragment, setRemoveFragment] = useState(false);
  const [feedback, setFeedback] = useState("");
  const parsed = parseURL(input);
  const result = cleanURL(input, removed, removeFragment);
  const pathname = parsed ? new URL(input.trim()).pathname : "";
  const hierarchy = pathname.startsWith("/")
    ? [
        "/",
        ...pathname
          .split("/")
          .flatMap((segment) => (segment ? [`/${segment}`] : [])),
      ]
    : [];
  const fieldClass =
    "form-control text-foreground/90 placeholder:text-muted block w-full min-w-0 appearance-none rounded-lg border bg-white px-3 py-2 text-sm outline-hidden focus:ring-2";
  return (
    <div className="space-y-12">
      <div className="space-y-5">
        <div className="relative">
          <textarea
            id="source-url"
            ref={sourceRef}
            className={`${fieldClass} border-border focus:border-action focus:ring-action/20 resize-none overflow-hidden pr-40 leading-5 wrap-anywhere`}
            rows={1}
            spellCheck={false}
            autoCapitalize="none"
            placeholder="https://example.com/page?utm_source=newsletter&category=books#reviews"
            value={input}
            aria-label="Original URL"
            aria-describedby={input.trim() && !parsed ? "url-help" : undefined}
            aria-invalid={input.trim() !== "" && !parsed}
            onChange={(event) => {
              resizeURLField(event.currentTarget);
              setInput(event.currentTarget.value);
              setRemoved(new Set());
              setRemoveFragment(false);
              setFeedback("");
            }}
          />
          {input ? (
            <div className="absolute top-[7px] right-[7px] flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Clear URL"
                className="text-foreground bg-foreground/5 hover:bg-foreground/10 focus-visible:outline-action cursor-pointer rounded-md px-1.5 py-0.5 text-sm focus-visible:outline-2"
                onClick={(event) => {
                  setInput("");
                  setRemoved(new Set());
                  setRemoveFragment(false);
                  setFeedback("");
                  const field =
                    event.currentTarget.parentElement?.parentElement?.querySelector(
                      "textarea"
                    );
                  if (field) {
                    field.value = "";
                    resizeURLField(field);
                    field.focus();
                  }
                }}
              >
                Clear
              </button>
              <CompactCopyButton
                key={input}
                value={input}
                label="Original URL"
              />
            </div>
          ) : null}
        </div>
        {input.trim() && !parsed ? (
          <p id="url-help" className="text-danger text-sm">
            Enter a complete URL, including its scheme (for example, https://).
          </p>
        ) : null}
      </div>
      {parsed ? (
        <>
          <div className="space-y-12">
            {hierarchy.length ? (
              <Section title="Hierarchy" className="min-w-0">
                <Table aria-label="URL path hierarchy">
                  <thead>
                    <tr className="divide-border bg-foreground/5 divide-x">
                      <th
                        scope="col"
                        className="w-px px-3 text-left font-medium whitespace-nowrap"
                      >
                        Level
                      </th>
                      <th scope="col" className="px-3 text-left font-medium">
                        Path
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-border divide-y">
                    {hierarchy.map((path, index) => (
                      <tr
                        key={`${index}:${path}`}
                        className="divide-border divide-x"
                      >
                        <td className="text-muted px-3 py-2 align-middle">
                          {index + 1}
                        </td>
                        <CopyCell
                          value={path}
                          label={`Hierarchy ${index + 1} path`}
                        />
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Section>
            ) : null}
            <Section title="Parameters" className="min-w-0">
              {parsed.parameters.length ? (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setRemoved(
                          new Set(parsed.parameters.map((_, index) => index))
                        );
                        setFeedback("");
                      }}
                    >
                      Remove all
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setRemoved(new Set());
                        setFeedback("");
                      }}
                    >
                      Keep all
                    </Button>
                  </div>
                  <Table aria-label="URL parameters">
                    <thead>
                      <tr className="divide-border bg-foreground/5 divide-x">
                        <th
                          scope="col"
                          className="w-px px-3 text-left font-medium whitespace-nowrap"
                        >
                          Remove
                        </th>
                        <th scope="col" className="px-3 text-left font-medium">
                          Name
                        </th>
                        <th scope="col" className="px-3 text-left font-medium">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-border divide-y">
                      {parsed.parameters.map((raw, index) => {
                        const parameter = parameterLabel(raw);
                        return (
                          <tr
                            key={`${index}:${raw}`}
                            className="divide-border divide-x"
                          >
                            <td className="px-3 py-2 align-middle">
                              <Checkbox.Root
                                aria-label={`Remove parameter ${parameter.name}, row ${index + 1}`}
                                checked={removed.has(index)}
                                onCheckedChange={(checked) => {
                                  setRemoved((previous) => {
                                    const next = new Set(previous);
                                    if (checked) {
                                      next.add(index);
                                    } else {
                                      next.delete(index);
                                    }
                                    return next;
                                  });
                                  setFeedback("");
                                }}
                                className="border-border hover:border-action-hover hover:bg-action/10 data-checked:border-action data-checked:bg-action data-checked:hover:border-action-hover data-checked:hover:bg-action-hover focus-visible:outline-action flex size-5 cursor-pointer items-center justify-center rounded border focus-visible:outline-2 focus-visible:outline-offset-2"
                              >
                                <Checkbox.Indicator>
                                  <CheckIcon className="size-4 text-white" />
                                </Checkbox.Indicator>
                              </Checkbox.Root>
                            </td>
                            <CopyCell
                              value={parameter.name}
                              label="Parameter name"
                            />
                            <CopyCell
                              value={parameter.value}
                              label="Parameter value"
                            />
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <p className="text-muted">This URL has no query parameters.</p>
              )}
            </Section>
            <Section title="Fragment">
              {parsed.fragment ? (
                <Option
                  checked={removeFragment}
                  onChange={(checked) => {
                    setRemoveFragment(checked);
                    setFeedback("");
                  }}
                >
                  <span className="text-muted block text-sm">
                    {parsed.fragment.slice(1)}
                  </span>
                </Option>
              ) : (
                <p className="text-muted">This URL has no fragment.</p>
              )}
            </Section>
          </div>
          <Section title="Cleaned URL">
            <div className="flex flex-col gap-3">
              <textarea
                aria-label="Cleaned URL"
                className={`${fieldClass} border-border focus:border-action focus:ring-action/20 field-sizing-content resize-none overflow-hidden leading-5 wrap-anywhere`}
                readOnly
                rows={1}
                value={result}
                spellCheck={false}
              />
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => {
                    void Promise.resolve()
                      .then(async () => {
                        await navigator.clipboard.writeText(result);
                      })
                      .then(() => {
                        setFeedback("");
                        add({
                          id: "url-copied",
                          title: "Copied",
                          description: "Cleaned URL copied to clipboard.",
                          timeout: 5000,
                        });
                      })
                      .catch(() => {
                        setFeedback(
                          "Couldn’t copy. Select the cleaned URL and copy it manually."
                        );
                      });
                  }}
                >
                  Copy
                </Button>
                <output className="text-muted text-sm">{feedback}</output>
              </div>
            </div>
          </Section>
        </>
      ) : null}
    </div>
  );
}
