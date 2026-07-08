import type { ColumnDef } from "@tanstack/react-table";
import type { Product } from "../types/product";

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "barcode",
    header: "Barcode",
    cell: ({ row }) => (
      <span className="font-mono text-[11px] text-slate-500">
        {row.original.barcode}
      </span>
    ),
  },

  {
    accessorKey: "name",
    header: "Product Name",
    cell: ({ row }) => (
      <div>
        <p className="font-bold text-slate-950">{row.original.name}</p>

        {row.original.stock <= row.original.min_stock_alert && (
          <span className="mt-1 inline-block rounded-sm bg-rose-100 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-rose-700">
            Low Stock
          </span>
        )}
      </div>
    ),
  },

  {
    accessorKey: "categoryId",
    header: "Category",
  },

  {
    accessorKey: "selling_price",
    header: "Selling Price",
    cell: ({ row }) => (
      <span className="font-extrabold text-slate-900">
        € {row.original.selling_price.toFixed(2)}
      </span>
    ),
  },

  {
    accessorKey: "cost_price",
    header: "Cost Price",
    cell: ({ row }) => (
      <span className="font-mono font-semibold text-slate-500">
        € {row.original.cost_price.toFixed(2)}
      </span>
    ),
  },

  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => (
      <span
        className={`font-mono font-bold ${
          row.original.stock <= row.original.min_stock_alert
            ? "text-rose-600"
            : "text-slate-800"
        }`}
      >
        {row.original.stock} Units
      </span>
    ),
  },

  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <button className="rounded bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700 transition hover:bg-slate-200">
        Edit
      </button>
    ),
  },
];
