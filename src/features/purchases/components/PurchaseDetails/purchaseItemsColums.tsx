import type { ColumnDef } from "@tanstack/react-table";
import type { PurchaseItem } from "../../types/purchaseItem";
import { formatCurrency } from "../../../../utils/formatCurrenty";

export const purchaseItemsColumns: ColumnDef<PurchaseItem>[] = [
  {
    accessorKey: "product",
    header: "PRODUCT",
    cell: ({ row }) => (
      <span className="font-bold text-slate-800 text-xs">
        {row.original.product?.name ?? "Unknown Product"}
      </span>
    ),
  },

  {
    accessorKey: "product_unit",
    header: "UNIT",
    cell: ({ row }) => {
      const unitName =
        (row.original.product_unit as unknown as { unit?: { name: string } })
          ?.unit?.name ?? "Carton";
      return (
        <span className="text-slate-500 font-semibold text-xs">{unitName}</span>
      );
    },
  },

  {
    accessorKey: "quantity",
    header: "QTY",
    cell: ({ row }) => (
      <div className="text-left font-mono font-bold text-slate-700 text-xs">
        {row.original.quantity}
      </div>
    ),
  },

  {
    accessorKey: "unit_cost",
    header: "COST PRICE",
    cell: ({ row }) => (
      <span className="font-semibold text-slate-700 text-xs">
        {formatCurrency(row.original.unit_cost)}
      </span>
    ),
  },

  {
    accessorKey: "total_cost",
    header: "TOTAL",
    cell: ({ row }) => (
      <span className="font-bold text-slate-800 text-xs text-right block">
        {formatCurrency(row.original.total_cost)}
      </span>
    ),
  },
];
