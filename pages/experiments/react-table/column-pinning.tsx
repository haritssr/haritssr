import faker from "@faker-js/faker";

import {
	type ColumnDef,
	type ColumnOrderState,
	flexRender,
	getCoreRowModel,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table";
import { makeData, type Person } from "../../../utils/react-table/makeData";

import SubTitle from "@/components/SubTitle";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import { useState } from "react";

export default function ColumnOrdering() {
	return (
		<LayoutToExperiments domain="React Table" title="Column Pinning">
			<SubTitle>Basic table from react table</SubTitle>
			<Table />
		</LayoutToExperiments>
	);
}

const defaultColumns: ColumnDef<Person>[] = [
	{
		header: "Name",
		footer: (props) => props.column.id,
		columns: [
			{
				accessorKey: "firstName",
				cell: (info) => info.getValue(),
				footer: (props) => props.column.id,
			},
			{
				accessorFn: (row) => row.lastName,
				id: "lastName",
				cell: (info) => info.getValue(),
				header: () => <span>Last Name</span>,
				footer: (props) => props.column.id,
			},
		],
	},
	{
		header: "Info",
		footer: (props) => props.column.id,
		columns: [
			{
				accessorKey: "age",
				header: () => "Age",
				footer: (props) => props.column.id,
			},
			{
				header: "More Info",
				columns: [
					{
						accessorKey: "visits",
						header: () => <span>Visits</span>,
						footer: (props) => props.column.id,
					},
					{
						accessorKey: "status",
						header: "Status",
						footer: (props) => props.column.id,
					},
					{
						accessorKey: "progress",
						header: "Profile Progress",
						footer: (props) => props.column.id,
					},
				],
			},
		],
	},
];

function Table() {
	const [data, setData] = useState(() => makeData(5000));
	const [columns] = useState(() => [...defaultColumns]);

	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
	const [columnPinning, setColumnPinning] = useState({});

	const [isSplit, setIsSplit] = useState(false);
	const rerender = () => setData(() => makeData(5000));

	const table = useReactTable({
		data,
		columns,
		state: {
			columnVisibility,
			columnOrder,
			columnPinning,
		},
		onColumnVisibilityChange: setColumnVisibility,
		onColumnOrderChange: setColumnOrder,
		onColumnPinningChange: setColumnPinning,
		getCoreRowModel: getCoreRowModel(),
		debugTable: true,
		debugHeaders: true,
		debugColumns: true,
	});

	const randomizeColumns = () => {
		table.setColumnOrder(
			faker.helpers.shuffle(table.getAllLeafColumns().map((d) => d.id)),
		);
	};

	return (
		<div className="p-2">
			<div className="inline-block rounded border border-black shadow">
				<div className="border-b border-black px-1">
					<label>
						<input
							{...{
								type: "checkbox",
								checked: table.getIsAllColumnsVisible(),
								onChange: table.getToggleAllColumnsVisibilityHandler(),
							}}
						/>{" "}
						Toggle All
					</label>
				</div>
				{table.getAllLeafColumns().map((column) => {
					return (
						<div key={column.id} className="px-1">
							<label>
								<input
									{...{
										type: "checkbox",
										checked: column.getIsVisible(),
										onChange: column.getToggleVisibilityHandler(),
									}}
								/>{" "}
								{column.id}
							</label>
						</div>
					);
				})}
			</div>
			<div className="h-4" />
			<div className="flex flex-wrap gap-2">
				<button type="button" onClick={() => rerender()} className="border p-1">
					Regenerate
				</button>
				<button
					type="button"
					onClick={() => randomizeColumns()}
					className="border p-1"
				>
					Shuffle Columns
				</button>
			</div>
			<div className="h-4" />
			<div>
				<label>
					<input
						type="checkbox"
						checked={isSplit}
						onChange={(e) => setIsSplit(e.target.checked)}
					/>{" "}
					Split Mode
				</label>
			</div>
			<div
				className={`flex ${isSplit ? "gap-4" : ""} overflow-x-auto bg-red-50`}
			>
				{isSplit ? (
					<table className="border-2 border-black">
						<thead>
							{table.getLeftHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<th
											key={header.id}
											colSpan={header.colSpan}
											className="whitespace-nowrap border-b border-r border-zinc-500 bg-green-100 py-1 px-2 font-bold"
										>
											<div className="whitespace-nowrap">
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext(),
														)}
											</div>
											{!header.isPlaceholder && header.column.getCanPin() && (
												<div className="flex justify-center gap-1">
													{header.column.getIsPinned() !== "left" ? (
														<button
															type="button"
															className="rounded border px-2"
															onClick={() => {
																header.column.pin("left");
															}}
														>
															{"<="}
														</button>
													) : null}
													{header.column.getIsPinned() ? (
														<button
															type="button"
															className="rounded border px-2"
															onClick={() => {
																header.column.pin(false);
															}}
														>
															X
														</button>
													) : null}
													{header.column.getIsPinned() !== "right" ? (
														<button
															type="button"
															className="rounded border px-2"
															onClick={() => {
																header.column.pin("right");
															}}
														>
															{"=>"}
														</button>
													) : null}
												</div>
											)}
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody>
							{table
								.getRowModel()
								.rows.slice(0, 20)
								.map((row) => {
									return (
										<tr key={row.id}>
											{row.getLeftVisibleCells().map((cell) => {
												return (
													<td key={cell.id}>
														{flexRender(
															cell.column.columnDef.cell,
															cell.getContext(),
														)}
													</td>
												);
											})}
										</tr>
									);
								})}
						</tbody>
					</table>
				) : null}
				<table className="border-2 border-black">
					<thead>
						{(isSplit
							? table.getCenterHeaderGroups()
							: table.getHeaderGroups()
						).map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										colSpan={header.colSpan}
										className="whitespace-nowrap border-b border-r border-zinc-500 bg-green-100 py-1 px-2 font-bold"
									>
										<div className="whitespace-nowrap">
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</div>
										{!header.isPlaceholder && header.column.getCanPin() && (
											<div className="flex justify-center gap-1">
												{header.column.getIsPinned() !== "left" ? (
													<button
														type="button"
														className="rounded border px-2"
														onClick={() => {
															header.column.pin("left");
														}}
													>
														{"<="}
													</button>
												) : null}
												{header.column.getIsPinned() ? (
													<button
														type="button"
														className="rounded border px-2"
														onClick={() => {
															header.column.pin(false);
														}}
													>
														X
													</button>
												) : null}
												{header.column.getIsPinned() !== "right" ? (
													<button
														type="button"
														className="rounded border px-2"
														onClick={() => {
															header.column.pin("right");
														}}
													>
														{"=>"}
													</button>
												) : null}
											</div>
										)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table
							.getRowModel()
							.rows.slice(0, 20)
							.map((row) => {
								return (
									<tr key={row.id}>
										{(isSplit
											? row.getCenterVisibleCells()
											: row.getVisibleCells()
										).map((cell) => {
											return (
												<td key={cell.id}>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext(),
													)}
												</td>
											);
										})}
									</tr>
								);
							})}
					</tbody>
				</table>
				{isSplit ? (
					<table className="border-2 border-black">
						<thead>
							{table.getRightHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<th
											key={header.id}
											colSpan={header.colSpan}
											className="whitespace-nowrap border-b border-r border-zinc-500 bg-green-100 py-1 px-2 font-bold"
										>
											<div className="whitespace-nowrap">
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext(),
														)}
											</div>
											{!header.isPlaceholder && header.column.getCanPin() && (
												<div className="flex justify-center gap-1">
													{header.column.getIsPinned() !== "left" ? (
														<button
															type="button"
															className="rounded border px-2"
															onClick={() => {
																header.column.pin("left");
															}}
														>
															{"<="}
														</button>
													) : null}
													{header.column.getIsPinned() ? (
														<button
															type="button"
															className="rounded border px-2"
															onClick={() => {
																header.column.pin(false);
															}}
														>
															X
														</button>
													) : null}
													{header.column.getIsPinned() !== "right" ? (
														<button
															type="button"
															className="rounded border px-2"
															onClick={() => {
																header.column.pin("right");
															}}
														>
															{"=>"}
														</button>
													) : null}
												</div>
											)}
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody>
							{table
								.getRowModel()
								.rows.slice(0, 20)
								.map((row) => {
									return (
										<tr key={row.id}>
											{row.getRightVisibleCells().map((cell) => {
												return (
													<td key={cell.id}>
														{flexRender(
															cell.column.columnDef.cell,
															cell.getContext(),
														)}
													</td>
												);
											})}
										</tr>
									);
								})}
						</tbody>
					</table>
				) : null}
			</div>
			<pre>{JSON.stringify(table.getState().columnPinning, null, 2)}</pre>
		</div>
	);
}
