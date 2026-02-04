"use client";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import type { Key } from "react";
import SubTitle from "@/components/SubTitle";

interface PersonData {
  id: number;
  name: string;
  age: number;
  city: string;
}

interface NameCardProps {
  name: string;
  age: number;
  city: string;
}

const queryClient = new QueryClient();

export default function ReactQueryBasicDemo() {
  return (
    <QueryClientProvider client={queryClient}>
      <SubTitle>Simple query</SubTitle>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const { isLoading, error, data, isFetching } = useQuery<PersonData[]>(
    ["repoData"],
    () => fetch("/api/react-query-basic").then((res) => res.json())
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>An error has occurred</div>;
  }
  return (
    <div>
      <p>{isFetching ? "Updating..." : ""}</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {data?.map(
          (d: {
            id: Key | null | undefined;
            name: string;
            age: number;
            city: string;
          }) => (
            <NameCard age={d.age} city={d.city} key={d.id} name={d.name} />
          )
        )}
      </div>
    </div>
  );
}

const NameCard = ({ name, age, city }: NameCardProps) => {
  return (
    <div className="space-y-2 rounded-md border border-zinc-300 bg-zinc-50 p-4">
      <div className="font-semibold text-gray-700 text-xl">{name}</div>
      <div className="text-gray-500">{age}</div>
      <div className="text-action">{city}</div>
    </div>
  );
};
