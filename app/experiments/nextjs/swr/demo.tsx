"use client";

import useSWR from "swr";

import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";
import { fetchPeople } from "@/utils/fetchPeople";
import type { Person } from "@/utils/fetchPeople";

export default function NextjsSWRDemo() {
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
      <PeopleResults />
    </>
  );
}

const NameCard = ({ name, age, city }: Person) => (
  <div className="space-y-2 rounded-md border border-zinc-300 bg-zinc-50 p-4">
    <div className="text-xl font-semibold text-gray-700">{name}</div>
    <div className="text-gray-500">{age}</div>
    <div className="text-action">{city}</div>
  </div>
);

function PeopleResults() {
  const { data, error, isLoading, mutate } = useSWR("/api/hello", fetchPeople);
  if (isLoading) {
    return <output>Loading people…</output>;
  }
  if (error) {
    return (
      <div role="alert">
        People could not be loaded.{" "}
        <button
          className="text-action hover:underline"
          onClick={() => {
            void mutate();
          }}
          type="button"
        >
          Try again
        </button>
      </div>
    );
  }
  if (!data?.length) {
    return <p>No people found.</p>;
  }
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {data.map((person) => (
        <NameCard key={person.id} {...person} />
      ))}
    </div>
  );
}
