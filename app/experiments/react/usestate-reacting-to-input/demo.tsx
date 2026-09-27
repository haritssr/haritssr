"use client";

import { useState } from "react";
import type { FormEvent, SetStateAction } from "react";

import ExternalLink from "@/components/ExternalLink";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";

export default function ReactUseStateReactingToInputDemo() {
  return (
    <>
      <SubTitle>
        From{" "}
        <ExternalLink
          href="https://beta.reactjs.org/learn/reacting-to-input-with-state#step-5-connect-the-event-handlers-to-set-state"
          name="beta.reactjs.org"
        />
      </SubTitle>
      <SourceCodeLink />
      <Example />
    </>
  );
}

async function submitForm(answer: string) {
  return await new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      const shouldError = answer.toLowerCase() !== "lima";
      if (shouldError) {
        reject(new Error("salah"));
      } else {
        resolve();
      }
    }, 1000);
  });
}

function TryAgainButton({ onTryAgain }: { onTryAgain: () => void }) {
  return (
    <button className="cursor-pointer" onClick={onTryAgain} type="button">
      Try again
    </button>
  );
}

const Example = () => {
  const [answer, setAnswer] = useState("");
  //perubahan state error dari null ke string, sedangkan kita harus detect whether is null or not to display the error message from try catch async await block in handleSubmit, can i use trus/false instead of null/string ?
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState("typing");

  const handleTryAgain = () => {
    window.location.reload();
    setAnswer("");
  };
  if (status === "success") {
    return (
      <div>
        <h1>Kamu benar</h1>
        <TryAgainButton onTryAgain={handleTryAgain} />
      </div>
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitForm(answer);
      setStatus("success");
    } catch (error) {
      setStatus("typing");
      setError((error as Error).message);
    }
  }

  function handleTextareaChange(e: {
    target: { value: SetStateAction<string> };
  }) {
    setAnswer(e.target.value);
  }

  return (
    <div>
      <h2 id="city-question">
        Di kota mana ada baliho yang ada tempat air yang bisa diminum?
      </h2>
      {error !== null && (
        <div className="text-red-500">
          <div>{error}</div>
          <TryAgainButton onTryAgain={handleTryAgain} />
        </div>
      )}

      {error === null && (
        <form onSubmit={handleSubmit}>
          <textarea
            aria-labelledby="city-question"
            className="border border-zinc-400 p-2"
            onChange={handleTextareaChange}
            value={answer}
          />
          <button
            disabled={answer.length === 0 || status === "submitting"}
            type="submit"
          >
            Submit{" "}
          </button>
          {error}
        </form>
      )}
    </div>
  );
};
