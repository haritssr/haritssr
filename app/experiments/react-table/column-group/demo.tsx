"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useReducer } from "react";

import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";

export default function ReactTableColumnGroupDemo() {
  return (
    <>
      <SubTitle>Basic table from react table</SubTitle>
      <SourceCodeLink />
      <Table />
    </>
  );
}

interface Person {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
}

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
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.group({
    id: "hello",
    header: () => <span>Hello</span>,
    // footer: props => props.column.id,
    columns: [
      columnHelper.accessor("firstName", {
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor((row) => row.lastName, {
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      }),
    ],
  }),
  columnHelper.group({
    header: "Info",
    footer: (props) => props.column.id,
    columns: [
      columnHelper.accessor("age", {
        header: () => "Age",
        footer: (props) => props.column.id,
      }),
      columnHelper.group({
        header: "More Info",
        columns: [
          columnHelper.accessor("visits", {
            header: () => <span>Visits</span>,
            footer: (props) => props.column.id,
          }),
          columnHelper.accessor("status", {
            header: "Status",
            footer: (props) => props.column.id,
          }),
          columnHelper.accessor("progress", {
            header: "Profile Progress",
            footer: (props) => props.column.id,
          }),
        ],
      }),
    ],
  }),
];

function Table() {
  const data = useMemo(() => [...defaultData], []);
  const [, rerender] = useReducer(() => ({}), {});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="scrollbar-subtle overflow-x-auto bg-red-50 p-2">
      <table>
        <caption className="sr-only">
          People and activity, grouped by name and information
        </caption>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="border-r border-b border-zinc-500 bg-green-100 px-2 py-1 font-bold whitespace-nowrap"
                  id={
                    header.isPlaceholder
                      ? undefined
                      : `people-header-${encodeURIComponent(header.id)}`
                  }
                  colSpan={header.colSpan}
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
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
                  className="border-r border-b border-zinc-500 px-2 py-1 whitespace-nowrap"
                  headers={table
                    .getFlatHeaders()
                    .filter(
                      (header) =>
                        !header.isPlaceholder &&
                        header.column
                          .getLeafColumns()
                          .some((column) => column.id === cell.column.id)
                    )
                    .map(
                      (header) =>
                        `people-header-${encodeURIComponent(header.id)}`
                    )
                    .join(" ")}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <td
                  className="border-r border-b border-zinc-500 bg-blue-50 font-normal whitespace-nowrap text-zinc-500"
                  colSpan={header.colSpan}
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
      <button
        className="border p-2"
        onClick={() => {
          rerender();
        }}
        type="button"
      >
        Rerender
      </button>
    </div>
  );
}
