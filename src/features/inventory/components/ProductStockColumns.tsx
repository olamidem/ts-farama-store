import type { ColumnDef } from "@tanstack/react-table";
import type { ProductStockOverviewItem } from "../types/inventory";

export const getProductStockColumns =
  (): ColumnDef<ProductStockOverviewItem>[] => [
    {
      accessorKey: "name",
      header: "PRODUCT",
      cell: ({ row }) => (
        <span className="font-bold text-slate-800">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "sku",
      header: "SKU",
      cell: ({ row }) => (
        <span className="font-mono text-xs font-bold text-slate-500">
          {row.original.sku || "N/A"}
        </span>
      ),
    },
    {
      accessorKey: "unit",
      header: "UNIT",
      cell: ({ row }) => (
        <span className="text-slate-600 font-semibold text-xs">
          {row.original.unit}
        </span>
      ),
    },
    {
      accessorKey: "stock",
      header: "STOCK",
      cell: ({ row }) => (
        <span className="font-mono font-bold text-slate-800">
          {row.original.stock}
        </span>
      ),
    },
    {
      accessorKey: "reserved",
      header: "RESERVED",
      cell: ({ row }) => (
        <span className="font-mono font-semibold text-slate-400">
          {row.original.reserved}
        </span>
      ),
    },
    {
      accessorKey: "available",
      header: "AVAILABLE",
      cell: ({ row }) => (
        <span className="font-mono font-bold text-slate-700">
          {row.original.available}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => {
        const status = row.original.status;
        let badgeClass = "bg-slate-100 text-slate-600 border-slate-200";
        if (status === "In Stock") {
          badgeClass = "bg-emerald-50 text-emerald-700 border-emerald-200";
        } else if (status === "Low Stock") {
          badgeClass =
            "bg-amber-50 text-amber-700 border-amber-200 animate-pulse";
        } else if (status === "Out of Stock") {
          badgeClass = "bg-rose-50 text-rose-700 border-rose-200";
        }

        return (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${badgeClass}`}
          >
            {status}
          </span>
        );
      },
    },
  ];
