"use client";

import { Toast } from "@base-ui/react/toast";
import { useState } from "react";

import Button from "@/components/Button";
import Section from "@/components/Section";

import URLInput, { URL_FIELD_CLASS_NAME } from "./URLInput";
import URLInspection from "./URLInspection";
import { cleanURL, parseURL } from "./urlParts";

export default function URLCleaner() {
  const { add } = Toast.useToastManager();
  const [input, setInput] = useState("");
  const [automatic, setAutomatic] = useState(false);
  const [removed, setRemoved] = useState(() => new Set<number>());
  const [removeFragment, setRemoveFragment] = useState(false);
  const [feedback, setFeedback] = useState("");
  const parsed = parseURL(input);
  const result = cleanURL(parsed, removed, removeFragment);

  function changeInput(value: string) {
    const next = parseURL(value);
    setInput(value);
    setRemoved(
      new Set(automatic && next ? next.parameters.map((_, index) => index) : [])
    );
    setRemoveFragment(automatic && next?.query !== null && !!next);
    setFeedback("");
  }

  function changeAutomatic(checked: boolean) {
    setAutomatic(checked);
    setRemoved(
      new Set(
        checked && parsed ? parsed.parameters.map((_, index) => index) : []
      )
    );
    setRemoveFragment(checked && !!parsed && parsed.query !== null);
    setFeedback("");
  }

  function changeRemoved(value: Set<number>) {
    setRemoved(value);
    setFeedback("");
  }

  function changeParameter(index: number, checked: boolean) {
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
  }

  function changeFragment(checked: boolean) {
    setRemoveFragment(checked);
    setFeedback("");
  }

  async function copyResult() {
    try {
      await navigator.clipboard.writeText(result);
      setFeedback("");
      add({
        id: "url-copied",
        title: "Copied",
        description: "Cleaned URL copied to clipboard.",
      });
    } catch {
      setFeedback(
        "Couldn’t copy. Select the cleaned URL and copy it manually."
      );
    }
  }

  return (
    <div className="space-y-12">
      <URLInput
        value={input}
        invalid={input.trim() !== "" && !parsed}
        automatic={automatic}
        onAutomaticChange={changeAutomatic}
        onChange={changeInput}
      />
      {parsed ? (
        <>
          <Section
            title="Result"
            action={
              <Button
                onClick={() => {
                  void copyResult();
                }}
              >
                Copy
              </Button>
            }
          >
            <div className="flex flex-col gap-3">
              <textarea
                aria-label="Cleaned URL"
                className={`${URL_FIELD_CLASS_NAME} field-sizing-content`}
                readOnly
                rows={1}
                value={result}
                spellCheck={false}
              />
              <output className="text-muted text-sm empty:hidden">
                {feedback}
              </output>
            </div>
          </Section>
          <URLInspection
            parsed={parsed}
            removed={removed}
            removeFragment={removeFragment}
            onRemovedChange={changeRemoved}
            onParameterChange={changeParameter}
            onFragmentChange={changeFragment}
          />
        </>
      ) : null}
    </div>
  );
}
