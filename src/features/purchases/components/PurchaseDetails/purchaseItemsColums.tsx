import type { ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "../../../../utils/formatCurrenty";
import type { PurchaseItem } from "../../types/purchaseItem";

export const purchaseItemsColumns: ColumnDef<PurchaseItem>[] = [
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => (
      <span className="font-semibold text-slate-800">
        {row.original.product?.name ?? "Unknown Product"}
      </span>
    ),
  },

  {
    accessorKey: "product_unit",
    header: "Unit",
    cell: ({ row }) => row.original.product_unit?.unit?.name ?? "Piece",
  },

  {
    accessorKey: "quantity",
    header: "Qty",
    cell: ({ row }) => (
      <div className="text-center">
        <div className="font-mono font-semibold">{row.original.quantity}</div>

        {row.original.received_quantity > 0 && (
          <div className="text-[10px] text-emerald-600">
            Rec: {row.original.received_quantity}
          </div>
        )}
      </div>
    ),
  },

  {
    accessorKey: "unit_cost",
    header: "Cost Price",
    cell: ({ row }) => formatCurrency(row.original.unit_cost),
  },

  {
    accessorKey: "total_cost",
    header: "Total",
    cell: ({ row }) => (
      <span className="font-semibold">
        {formatCurrency(row.original.total_cost)}
      </span>
    ),
  },
];
