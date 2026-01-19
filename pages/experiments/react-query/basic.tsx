import { useQuery } from "@tanstack/react-query";
import type { Key } from "react";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

export default function UseQueryExample() {
  return (
    <LayoutToExperiments domain="React Query" title="Basic">
      <SubTitle>Simple query</SubTitle>
      <Example />
    </LayoutToExperiments>
  );
}

function Example() {
  const { isLoading, error, data, isFetching } = useQuery(["repoData"], () =>
    fetch("/api/react-query-basic").then((res) => res.json())
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
        {data.map(
          (d: {
            id: Key | null | undefined;
            name: unknown;
            age: unknown;
            city: unknown;
          }) => (
            <NameCard age={d.age} city={d.city} key={d.id} name={d.name} />
          )
        )}
      </div>
    </div>
  );
}

const NameCard = ({ name, age, city }) => {
  return (
    <div className="space-y-2 rounded-md border border-zinc-300 bg-zinc-50 p-4">
      <div className="font-semibold text-gray-700 text-xl">{name}</div>
      <div className="text-gray-500">{age}</div>
      <div className="text-action">{city}</div>
    </div>
  );
};
