import type { ColumnDef } from "@tanstack/react-table";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import type { Category } from "../../categories/types/category";
import type { Product } from "../types/product";
import { formatCurrency } from "../../../utils/format";
import { selectionColumn } from "../../../components/ui/DataTable/SelectionColumn";
import SortableHeader from "../../../components/ui/DataTable/SortableHeader";

interface ProductColumnsProps {
  categories: Category[];
  onEdit: (product: Product) => void;
  onDeactivate: (product: Product) => void;
  onRestore: (product: Product) => void;
  sortBy: "created_at" | "name" | "selling_price" | "stock";
  ascending: boolean;
  onSort: (column: "created_at" | "name" | "selling_price" | "stock") => void;
}

export const productColumns = ({
  categories,
  onEdit,
  onDeactivate,
  onRestore,
  sortBy,
  ascending,
  onSort,
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
    header: () => (
      <SortableHeader
        label="Product Name"
        column="name"
        currentSort={sortBy}
        ascending={ascending}
        onSort={onSort}
      />
    ),
    cell: ({ row }) => {
      const product = row.original;
      const isLowStock = product.stock <= product.min_stock_alert;
      const firstLetter = product.name
        ? product.name.charAt(0).toUpperCase()
        : "P";
      return (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-xs font-black text-slate-600 border border-slate-200 uppercase shrink-0">
            {firstLetter}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-slate-900 truncate">
              {product.name}
            </span>
            {isLowStock && (
              <span className="text-[9px] font-black tracking-wider text-rose-600 uppercase mt-0.5">
                ⚠️ Below Alert Limit
              </span>
            )}
          </div>
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
    header: () => (
      <SortableHeader
        label="Selling Price"
        column="selling_price"
        currentSort={sortBy}
        ascending={ascending}
        onSort={onSort}
      />
    ),
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
    header: () => (
      <SortableHeader
        label="Stock"
        column="stock"
        currentSort={sortBy}
        ascending={ascending}
        onSort={onSort}
      />
    ),
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

      if (product.is_active) {
        return (
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onEdit(product)}
            >
              Edit
            </Button>

            <Button
              size="sm"
              variant="danger"
              onClick={() => onDeactivate(product)}
            >
              Deactivate
            </Button>
          </div>
        );
      }

      return (
        <Button size="sm" variant="primary" onClick={() => onRestore(product)}>
          Restore
        </Button>
      );
    },
  },
];
