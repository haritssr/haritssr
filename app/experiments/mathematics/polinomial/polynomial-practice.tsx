"use client";

import { useRef, useState } from "react";

import Accordion, { AccordionItem } from "@/components/Accordion";
import Button from "@/components/Button";

import AnswerFields from "./answer-fields";
import {
  CoefficientComparison,
  Equation,
  MathText,
  Step,
  SyntheticDivision,
} from "./math-ui";
import type { Progress, QuestionEntry } from "./model";
import {
  checkQuestion,
  emptyEntry,
  initialProgress,
  questionStatus,
  updateEntry,
} from "./model";
import type { Question } from "./questions";
import { originalPTex, originalQTex, questions, topics } from "./questions";
import { useProgress } from "./use-progress";

const statusLabels = {
  solved: "Benar",
  revealed: "Dibahas",
  draft: "Dikerjakan",
  new: "Belum dikerjakan",
};

function StatusMarker({ status }: { status: keyof typeof statusLabels }) {
  if (status === "solved") {
    return <span aria-hidden="true">✓</span>;
  }
  if (status === "revealed") {
    return <span aria-hidden="true">◉</span>;
  }
  return null;
}

function TopicNavigation({
  progress,
  current,
  onNavigate,
}: {
  progress: Progress;
  current: Question;
  onNavigate: (id: number) => void;
}) {
  return (
    <nav
      aria-label="Topik latihan polinomial"
      className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1"
    >
      {topics.map((topic) => {
        const topicQuestions = questions.filter(
          (question) => question.topic === topic.id
        );
        const complete = topicQuestions.filter(
          (question) =>
            questionStatus(
              question,
              progress.entries[question.id] ?? emptyEntry
            ) === "solved"
        ).length;
        const active = current.topic === topic.id;
        return (
          <button
            aria-label={`${topic.id}. ${topic.title}, ${complete} dari ${topicQuestions.length} soal benar`}
            aria-current={active ? "true" : undefined}
            className={`focus-visible:outline-action min-w-0 cursor-pointer rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${active ? "border-action bg-action/10" : "border-border hover:bg-interface-hover"}`}
            key={topic.id}
            onClick={() => {
              onNavigate(topicQuestions[0].id);
            }}
            type="button"
          >
            <span className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className={`flex size-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${active ? "bg-action text-white" : "bg-interface-hover text-muted"}`}
              >
                {topic.id}
              </span>
              <span className="min-w-0 text-sm font-medium">{topic.title}</span>
            </span>
            <span className="text-muted mt-2 flex justify-between gap-2 text-xs">
              <span>
                Soal {topicQuestions[0].id}
                {topicQuestions.length > 1
                  ? `–${topicQuestions.at(-1)?.id}`
                  : ""}
              </span>
              <span>
                {complete}/{topicQuestions.length} benar
              </span>
            </span>
          </button>
        );
      })}
    </nav>
  );
}

function SharedPolynomials({ question }: { question: Question }) {
  if (question.id < 17 || question.id > 26) {
    return null;
  }
  return (
    <aside
      aria-label="Polinomial acuan"
      className="border-border bg-interface-hover/40 min-w-0 rounded-xl border px-4 py-3"
    >
      <p className="text-muted text-xs font-semibold tracking-wide uppercase">
        Polinomial acuan · soal 17–26
      </p>
      <Equation tex={originalPTex} />
      <Equation tex={originalQTex} />
    </aside>
  );
}

function AnswerFeedback({
  question,
  entry,
}: {
  question: Question;
  entry: QuestionEntry;
}) {
  if (!entry.checked) {
    return null;
  }
  const result = checkQuestion(question, entry.answers);
  const needsInput = Object.values(result.results).some(
    (value) => value === "empty" || value === "invalid"
  );
  let message =
    "Periksa kolom yang ditandai. Kamu bisa memperbaiki jawaban dan mencoba lagi.";
  if (needsInput) {
    message =
      "Lengkapi kolom kosong dan periksa format angka sebelum mencoba lagi.";
  }
  if (result.complete) {
    message = entry.revealed
      ? "Jawaban cocok dengan pembahasan. Soal ini tetap ditandai sebagai sudah dibahas."
      : "Semua jawaban benar. Lanjutkan ke soal berikutnya atau pelajari pembahasannya.";
  }
  return (
    <div
      className={`mt-4 rounded-xl border p-4 ${result.complete ? "border-action bg-action/5" : "border-danger/40 bg-danger/5"}`}
    >
      <p className="text-sm font-semibold">
        {result.complete
          ? "Tepat!"
          : `${result.correctCount} dari ${result.total} kolom benar`}
      </p>
      <p className="text-muted mt-1 text-sm leading-6">{message}</p>
      {result.complete && entry.hints > 0 && !entry.revealed ? (
        <p className="text-muted mt-2 text-xs">
          Diselesaikan dengan bantuan petunjuk.
        </p>
      ) : null}
    </div>
  );
}

function HelpPanel({
  question,
  entry,
  onHint,
  onReveal,
}: {
  question: Question;
  entry: QuestionEntry;
  onHint: () => void;
  onReveal: () => void;
}) {
  let hintLabel = "Beri petunjuk";
  if (entry.hints === 1) {
    hintLabel = "Petunjuk berikutnya";
  }
  if (entry.hints >= 2) {
    hintLabel = "Dua petunjuk dibuka";
  }
  return (
    <section
      aria-label="Bantuan dan pembahasan"
      className="border-border mt-6 border-t pt-5"
    >
      <div className="flex flex-wrap items-center gap-3">
        <button
          className="border-border hover:bg-interface-hover focus-visible:outline-action min-h-11 cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={entry.hints >= 2 || entry.revealed}
          onClick={onHint}
          type="button"
        >
          {hintLabel}
        </button>
        <button
          aria-expanded={entry.revealed}
          aria-controls={`solution-${question.id}`}
          className="text-action focus-visible:outline-action min-h-11 cursor-pointer rounded-lg px-3 py-2 text-sm font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-default"
          disabled={entry.revealed}
          onClick={onReveal}
          type="button"
        >
          {entry.revealed ? "Pembahasan dibuka" : "Lihat pembahasan"}
        </button>
      </div>
      {entry.revealed ? null : (
        <p className="text-muted mt-2 text-xs leading-5">
          Coba petunjuk dulu. Membuka pembahasan menandai soal sebagai
          “Dibahas”, bukan “Benar”.
        </p>
      )}
      <div aria-live="polite" className="mt-4 space-y-3">
        {question.hints.slice(0, entry.hints).map((hint, index) => (
          <div className="border-border rounded-xl border p-4" key={hint.text}>
            <p className="text-action mb-2 text-xs font-semibold">
              Petunjuk {index + 1}
            </p>
            <Step step={hint} />
          </div>
        ))}
      </div>
      <div hidden={!entry.revealed} id={`solution-${question.id}`}>
        {entry.revealed ? (
          <div className="border-action/30 bg-action/5 mt-4 space-y-5 rounded-xl border p-4 sm:p-5">
            <h3 className="font-semibold">Pembahasan soal {question.id}</h3>
            <SyntheticDivision question={question} />
            <ol className="space-y-5">
              {question.solution.map((step, index) => (
                <li className="flex min-w-0 gap-3" key={step.text}>
                  <span
                    aria-hidden="true"
                    className="bg-action/10 text-action mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                  >
                    {index + 1}
                  </span>
                  <Step step={step} />
                </li>
              ))}
            </ol>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ProgressSummary({
  progress,
  persistent,
  onReset,
}: {
  progress: Progress;
  persistent: boolean;
  onReset: () => void;
}) {
  const [confirmReset, setConfirmReset] = useState(false);
  const solved = questions.filter(
    (question) =>
      questionStatus(question, progress.entries[question.id] ?? emptyEntry) ===
      "solved"
  ).length;
  const revealed = questions.filter(
    (question) => progress.entries[question.id]?.revealed
  ).length;
  return (
    <section
      aria-label="Progres latihan"
      className="border-border rounded-2xl border p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-muted text-xs font-semibold tracking-wide uppercase">
            Progres latihan
          </p>
          <p className="mt-2 text-2xl font-semibold">
            {solved}
            <span className="text-muted text-base font-normal">
              {" "}
              / 27 soal benar
            </span>
          </p>
          <p className="text-muted mt-1 text-xs">
            {revealed} soal dibuka pembahasannya ·{" "}
            {persistent
              ? "Tersimpan di browser ini"
              : "Progres hanya tersimpan selama halaman terbuka"}
          </p>
        </div>
        <button
          aria-expanded={confirmReset}
          aria-controls="polynomial-reset"
          className="text-muted focus-visible:outline-action min-h-11 cursor-pointer rounded-lg px-3 py-2 text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"
          onClick={() => {
            setConfirmReset((value) => !value);
          }}
          type="button"
        >
          Ulangi latihan
        </button>
      </div>
      <progress
        aria-label={`${solved} dari 27 soal dijawab benar`}
        className="accent-action mt-4 h-2 w-full"
        max={27}
        value={solved}
      />
      <div hidden={!confirmReset} id="polynomial-reset">
        {confirmReset ? (
          <fieldset
            aria-label="Konfirmasi penghapusan progres"
            className="border-border mt-4 rounded-xl border p-4"
          >
            <p className="text-sm">
              Hapus semua jawaban, petunjuk, dan progres latihan polinomial di
              browser ini?
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Button
                className="min-h-11"
                onClick={() => {
                  onReset();
                  setConfirmReset(false);
                }}
                variant="danger"
              >
                Ya, mulai ulang
              </Button>
              <button
                className="border-border hover:bg-interface-hover focus-visible:outline-action min-h-11 cursor-pointer rounded-lg border px-4 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={() => {
                  setConfirmReset(false);
                }}
                type="button"
              >
                Batal
              </button>
            </div>
          </fieldset>
        ) : null}
      </div>
      {solved + revealed === 27 ? (
        <p aria-live="polite" className="text-action mt-4 text-sm font-medium">
          Semua soal sudah dikunjungi sampai tuntas.{" "}
          {revealed > 0
            ? "Ulangi latihan kapan pun untuk mencoba tanpa pembahasan."
            : "Seluruh 27 soal berhasil kamu selesaikan!"}
        </p>
      ) : null}
    </section>
  );
}

export default function PolynomialPractice() {
  const { progress, ready, persistent, update } = useProgress();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const question =
    questions.find((item) => item.id === progress.currentId) ?? questions[0];
  const topic = topics.find((item) => item.id === question.topic) ?? topics[0];
  const entry = progress.entries[question.id] ?? emptyEntry;
  const topicQuestions = questions.filter(
    (item) => item.topic === question.topic
  );
  const checked = entry.checked
    ? checkQuestion(question, entry.answers)
    : undefined;
  const status = questionStatus(question, entry);

  const navigate = (id: number) => {
    update((previous) => ({ ...previous, currentId: id }));
    requestAnimationFrame(() => {
      headingRef.current?.focus({ preventScroll: true });
      headingRef.current?.scrollIntoView({ block: "start" });
    });
  };
  const changeEntry = (updater: (previous: QuestionEntry) => QuestionEntry) => {
    update((previous) => updateEntry(previous, question.id, updater));
  };

  return (
    <div aria-busy={!ready} className="space-y-20">
      <ProgressSummary
        onReset={() => {
          update(() => initialProgress);
          requestAnimationFrame(() => {
            headingRef.current?.focus();
          });
        }}
        persistent={persistent}
        progress={progress}
      />
      <fieldset className="min-w-0" disabled={!ready}>
        <legend className="sr-only">Latihan interaktif polinomial</legend>
        <div className="grid items-start gap-6 lg:grid-cols-[15rem_minmax(0,1fr)]">
          <aside className="min-w-0">
            <div className="hidden lg:block">
              <h2 className="text-muted mb-3 text-xs font-semibold tracking-wide uppercase">
                Sepuluh topik, satu langkah setiap kali
              </h2>
              <TopicNavigation
                current={question}
                onNavigate={navigate}
                progress={progress}
              />
            </div>
            <Accordion className="w-full lg:hidden">
              <AccordionItem
                panelClassName="bg-transparent"
                title={
                  <>
                    Pilih topik · {topic.id}. {topic.title}
                  </>
                }
                value="topic-navigation"
              >
                <TopicNavigation
                  current={question}
                  onNavigate={navigate}
                  progress={progress}
                />
              </AccordionItem>
            </Accordion>
          </aside>
          <section
            aria-labelledby="polynomial-question-heading"
            className="border-border min-w-0 overflow-hidden rounded-2xl border"
          >
            <div className="border-border bg-interface-hover/40 border-b px-5 py-4 sm:px-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-action text-xs font-semibold tracking-wide uppercase">
                  {topic.id}. {topic.title}
                </p>
                <span className="text-muted text-xs">
                  {statusLabels[status]}
                </span>
              </div>
              <h2
                className="focus-visible:outline-action mt-2 scroll-mt-24 rounded-sm text-xl font-semibold focus-visible:outline-2 focus-visible:outline-offset-4"
                id="polynomial-question-heading"
                ref={headingRef}
                tabIndex={-1}
              >
                Soal {question.id}{" "}
                <span className="text-muted text-base font-normal">
                  dari 27
                </span>
              </h2>
              <nav
                aria-label="Soal dalam topik ini"
                className="mt-3 flex flex-wrap gap-2"
              >
                {topicQuestions.map((item) => {
                  const itemStatus = questionStatus(
                    item,
                    progress.entries[item.id] ?? emptyEntry
                  );
                  return (
                    <button
                      aria-current={
                        item.id === question.id ? "step" : undefined
                      }
                      aria-label={`Soal ${item.id}, ${statusLabels[itemStatus]}`}
                      className={`focus-visible:outline-action flex min-h-11 min-w-11 cursor-pointer items-center justify-center gap-1 rounded-lg border px-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 ${item.id === question.id ? "border-action bg-action text-white" : "border-border hover:bg-interface-hover"}`}
                      key={item.id}
                      onClick={() => {
                        navigate(item.id);
                      }}
                      type="button"
                    >
                      {item.id}
                      <StatusMarker status={itemStatus} />
                    </button>
                  );
                })}
              </nav>
            </div>
            <div className="min-w-0 p-5 sm:p-6" key={question.id}>
              <Accordion className="mb-5 w-full">
                <AccordionItem
                  panelClassName="bg-transparent"
                  title={<>Ingat konsepnya · {topic.title}</>}
                  value="topic-concept"
                >
                  <p className="text-muted text-sm leading-6">
                    {topic.description}
                  </p>
                  <Equation tex={topic.rule} />
                  <p className="text-muted text-xs leading-5">
                    Koefisien boleh berupa bilangan real. Untuk polinomial,
                    pangkat variabel harus bilangan bulat tak negatif.
                  </p>
                </AccordionItem>
              </Accordion>
              <SharedPolynomials question={question} />
              <p className="mt-5 text-base leading-7 font-medium">
                <MathText text={question.prompt} />
              </p>
              {question.expression === undefined ? null : (
                <div className="text-foreground bg-interface-hover/40 my-4 rounded-xl px-3 py-2">
                  <Equation tex={question.expression} />
                </div>
              )}
              <CoefficientComparison question={question} />
              <form
                className="mt-5"
                noValidate
                onSubmit={(event) => {
                  event.preventDefault();
                  changeEntry((previous) => ({ ...previous, checked: true }));
                }}
              >
                <AnswerFields
                  answers={entry.answers}
                  onChange={(field, value) => {
                    changeEntry((previous) => ({
                      ...previous,
                      checked: false,
                      answers: { ...previous.answers, [field]: value },
                    }));
                  }}
                  question={question}
                  results={checked?.results}
                />
                <Button className="mt-5 min-h-12 px-5" type="submit">
                  Periksa jawaban
                </Button>
                <div aria-live="polite" aria-atomic="true">
                  <AnswerFeedback entry={entry} question={question} />
                </div>
              </form>
              <HelpPanel
                entry={entry}
                onHint={() => {
                  changeEntry((previous) => ({
                    ...previous,
                    hints: Math.min(2, previous.hints + 1),
                  }));
                }}
                onReveal={() => {
                  changeEntry((previous) => ({ ...previous, revealed: true }));
                }}
                question={question}
              />
              <div className="border-border mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-5">
                <button
                  className="border-border hover:bg-interface-hover focus-visible:outline-action min-h-11 cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={question.id === 1}
                  onClick={() => {
                    navigate(question.id - 1);
                  }}
                  type="button"
                >
                  ← Sebelumnya
                </button>
                <button
                  className="border-border hover:bg-interface-hover focus-visible:outline-action min-h-11 cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={question.id === 27}
                  onClick={() => {
                    navigate(question.id + 1);
                  }}
                  type="button"
                >
                  Berikutnya →
                </button>
              </div>
              {question.id === 27 ? (
                <p className="text-muted mt-4 text-sm leading-6">
                  Ini soal terakhir. Gunakan daftar topik untuk kembali ke soal
                  yang belum selesai.
                </p>
              ) : null}
            </div>
          </section>
        </div>
      </fieldset>
      {ready ? null : (
        <output className="text-muted mt-3 block text-sm">
          Memuat progres latihan…
        </output>
      )}
    </div>
  );
}
