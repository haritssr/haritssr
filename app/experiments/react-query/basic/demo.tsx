"use client";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useMemo } from "react";

import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";
import { fetchPeople } from "@/utils/fetchPeople";
import type { Person } from "@/utils/fetchPeople";

export default function ReactQueryBasicDemo() {
  const queryClient = useMemo(() => new QueryClient(), []);
  return (
    <QueryClientProvider client={queryClient}>
      <SubTitle>Simple query</SubTitle>
      <SourceCodeLink />
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { isLoading, error, data, isFetching, refetch } = useQuery(
    ["people"],
    async () => await fetchPeople("/api/react-query-basic")
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div role="alert">
        People could not be loaded.{" "}
        <button
          type="button"
          onClick={() => {
            void refetch();
          }}
          className="text-action hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }
  if (data === undefined || data.length === 0) {
    return <p>No people found.</p>;
  }
  return (
    <div>
      <p>{isFetching ? "Updating..." : ""}</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {data.map((person) => (
          <NameCard key={person.id} {...person} />
        ))}
      </div>
    </div>
  );
}

const NameCard = ({ name, age, city }: Person) => (
  <div className="space-y-2 rounded-md border border-zinc-300 bg-zinc-50 p-4">
    <div className="text-xl font-semibold text-gray-700">{name}</div>
    <div className="text-gray-500">{age}</div>
    <div className="text-action">{city}</div>
  </div>
);
