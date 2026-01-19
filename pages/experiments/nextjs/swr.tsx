import type { Key } from "react";
import useSWR from "swr";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());

export default function SWR() {
  const { data, error } = useSWR("/api/hello", fetcher);
  if (error) {
    return "An error has occurred.";
  }
  if (!data) {
    return (
      <LayoutToExperiments domain="Nextjs" title="Loading...">
        <div>No Data</div>
      </LayoutToExperiments>
    );
  }

  return (
    <LayoutToExperiments domain="Nextjs" title="SWR">
      <SubTitle>
        Using SWR to fetch data from{" "}
        <code className="rounded-md border border-green-200 bg-green-50 px-2 py-1 font-mono text-green-500 text-sm">
          /api/hello
        </code>{" "}
        and populate the data to{" "}
        <code className="rounded-md border border-rose-200 bg-rose-50 px-2 py-1 font-mono text-rose-500 text-sm">
          {"<NameCard/>"}
        </code>{" "}
        component
      </SubTitle>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {data.map((d: { id: Key; name: string; age: number; city: string }) => (
          <NameCard age={d.age} city={d.city} key={d.id} name={d.name} />
        ))}
      </div>
    </LayoutToExperiments>
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
