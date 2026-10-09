"use client";

import { Select } from "@base-ui/react/select";
import { useId } from "react";

import { Equation, Formula, MathText } from "./math-ui";
import type { Answers, FieldResult } from "./model";
import { ANSWER_LENGTH_LIMIT, previewTex } from "./model";
import type { AnswerField, MathOption, Question } from "./questions";

const resultLabels: Record<FieldResult, string> = {
  correct: "Benar",
  incorrect: "Perlu diperbaiki",
  empty: "Belum diisi",
  invalid: "Masukkan angka atau pecahan yang valid",
};

function OptionContent({ option }: { option: MathOption }) {
  return option.tex === undefined ? option.label : <Formula tex={option.tex} />;
}

function MathSelect({
  field,
  value,
  onChange,
  id,
  feedbackId,
  invalid,
}: {
  field: Extract<AnswerField, { kind: "choice" }>;
  value: string;
  onChange: (value: string) => void;
  id: string;
  feedbackId?: string;
  invalid: boolean;
}) {
  const selected = field.options.find((option) => option.id === value);
  return (
    <Select.Root
      value={value || null}
      onValueChange={(next) => {
        onChange(next ?? "");
      }}
    >
      <Select.Trigger
        aria-describedby={feedbackId}
        aria-invalid={invalid}
        className="form-control border-border bg-background focus-visible:outline-action flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left focus-visible:outline-2 focus-visible:outline-offset-2"
        id={id}
      >
        <Select.Value>
          {selected ? (
            <OptionContent option={selected} />
          ) : (
            <span className="text-muted">Pilih</span>
          )}
        </Select.Value>
        <Select.Icon aria-hidden="true" className="text-muted text-xs">
          ▼
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner alignItemWithTrigger={false} sideOffset={6}>
          <Select.Popup className="border-border bg-background z-90 max-w-[calc(100vw-2rem)] min-w-(--anchor-width) overflow-hidden rounded-xl border shadow-lg">
            <Select.List className="max-h-64 overflow-y-auto p-1">
              <Select.Item
                className="data-highlighted:bg-interface-hover min-h-11 cursor-pointer rounded-lg px-3 py-2 outline-none"
                value=""
              >
                <Select.ItemText>Belum dipilih</Select.ItemText>
              </Select.Item>
              {field.options.map((option) => (
                <Select.Item
                  className="data-highlighted:bg-interface-hover relative flex min-h-11 cursor-pointer items-center rounded-lg py-2 pr-8 pl-3 outline-none"
                  key={option.id}
                  value={option.id}
                >
                  <Select.ItemText>
                    <OptionContent option={option} />
                  </Select.ItemText>
                  <Select.ItemIndicator
                    aria-hidden="true"
                    className="text-action absolute right-3"
                  >
                    ✓
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}

function AnswerInput({
  field,
  value,
  result,
  onChange,
}: {
  field: AnswerField;
  value: string;
  result?: FieldResult;
  onChange: (value: string) => void;
}) {
  const id = useId();
  const feedbackId = `${id}-feedback`;
  const invalid = result !== undefined && result !== "correct";
  let appearance = "border-border";
  if (result === "correct") {
    appearance = "border-action bg-action/5";
  }
  if (invalid) {
    appearance = "border-danger/70";
  }
  return (
    <div className={`min-w-0 rounded-xl border p-3 ${appearance}`}>
      <label className="mb-3 block min-h-6 text-center text-sm" htmlFor={id}>
        <span className="sr-only">{field.accessibleLabel}</span>
        <span aria-hidden="true">
          <Formula tex={field.labelTex} />
        </span>
      </label>
      {field.kind === "number" ? (
        <input
          aria-describedby={result ? feedbackId : undefined}
          aria-invalid={invalid}
          autoComplete="off"
          className="form-control border-border bg-background focus-visible:outline-action min-h-12 w-full rounded-lg border px-2 py-2 text-center text-base focus-visible:outline-2 focus-visible:outline-offset-2"
          id={id}
          maxLength={ANSWER_LENGTH_LIMIT}
          onChange={(event) => {
            onChange(event.currentTarget.value);
          }}
          placeholder="…"
          spellCheck={false}
          type="text"
          value={value}
        />
      ) : (
        <MathSelect
          field={field}
          feedbackId={result ? feedbackId : undefined}
          id={id}
          invalid={invalid}
          onChange={onChange}
          value={value}
        />
      )}
      {result ? (
        <p
          className={`mt-2 text-xs leading-5 ${invalid ? "text-danger" : "text-action"}`}
          id={feedbackId}
        >
          {resultLabels[result]}
        </p>
      ) : null}
    </div>
  );
}

function Classification({
  question,
  answers,
  results,
  onChange,
}: {
  question: Question;
  answers: Answers;
  results?: Readonly<Record<string, FieldResult>>;
  onChange: (field: string, value: string) => void;
}) {
  const groupId = useId();
  const [field] = question.groups[0].fields;
  if (field.kind !== "choice") {
    return null;
  }
  const result = results?.[field.id];
  return (
    <fieldset aria-describedby={result ? `${groupId}-feedback` : undefined}>
      <legend className="mb-3 text-sm font-semibold">
        Menurutmu, persamaan ini termasuk…
      </legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {field.options.map((option) => {
          const selected = answers[field.id] === option.id;
          return (
            <label
              className={`focus-within:outline-action flex min-h-16 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 focus-within:outline-2 focus-within:outline-offset-2 ${selected ? "border-action bg-action/10 text-action" : "border-border hover:bg-interface-hover"}`}
              key={option.id}
            >
              <input
                checked={selected}
                className="accent-action size-4"
                name={groupId}
                onChange={() => {
                  onChange(field.id, option.id);
                }}
                type="radio"
                value={option.id}
              />
              <span className="font-medium">
                <OptionContent option={option} />
              </span>
            </label>
          );
        })}
      </div>
      {result ? (
        <p
          className={`mt-3 text-sm ${result === "correct" ? "text-action" : "text-danger"}`}
          id={`${groupId}-feedback`}
        >
          {result === "invalid"
            ? "Pilih salah satu jawaban."
            : resultLabels[result]}
        </p>
      ) : null}
    </fieldset>
  );
}

function GroupingPreview({
  question,
  groupId,
  answers,
}: {
  question: Question;
  groupId: string;
  answers: Answers;
}) {
  if (question.kind !== "grouping") {
    return null;
  }
  const group = question.groups.find((item) => item.id === groupId);
  return (
    <div className="mt-4 space-y-2">
      <p className="text-muted text-xs">Kelompok pilihanmu</p>
      <div className="grid gap-2 sm:grid-cols-5">
        {question.buckets.map((bucket) => {
          const terms =
            group?.fields.filter((field) => answers[field.id] === bucket.id) ??
            [];
          return (
            <div
              className="border-border min-w-0 rounded-lg border px-2 py-3 text-center"
              key={bucket.id}
            >
              <p className="text-action mb-2 text-xs">
                <Formula tex={bucket.tex ?? ""} />
              </p>
              <div className="space-y-2 overflow-x-auto text-sm">
                {terms.length === 0 ? (
                  <span className="text-muted text-xs">Kosong</span>
                ) : (
                  terms.map((field) => (
                    <p key={field.id}>
                      <Formula tex={field.labelTex} />
                    </p>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AnswerFields({
  question,
  answers,
  results,
  onChange,
}: {
  question: Question;
  answers: Answers;
  results?: Readonly<Record<string, FieldResult>>;
  onChange: (field: string, value: string) => void;
}) {
  if (question.kind === "classification") {
    return (
      <Classification
        answers={answers}
        onChange={onChange}
        question={question}
        results={results}
      />
    );
  }
  return (
    <div className="space-y-6">
      <p className="text-muted text-xs leading-5">
        {question.kind === "grouping"
          ? "Pilih kelompok pangkat untuk setiap suku. Suku tanpa variabel masuk ke kelompok konstanta."
          : "Isi semua kolom. Angka negatif dan desimal dengan titik atau koma diterima. Gunakan garis miring untuk pecahan. Isi nol untuk koefisien yang tidak muncul."}
      </p>
      {question.groups.map((group) => (
        <fieldset className="min-w-0" key={group.id}>
          <legend className="mb-3 text-sm font-semibold">
            <MathText text={group.title} />
          </legend>
          <div
            className={`grid grid-cols-2 gap-2 sm:grid-cols-3 ${group.fields.length === 5 ? "xl:grid-cols-5" : ""}`}
          >
            {group.fields.map((field) => (
              <AnswerInput
                field={field}
                key={`${question.id}-${field.id}`}
                onChange={(value) => {
                  onChange(field.id, value);
                }}
                result={results?.[field.id]}
                value={answers[field.id] ?? ""}
              />
            ))}
          </div>
          {group.monomials ? (
            <div className="border-border bg-interface-hover/50 mt-3 min-w-0 rounded-xl border px-4 py-2">
              <p className="text-muted text-xs">Bentuk jawabanmu</p>
              <Equation tex={previewTex(group, answers)} />
            </div>
          ) : null}
          <GroupingPreview
            answers={answers}
            groupId={group.id}
            question={question}
          />
        </fieldset>
      ))}
    </div>
  );
}
