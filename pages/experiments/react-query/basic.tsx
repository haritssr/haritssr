import LayoutToExperiments from "@/components/LayoutToExperiments";
import { useQuery } from "@tanstack/react-query";
import { Key } from "react";
import SubTitle from "@/components/SubTitle";

export default function UseQueryExample() {
	return (
		<LayoutToExperiments title="Basic" domain="React Query">
			<SubTitle>Simple query</SubTitle>
			<Example />
		</LayoutToExperiments>
	);
}

function Example() {
	const { isLoading, error, data, isFetching } = useQuery(["repoData"], () =>
		fetch("/api/react-query-basic").then((res) => res.json())
	);
	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>An error has occurred</div>;
	return (
		<div>
			<p>{isFetching ? "Updating..." : ""}</p>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
				{data.map(
					(d: {
						id: Key | null | undefined;
						name: any;
						age: any;
						city: any;
					}) => (
						<NameCard key={d.id} name={d.name} age={d.age} city={d.city} />
					)
				)}
			</div>
		</div>
	);
}

const NameCard = ({ name, age, city }) => {
	return (
		<div className="space-y-2 rounded-md border border-zinc-300 bg-zinc-50 p-4">
			<div className="text-xl font-semibold text-gray-700">{name}</div>
			<div className="text-gray-500">{age}</div>
			<div className="text-blue-500">{city}</div>
		</div>
	);
};
