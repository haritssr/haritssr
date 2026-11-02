"use client";

import { Checkbox } from "@base-ui/react/checkbox";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useId } from "react";

import Button from "@/components/Button";
import Section from "@/components/Section";
import Table from "@/components/Table";

import { parameterLabel } from "./urlParts";
import type { ParsedURL } from "./urlParts";

function ValueCell({ value }: { value: string }) {
  return (
    <td className="text-muted px-3 py-2 align-middle font-normal wrap-anywhere">
      {value || "(empty value)"}
    </td>
  );
}

function RemovalCheckbox({
  checked,
  onChange,
  ...props
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}) {
  return (
    <Checkbox.Root
      {...props}
      checked={checked}
      onCheckedChange={onChange}
      className="border-border hover:border-action-hover hover:bg-action/10 data-checked:border-action data-checked:bg-action data-checked:hover:border-action-hover data-checked:hover:bg-action-hover focus-visible:outline-action flex size-5 shrink-0 cursor-pointer items-center justify-center rounded border focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <Checkbox.Indicator>
        <CheckIcon className="size-4 text-white" />
      </Checkbox.Indicator>
    </Checkbox.Root>
  );
}

export default function URLInspection({
  parsed,
  removed,
  removeFragment,
  onRemovedChange,
  onParameterChange,
  onFragmentChange,
}: {
  parsed: ParsedURL;
  removed: ReadonlySet<number>;
  removeFragment: boolean;
  onRemovedChange: (removed: Set<number>) => void;
  onParameterChange: (index: number, checked: boolean) => void;
  onFragmentChange: (checked: boolean) => void;
}) {
  const fragmentId = useId();
  const hierarchy = parsed.pathname.startsWith("/")
    ? [
        "/",
        ...parsed.pathname
          .split("/")
          .flatMap((segment) => (segment ? [`/${segment}`] : [])),
      ]
    : [];

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <Section
        title="Parameters"
        className="min-w-0"
        action={
          parsed.parameters.length ? (
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  onRemovedChange(
                    new Set(parsed.parameters.map((_, index) => index))
                  );
                }}
              >
                Remove all
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  onRemovedChange(new Set());
                }}
              >
                Keep all
              </Button>
            </div>
          ) : null
        }
      >
        {parsed.parameters.length ? (
          <div className="flex flex-col gap-3">
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
                        <RemovalCheckbox
                          aria-label={`Remove parameter ${parameter.name}, row ${index + 1}`}
                          checked={removed.has(index)}
                          onChange={(checked) => {
                            onParameterChange(index, checked);
                          }}
                        />
                      </td>
                      <ValueCell value={parameter.name} />
                      <ValueCell value={parameter.value} />
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
      <Section title="Fragment" className="min-w-0">
        {parsed.fragment ? (
          <div className="flex min-w-0 items-center gap-3">
            <RemovalCheckbox
              aria-labelledby={fragmentId}
              checked={removeFragment}
              onChange={onFragmentChange}
            />
            <div id={fragmentId} className="min-w-0 wrap-anywhere">
              <span className="text-muted block text-sm">
                {parsed.fragment.slice(1)}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-muted">This URL has no fragment.</p>
        )}
      </Section>
      {hierarchy.length ? (
        <Section title="Hierarchy" className="w-fit max-w-full min-w-0">
          <Table aria-label="URL path hierarchy">
            <thead>
              <tr className="divide-border bg-foreground/5 divide-x">
                <th
                  scope="col"
                  className="w-px px-3 text-left font-medium whitespace-nowrap"
                >
                  No
                </th>
                <th scope="col" className="px-3 text-left font-medium">
                  Path
                </th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {hierarchy.map((path, index) => (
                <tr key={`${index}:${path}`} className="divide-border divide-x">
                  <td className="text-muted px-3 py-2 align-middle">
                    {index + 1}
                  </td>
                  <ValueCell value={path} />
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>
      ) : null}
    </div>
  );
}
