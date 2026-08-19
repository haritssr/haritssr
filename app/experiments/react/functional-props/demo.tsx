"use client";

import { useState } from "react";
import ExternalLink from "@/components/ExternalLink";
import SubTitle from "@/components/SubTitle";

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
      <div className="font-semibold text-xl">{header(state)}</div>
      <div>{children(state)}</div>
      <button
        className="rounded-md bg-blue-500 px-3 py-0.5 text-white"
        onClick={() => setState(state + 1)}
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

export default function ReactFunctionalPropsDemo() {
  return (
    <>
      <SubTitle>
        Functional Props - TypeScript for beginner to master - Jack Herrington
      </SubTitle>
      <div className="mb-14">
        <ExternalLink
          href="https://github.com/haritssr/haritssr/tree/try/app/experiments/react/functional-props"
          name="Source code"
        />
      </div>
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
