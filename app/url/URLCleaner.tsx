"use client";

import { Checkbox } from "@base-ui/react/checkbox";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useId, useState } from "react";
import type { ReactNode } from "react";

import Button from "@/components/Button";
import Section from "@/components/Section";

import { cleanURL, parameterLabel, parseURL } from "./urlParts";

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
    <div className="flex min-w-0 items-start gap-3">
      <Checkbox.Root
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        className="border-border data-checked:border-action data-checked:bg-action focus-visible:outline-action mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <Checkbox.Indicator>
          <CheckIcon className="size-4 text-white" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label htmlFor={id} className="min-w-0 cursor-pointer wrap-anywhere">
        {children}
      </label>
    </div>
  );
}

export default function URLCleaner() {
  const [input, setInput] = useState("");
  const [removed, setRemoved] = useState<Set<number>>(new Set());
  const [removeFragment, setRemoveFragment] = useState(false);
  const [feedback, setFeedback] = useState("");
  const parsed = parseURL(input);
  const result = cleanURL(input, removed, removeFragment);
  const fieldClass =
    "border-border bg-background focus-visible:outline-action block w-full min-w-0 rounded-xl border p-3 text-sm wrap-anywhere focus-visible:outline-2";
  return (
    <div className="space-y-12">
      <div className="space-y-3">
        <label htmlFor="source-url" className="block font-medium">
          Original URL
        </label>
        <textarea
          id="source-url"
          className={fieldClass}
          rows={3}
          spellCheck={false}
          autoCapitalize="none"
          placeholder="https://example.com/page?utm_source=newsletter&category=books#reviews"
          value={input}
          aria-describedby="url-help"
          aria-invalid={input.trim() !== "" && !parsed}
          onChange={(event) => {
            setInput(event.currentTarget.value);
            setRemoved(new Set());
            setRemoveFragment(false);
            setFeedback("");
          }}
        />
        <p
          id="url-help"
          className={
            input.trim() && !parsed
              ? "text-danger text-sm"
              : "text-muted text-sm"
          }
        >
          {input.trim() && !parsed
            ? "Enter a complete URL, including its scheme (for example, https://)."
            : "Paste a URL to begin. Everything is processed in your browser."}
        </p>
      </div>
      {parsed ? (
        <>
          <Section
            title="Query parameters"
            description="Select the parameters you want to remove. Repeated parameters can be selected individually."
          >
            {parsed.parameters.length ? (
              <>
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
                    Remove all parameters
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setRemoved(new Set());
                      setFeedback("");
                    }}
                  >
                    Keep all parameters
                  </Button>
                </div>
                <ul className="border-border divide-border divide-y rounded-xl border">
                  {parsed.parameters.map((raw, index) => {
                    const parameter = parameterLabel(raw);
                    return (
                      <li key={`${index}:${raw}`} className="p-4">
                        <Option
                          checked={removed.has(index)}
                          onChange={(checked) => {
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
                        >
                          <span className="font-medium">{parameter.name}</span>
                          <span className="text-muted block text-sm">
                            {parameter.value || "(empty value)"}
                          </span>
                        </Option>
                      </li>
                    );
                  })}
                </ul>
              </>
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
                Remove fragment{" "}
                <span className="text-muted block text-sm">
                  {parsed.fragment}
                </span>
              </Option>
            ) : (
              <p className="text-muted">This URL has no fragment.</p>
            )}
          </Section>
          <Section title="Cleaned URL">
            <textarea
              aria-label="Cleaned URL"
              className={fieldClass}
              readOnly
              rows={3}
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
                      setFeedback("Copied.");
                    })
                    .catch(() => {
                      setFeedback(
                        "Couldn’t copy. Select the cleaned URL and copy it manually."
                      );
                    });
                }}
              >
                Copy URL
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setRemoved(new Set());
                  setRemoveFragment(false);
                  setFeedback("");
                }}
              >
                Reset changes
              </Button>
              <output className="text-muted text-sm">{feedback}</output>
            </div>
          </Section>
        </>
      ) : null}
    </div>
  );
}
