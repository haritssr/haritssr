"use client";

import type { Key } from "react";
import useSWR from "swr";

import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";

const fetcher = async (url: RequestInfo) =>
  await fetch(url).then(async (res) => await res.json());

export default function NextjsSWRDemo() {
  const { data, error } = useSWR("/api/hello", fetcher);
  if (error) {
    return <div>An error has occurred.</div>;
  }
  if (!data) {
    return <div>No Data</div>;
  }

  return (
    <>
      <SubTitle>
        Using SWR to fetch data from{" "}
        <code className="rounded-md border border-green-200 bg-green-50 px-2 py-1 font-mono text-sm text-green-500">
          /api/hello
        </code>{" "}
        and populate the data to{" "}
        <code className="rounded-md border border-rose-200 bg-rose-50 px-2 py-1 font-mono text-sm text-rose-500">
          {"<NameCard/>"}
        </code>{" "}
        component
      </SubTitle>
      <SourceCodeLink />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {data.map((d: { id: Key; name: string; age: string; city: string }) => (
          <NameCard age={d.age} city={d.city} key={d.id} name={d.name} />
        ))}
      </div>
    </>
  );
}

interface NameCardProps {
  age: string;
  city: string;
  name: string;
}

const NameCard = ({ name, age, city }: NameCardProps) => (
  <div className="space-y-2 rounded-md border border-zinc-300 bg-zinc-50 p-4">
    <div className="text-xl font-semibold text-gray-700">{name}</div>
    <div className="text-gray-500">{age}</div>
    <div className="text-action">{city}</div>
  </div>
);
