import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import type { Category } from "../../categories/types/category";
import type { Product } from "../types/product";
import { formatCurrency } from "../../../utils/format";
import { selectionColumn } from "../../../components/ui/DataTable/SelectionColumn";


interface ProductColumnsProps {
  categories: Category[];
  onEdit: (product: Product) => void;
  onDeactivate: (product: Product) => void;
}

export const productColumns = ({
  categories,
  onEdit,
  onDeactivate,
}: ProductColumnsProps): ColumnDef<Product>[] => [
  selectionColumn<Product>(),
  {
    accessorKey: "barcode",
    header: "Barcode",
    cell: ({ row }) => (
      <span className="rounded-md font-mono text-xs font-semibold text-slate-600">
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
            <Badge
              variant="danger"
              size="sm"
              className="inline-block mt-0.5 px-1.5 py-0.2 bg-rose-100 text-rose-700 font-bold rounded-sm text-[8px] uppercase tracking-wider"
            >
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
        <Badge
          variant="info"
          size="sm"
          className="text-slate-800 rounded text-[11px]"
        >
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
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.is_active ? "success" : "danger"}>
        {row.original.is_active ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex gap-2">
          <Button
            className="text-slate-700 text-[11px]"
            size="sm"
            variant="secondary"
            onClick={() => onEdit(product)}
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>

          <Button
            size="sm"
            variant="danger"
            onClick={() => onDeactivate(product)}
          >
            <Trash2 className="h-4 w-4" />
            Deactivate
          </Button>
        </div>
      );
    },
  },
];
