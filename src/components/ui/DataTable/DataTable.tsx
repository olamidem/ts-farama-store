import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type OnChangeFn,
  type RowSelectionState,
} from "@tanstack/react-table";
import DataTableEmpty from "./DataTableEmpty";
import { Package } from "lucide-react";

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  enableRowSelection?: boolean;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  getRowId?: (originalRow: T) => string;
}

const DataTable = <T,>({
  data,
  columns,
  enableRowSelection = false,
  rowSelection,
  onRowSelectionChange,
  getRowId,
}: DataTableProps<T>) => {
  if (data.length === 0) {
    return (
      <DataTableEmpty
        icon={Package}
        title="No data found"
        description="There is nothing to display yet."
      />
    );
  }

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    enableRowSelection,
    onRowSelectionChange,
    getCoreRowModel: getCoreRowModel(),
    getRowId,
  });

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-slate-200 bg-slate-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left text-sm font-semibold text-slate-400 uppercase bg-slate-50 border-b border-slate-100"
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

          <tbody className="divide-y divide-slate-100 bg-white">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="transition-colors hover:bg-slate-50">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-3 align-middle text-sm text-slate-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
