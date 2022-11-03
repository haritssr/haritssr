import { FC, useState } from 'react';

import {
  Column,
  ColumnDef,
  ColumnOrderState,
  flexRender,
  getCoreRowModel,
  Header,
  Table,
  useReactTable,
} from '@tanstack/react-table';
import { makeData, Person } from '../../../utils/react-table/makeData';

import { useDrag, useDrop } from 'react-dnd';

import SubTitle from '@/components/SubTitle';
import LayoutToExperiments from '@/components/LayoutToExperiments';

export default function ColumnOrdering() {
  return (
    <LayoutToExperiments domain='React Table' title='Column Ordering DnD'>
      <SubTitle>Basic table from react table</SubTitle>
      <Table />
    </LayoutToExperiments>
  );
}

const defaultColumns: ColumnDef<Person>[] = [
  {
    accessorKey: 'firstName',
    id: 'firstName',
    header: 'First Name',
    cell: info => info.getValue(),
    footer: props => props.column.id,
  },
  {
    accessorFn: row => row.lastName,
    id: 'lastName',
    cell: info => info.getValue(),
    header: () => <span>Last Name</span>,
    footer: props => props.column.id,
  },
  {
    accessorKey: 'age',
    id: 'age',
    header: 'Age',
    footer: props => props.column.id,
  },

  {
    accessorKey: 'visits',
    id: 'visits',
    header: 'Visits',
    footer: props => props.column.id,
  },
  {
    accessorKey: 'status',
    id: 'status',
    header: 'Status',
    footer: props => props.column.id,
  },
  {
    accessorKey: 'progress',
    id: 'progress',
    header: 'Profile Progress',
    footer: props => props.column.id,
  },
];

const reorderColumn = (
  draggedColumnId: string,
  targetColumnId: string,
  columnOrder: string[]
): ColumnOrderState => {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string
  );
  return [...columnOrder];
};

const DraggableColumnHeader: FC<{
  header: Header<Person, unknown>;
  table: Table<Person>;
}> = ({ header, table }) => {
  const { getState, setColumnOrder } = table;
  const { columnOrder } = getState();
  const { column } = header;

  const [, dropRef] = useDrop({
    accept: 'column',
    drop: (draggedColumn: Column<Person>) => {
      const newColumnOrder = reorderColumn(draggedColumn.id, column.id, columnOrder);
      setColumnOrder(newColumnOrder);
    },
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: 'column',
  });

  return (
    <th ref={dropRef} colSpan={header.colSpan} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div ref={previewRef}>
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
        <button ref={dragRef}>=</button>
      </div>
    </th>
  );
};

function Table() {
  const [data, setData] = useState(() => makeData(20));
  const [columns] = useState(() => [...defaultColumns]);

  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    columns.map(column => column.id as string) //must start out with populated columnOrder so we can splice
  );

  const regenerateData = () => setData(() => makeData(20));

  const resetOrder = () => setColumnOrder(columns.map(column => column.id as string));

  const table = useReactTable({
    data,
    columns,
    state: {
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <div className='p-2'>
      <div className='h-4' />
      <div className='flex flex-wrap gap-2'>
        <button onClick={() => regenerateData()} className='border p-1'>
          Regenerate
        </button>
        <button onClick={() => resetOrder()} className='border p-1'>
          Reset Order
        </button>
      </div>
      <div className='h-4' />
      <div className='overflow-x-auto bg-red-50'>
        <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr
                key={headerGroup.id}
                className='whitespace-nowrap border-b border-r border-zinc-500 bg-green-100 py-1 px-2 font-bold'
              >
                {headerGroup.headers.map(header => (
                  <DraggableColumnHeader key={header.id} header={header} table={table} />
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr
                key={row.id}
                className='whitespace-nowrap border-b border-r border-zinc-500 py-1 px-2'
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map(footerGroup => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className='whitespace-nowrap border-r border-b border-zinc-500 bg-blue-50 font-normal text-zinc-500'
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.footer, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
      <pre>{JSON.stringify(table.getState().columnOrder, null, 2)}</pre>
    </div>
  );
}
