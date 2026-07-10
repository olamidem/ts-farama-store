import type { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import type { Category } from "../../categories/types/category";
import type { Product } from "../types/product";
import { formatCurrency } from "../../../utils/format";
import { selectionColumn } from "../../../components/ui/DataTable/SelectionColumn";

export const productColumns = (categories: Category[]): ColumnDef<Product>[] => [
  selectionColumn<Product>(),
  {
    accessorKey: "barcode",
    header: "Barcode",
    cell: ({ row }) => (
      <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs font-semibold text-slate-600">
        {row.original.barcode}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => {
      const product = row.original;
      const isLowStock = product.stock <= product.min_stock_alert;
      return (
        <div className="flex items-center justify-between gap-3">
          <span className="font-semibold text-slate-900">{product.name}</span>
          {isLowStock && (
            <Badge variant="danger" size="sm">
              Low Stock
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "category_id",
    header: "Category",
    cell: ({ row }) => {
      const category = categories.find(
        (c) => c.id === row.original.category_id,
      );
      return (
        <Badge variant="info" size="sm">
          {category?.name ?? "Uncategorized"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "selling_price",
    header: "Selling Price",
    cell: ({ row }) => (
      <span className="font-bold text-slate-900">
        {formatCurrency(row.original.selling_price)}
      </span>
    ),
  },
  {
    accessorKey: "cost_price",
    header: "Cost Price",
    cell: ({ row }) => (
      <span className="text-slate-500">
        {formatCurrency(row.original.cost_price)}
      </span>
    ),
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => {
      const lowStock = row.original.stock <= row.original.min_stock_alert;
      return (
        <span
          className={`font-semibold ${
            lowStock ? "text-rose-600" : "text-slate-800"
          }`}
        >
          {row.original.stock}
          <span className="ml-1 text-xs text-slate-400">pcs</span>
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <Button size="sm" variant="secondary">
        <Pencil size={12} />
        Edit
      </Button>
    ),
  },
];
