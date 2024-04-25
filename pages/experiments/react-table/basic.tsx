import SubTitle from "@/components/SubTitle";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useReducer, useState } from "react";

export default function Basic() {
	return (
		<LayoutToExperiments domain="React Table" title="Basic Table">
			<SubTitle>Basic table from react table</SubTitle>
			<Table />
		</LayoutToExperiments>
	);
}

type Person = {
	firstName: string;
	lastName: string;
	age: number;
	visits: number;
	status: string;
	progress: number;
};

const defaultData: Person[] = [
	{
		firstName: "tanner",
		lastName: "linsley",
		age: 24,
		visits: 100,
		status: "In Relationship",
		progress: 50,
	},
	{
		firstName: "tandy",
		lastName: "miller",
		age: 40,
		visits: 40,
		status: "Single",
		progress: 80,
	},
	{
		firstName: "joe",
		lastName: "dirte",
		age: 45,
		visits: 20,
		status: "Complicated",
		progress: 10,
	},
	{
		firstName: "yes",
		lastName: "akaak",
		age: 45,
		visits: 20,
		status: "Complicated",
		progress: 10,
	},
];

const columnHelper = createColumnHelper<Person>();

const columns = [
	columnHelper.accessor("firstName", {
		cell: (info) => info.getValue(),
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor((row) => row.lastName, {
		id: "lastName",
		cell: (info) => <i>{info.getValue()}</i>,
		header: () => <span>Last Name</span>,
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("age", {
		header: () => "Age",
		cell: (info) => info.renderValue(),
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("visits", {
		header: () => <span>Visits</span>,
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("status", {
		header: "Status",
		footer: (info) => info.column.id,
	}),
	columnHelper.accessor("progress", {
		header: "Profile Progress",
		footer: (info) => info.column.id,
	}),
];

function Table() {
	const [data, setData] = useState(() => [...defaultData]);
	const rerender = useReducer(() => ({}), {})[1];

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="overflow-x-auto bg-red-50 p-2">
			<table className="border border-zinc-500">
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									className="whitespace-nowrap border-b border-r border-zinc-500 bg-green-100 py-1 px-2 font-bold"
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
										  )}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td
									key={cell.id}
									className="whitespace-nowrap border-b border-r border-zinc-500 py-1 px-2"
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
				<tfoot className="">
					{table.getFooterGroups().map((footerGroup) => (
						<tr key={footerGroup.id}>
							{footerGroup.headers.map((header) => (
								<th
									key={header.id}
									className="border-r border-zinc-500 bg-blue-50 font-normal text-zinc-500"
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.footer,
												header.getContext(),
										  )}
								</th>
							))}
						</tr>
					))}
				</tfoot>
			</table>
			<div className="h-4" />
			<button
				type="button"
				onClick={() => rerender()}
				className="border border-zinc-700 p-2"
			>
				Rerender
			</button>
		</div>
	);
}
