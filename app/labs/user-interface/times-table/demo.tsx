"use client";

import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useId, useState } from "react";

import Button from "@/components/Button";
import katexify from "@/utils/katexify";

import { answerStatus, FACTORS, shuffleFactors } from "./practice";
import type { AnswerStatus } from "./practice";

interface Answer {
  value: string;
  checked: boolean;
}

interface Cell {
  row: number;
  column: number;
}

const STATUS_CLASS: Record<AnswerStatus, string> = {
  empty: "border-border bg-background text-foreground",
  pending: "border-border bg-background text-foreground",
  correct: "border-success/60 bg-success/10 text-success",
  incorrect: "border-danger/60 bg-danger/10 text-danger",
};

const FEEDBACK_CLASS: Record<AnswerStatus, string> = {
  empty: "text-muted",
  pending: "text-muted",
  correct: "text-success",
  incorrect: "text-danger",
};

const STATUS_LABEL = {
  empty: "",
  pending: "",
  correct: ", correct",
  incorrect: ", incorrect",
};

const STATUS_ICON = {
  empty: null,
  pending: null,
  correct: CheckIcon,
  incorrect: XMarkIcon,
};

function cellKey(row: number, column: number) {
  return `${row}:${column}`;
}

export default function TimesTableDemo() {
  const [rows, setRows] = useState(FACTORS);
  const [columns, setColumns] = useState(FACTORS);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [selected, setSelected] = useState<Cell | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const helpId = useId();
  const statusId = useId();
  let correct = 0;
  let incorrect = 0;
  for (const row of rows) {
    for (const column of columns) {
      const answer = answers[cellKey(row, column)];
      const status = answerStatus(
        answer?.value ?? "",
        row * column,
        answer?.checked ?? false
      );
      correct += Number(status === "correct");
      incorrect += Number(status === "incorrect");
    }
  }
  const current = selected
    ? answers[cellKey(selected.row, selected.column)]
    : undefined;
  const currentStatus = selected
    ? answerStatus(
        current?.value ?? "",
        selected.row * selected.column,
        current?.checked ?? false
      )
    : "empty";
  const feedback = {
    empty: "Enter the product in the selected cell.",
    pending: "Press Enter or leave the cell to check your answer.",
    correct: "Correct!",
    incorrect: "Not quite. Try again.",
  }[currentStatus];

  function clearAnswers(message: string) {
    setAnswers({});
    setSelected(null);
    setAnnouncement(message);
  }

  function shuffle(axis: "rows" | "columns" | "both") {
    if (axis !== "columns") {
      setRows((currentRows) => shuffleFactors(currentRows));
    }
    if (axis !== "rows") {
      setColumns((currentColumns) => shuffleFactors(currentColumns));
    }
    clearAnswers("Numbers shuffled. Start a fresh grid.");
  }

  function checkCell(key: string) {
    setAnswers((previous) => {
      const answer = previous[key];
      return answer && !answer.checked
        ? { ...previous, [key]: { ...answer, checked: true } }
        : previous;
    });
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => shuffle("both")}>Shuffle both</Button>
        <Button onClick={() => shuffle("rows")} variant="outline">
          Shuffle rows
        </Button>
        <Button onClick={() => shuffle("columns")} variant="outline">
          Shuffle columns
        </Button>
        <Button
          onClick={() => {
            setRows(FACTORS);
            setColumns(FACTORS);
            clearAnswers(
              "Numbers restored to their original order. Answers cleared."
            );
          }}
          variant="outline"
        >
          Ordered grid
        </Button>
      </div>
      <div className="border-border bg-interface-hover flex flex-wrap items-center justify-between gap-5 rounded-xl border p-4">
        <div className="min-w-0 space-y-1">
          <p className="text-muted text-sm">Selected cell</p>
          <div className="text-foreground text-xl font-medium">
            {selected
              ? katexify(
                  `${selected.row} \\times ${selected.column} = \\mathord{?}`,
                  false
                )
              : "Choose a cell"}
          </div>
          <output
            className={`block text-sm ${FEEDBACK_CLASS[currentStatus]}`}
            id={statusId}
          >
            {selected ? feedback : "Select any empty cell to begin."}
          </output>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm tabular-nums">
          <span className="text-success">{correct} correct</span>
          <span className="text-danger">{incorrect} incorrect</span>
          <span className="text-muted">
            {100 - correct - incorrect} remaining
          </span>
        </div>
      </div>
      <p className="text-muted text-sm" id={helpId}>
        Multiply the row number by the column number. Press Enter or move to
        another cell to check. Use Tab to move through the grid. Shuffling
        starts a fresh round. On small screens, scroll the grid sideways.
      </p>
      <section
        aria-label="Multiplication practice grid, scroll horizontally on small screens"
        className="border-border focus-visible:outline-action relative max-w-full overflow-x-auto overscroll-x-contain rounded-xl border focus-visible:outline-2 focus-visible:outline-offset-2"
        // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- The horizontally scrollable grid needs native keyboard access.
        tabIndex={0}
      >
        <table className="w-full min-w-[42rem] table-fixed border-separate border-spacing-0 text-center">
          <caption className="sr-only">
            Ten by ten multiplication practice. Row and column headings give the
            factors for each answer.
          </caption>
          <thead>
            <tr>
              <th
                className="border-border bg-interface-hover sticky left-0 z-20 border-r border-b p-2"
                scope="col"
              >
                {katexify("\\times", false)}
              </th>
              {columns.map((column) => (
                <th
                  className={`border-border border-b p-2 font-medium ${selected?.column === column ? "bg-action/10 text-action" : "bg-interface-hover text-foreground"}`}
                  key={column}
                  scope="col"
                >
                  {katexify(String(column), false)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row}>
                <th
                  className={`border-border sticky left-0 z-10 border-r p-2 font-medium ${selected?.row === row ? "bg-background text-action" : "bg-interface-hover text-foreground"}`}
                  scope="row"
                >
                  {katexify(String(row), false)}
                </th>
                {columns.map((column) => {
                  const key = cellKey(row, column);
                  const answer = answers[key];
                  const status = answerStatus(
                    answer?.value ?? "",
                    row * column,
                    answer?.checked ?? false
                  );
                  const isSelected =
                    selected?.row === row && selected.column === column;
                  const StatusIcon = STATUS_ICON[status];
                  return (
                    <td className="p-1" key={column}>
                      <div className="relative">
                        <input
                          aria-describedby={
                            isSelected ? `${helpId} ${statusId}` : helpId
                          }
                          aria-invalid={status === "incorrect"}
                          aria-label={`${row} times ${column}${STATUS_LABEL[status]}`}
                          autoComplete="off"
                          className={`${STATUS_CLASS[status]} focus-visible:outline-action h-12 w-full min-w-0 rounded-lg border px-1 pb-2 text-center text-base tabular-nums outline-hidden focus-visible:outline-2 focus-visible:-outline-offset-2`}
                          inputMode="numeric"
                          maxLength={3}
                          onBlur={() => checkCell(key)}
                          onChange={(event) => {
                            const value = event.currentTarget.value.replaceAll(
                              /\D/gu,
                              ""
                            );
                            setAnswers((previous) => ({
                              ...previous,
                              [key]: { value, checked: false },
                            }));
                            setAnnouncement("");
                          }}
                          onFocus={() => setSelected({ row, column })}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              checkCell(key);
                            }
                          }}
                          pattern="[0-9]*"
                          type="text"
                          value={answer?.value ?? ""}
                        />
                        {StatusIcon ? (
                          <StatusIcon
                            aria-hidden="true"
                            className={`${FEEDBACK_CLASS[status]} pointer-events-none absolute bottom-0.5 left-1/2 size-3 -translate-x-1/2`}
                          />
                        ) : null}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <div className="flex flex-wrap items-center gap-3">
        <Button
          disabled={Object.keys(answers).length === 0}
          onClick={() => {
            setAnswers((previous) =>
              Object.fromEntries(
                Object.entries(previous).map(([key, answer]) => [
                  key,
                  { ...answer, checked: true },
                ])
              )
            );
            setAnnouncement(
              "All entered answers checked. Empty cells are left blank."
            );
          }}
          variant="outline"
        >
          Check answers
        </Button>
        <Button
          disabled={Object.keys(answers).length === 0}
          onClick={() => clearAnswers("Answers cleared. Number order kept.")}
          variant="outline"
        >
          Clear answers
        </Button>
        {correct === 100 ? (
          <output className="text-success font-medium">
            All 100 correct. Great work!
          </output>
        ) : null}
      </div>
      <output className="text-muted block text-sm">{announcement}</output>
    </div>
  );
}
