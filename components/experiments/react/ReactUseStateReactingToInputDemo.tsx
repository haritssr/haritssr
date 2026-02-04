"use client";

import { type FormEvent, type SetStateAction, useState } from "react";
import ExternalLink from "@/components/ExternalLink";
import SubTitle from "@/components/SubTitle";

function submitForm(answer: string) {
  return new Promise<void>((resolve, reject) => {
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

const Example = () => {
  const [answer, setAnswer] = useState("");
  //perubahan state error dari null ke string, sedangkan kita harus detect whether is null or not to display the error message from try catch async await block in handleSubmit, can i use trus/false instead of null/string ?
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState("typing");

  const Button = () => {
    return (
      <button
        className="cursor-pointer"
        onClick={() => {
          window.location.reload();
          setAnswer("");
        }}
        type="button"
      >
        Try again
      </button>
    );
  };
  if (status === "success") {
    return (
      <div>
        <h1>Kamu benar</h1>
        <Button />
      </div>
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitForm(answer);
      setStatus("success");
    } catch (err) {
      setStatus("typing");
      setError((err as Error).message);
    }
  }

  function handleTextareaChange(e: {
    target: { value: SetStateAction<string> };
  }) {
    setAnswer(e.target.value);
  }

  return (
    <div>
      <h2>Di kota mana ada baliho yang ada tempat air yang bisa diminum?</h2>
      {error !== null && (
        <div className="text-red-500">
          <div>{error}</div>
          <Button />
        </div>
      )}

      {error === null && (
        <form onSubmit={handleSubmit}>
          <textarea
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
      <Example />
    </>
  );
}
