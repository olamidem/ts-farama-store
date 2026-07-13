import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type OnChangeFn,
  type RowSelectionState,
} from "@tanstack/react-table";
import DataTableEmpty from "./DataTableEmpty";
import DataTableSkeleton from "./DataTableSkeleton";
import { Package } from "lucide-react";

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  enableRowSelection?: boolean;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  getRowId?: (originalRow: T) => string;
  emptyTitle?: string;
  emptyDescription?: string;
  isLoading?: boolean;
}

const DataTable = <T,>({
  data,
  columns,
  enableRowSelection = false,
  rowSelection,
  onRowSelectionChange,
  getRowId,
  emptyTitle,
  emptyDescription,
  isLoading = false,
}: DataTableProps<T>) => {
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

  if (isLoading) {
    return <DataTableSkeleton />;
  }

  if (data.length === 0) {
    return (
      <DataTableEmpty
        icon={Package}
        title={emptyTitle ?? "No data found"}
        description={emptyDescription ?? "There is nothing to display yet."}
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="max-h-[600px] overflow-y-auto overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead className="sticky top-0 z-10 bg-slate-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50 border-b border-slate-200"
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

          <tbody className="bg-white">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="transition-colors hover:bg-slate-50">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-3 align-middle text-sm text-slate-700 border-b border-slate-100"
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
