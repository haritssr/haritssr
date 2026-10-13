"use client";

import { useState } from "react";

import ExperimentPageHeader from "@/components/ExperimentPageHeader";
import PageDescription from "@/components/PageDescription";

export default function ReactFunctionalPropsDemo() {
  return (
    <>
      <ExperimentPageHeader>
        <PageDescription>
          Functional Props - TypeScript for beginner to master - Jack Herrington
        </PageDescription>
      </ExperimentPageHeader>

      <TextWithNumber
        header={(num: number) => <span>The header is {num}</span>}
      >
        {(num: number) => <div>The number is {num}</div>}
      </TextWithNumber>

      {/* Why we can change the items array can be other than string? */}
      <List
        className="mt-10"
        items={["Jack", "Mo", "Ji"]}
        render={(item: string) => <div>{item}</div>}
      />
    </>
  );
}

function TextWithNumber({
  header,
  children,
}: {
  header: (num: number) => React.ReactNode;
  children: (num: number) => React.ReactNode;
}) {
  const [state, setState] = useState<number>(1);
  return (
    <div>
      <div className="text-xl font-semibold">{header(state)}</div>
      <div>{children(state)}</div>
      <button
        className="rounded-md bg-blue-500 px-3 py-0.5 text-white"
        onClick={() => {
          setState(state + 1);
        }}
        type="button"
      >
        Add
      </button>
    </div>
  );
}

function List<ListItem>({
  className,
  items,
  render,
}: {
  className: string;
  items: ListItem[];
  render: (item: ListItem) => React.ReactNode;
}) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={String(item)}>{render(item)}</li>
      ))}
    </ul>
  );
}
