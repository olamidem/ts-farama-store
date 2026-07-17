import { useMemo, useState } from "react";
import type { ProductUnit } from "../types/productUnit";
import type { Unit } from "../../../units/types/unit";
import type { Product } from "../../types/product";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit2, Archive, RotateCcw, ArrowRight, Barcode } from "lucide-react";
import DataTable from "../../../../components/ui/DataTable/DataTable";
import Pagination from "../../../../components/ui/pagination/Pagination";
import { cn } from "../../../../utils/cn";

interface ProductUnitsTableProps {
  productUnits: ProductUnit[];
  generalUnits: Unit[];
  product: Product;
  formatCurrency: (value: number) => string;
  onEdit: (pu: ProductUnit) => void;
  onToggleActive: (pu: ProductUnit) => void;
}

export const ProductUnitsTable = ({
  productUnits,
  generalUnits,
  product,
  formatCurrency,
  onEdit,
  onToggleActive,
}: ProductUnitsTableProps) => {
  // Resolve base unit symbol
  const baseUnit = generalUnits.find((u) => u.id === product.base_unit_id);
  const baseUnitSymbol = baseUnit?.symbol || "pcs";

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Paginated product units
  const paginatedUnits = useMemo(() => {
    const start = (page - 1) * pageSize;
    return productUnits.slice(start, start + pageSize);
  }, [productUnits, page, pageSize]);

  // Handle total count and reset page if out of bounds
  const totalItems = productUnits.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  if (page > totalPages && totalPages > 0) {
    setPage(totalPages);
  }

  // Column definitions for desktop viewports using our standard DataTable
  const columns = useMemo<ColumnDef<ProductUnit>[]>(
    () => [
      {
        accessorKey: "unit_id",
        header: "Unit",
        cell: ({ row }) => {
          const unit = generalUnits.find((u) => u.id === row.original.unit_id);
          const uomName = unit
            ? `${unit.name} (${unit.symbol})`
            : "Unknown Unit";
          const isActive = row.original.is_active;

          return (
            <div
              className={cn(
                "flex items-center gap-2 font-sans",
                !isActive && "opacity-60",
              )}
            >
              <div
                className={cn(
                  "h-8 w-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-extrabold text-[11px] uppercase tracking-wide border border-blue-100/50 shrink-0 shadow-inner",
                  !isActive && "bg-slate-100 text-slate-400 border-slate-200",
                )}
              >
                {unit?.symbol || "UN"}
              </div>
              <span
                className={cn(
                  "truncate max-w-37.5 text-sm font-bold text-slate-800",
                  !isActive && "text-slate-400 line-through font-medium",
                )}
                title={uomName}
              >
                {uomName}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "conversion_factor",
        header: "Conversion",
        cell: ({ row }) => {
          const unit = generalUnits.find((u) => u.id === row.original.unit_id);
          const unitSymbol = unit?.symbol || "unit";
          const isActive = row.original.is_active;

          return (
            <div
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium text-slate-600 font-sans",
                !isActive && "opacity-60",
              )}
            >
              <span>1 {unitSymbol}</span>
              <ArrowRight size={12} className="text-slate-400" />
              <span
                className={cn(
                  "font-bold font-mono text-blue-600 bg-blue-50/50 px-1.5 py-0.5 rounded text-xs",
                  !isActive && "text-slate-400 bg-slate-100",
                )}
              >
                {row.original.conversion_factor} {baseUnitSymbol}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "sku",
        header: "SKU",
        cell: ({ row }) => {
          const isActive = row.original.is_active;

          return (
            <div className={cn("font-sans text-sm", !isActive && "opacity-60")}>
              <span
                className={cn(
                  "font-mono text-xs font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200/50",
                  !isActive && "text-slate-400 border-slate-200 bg-slate-50",
                )}
              >
                {row.original.sku}
              </span>
              {row.original.barcode && (
                <div className="text-[11px] text-slate-500 flex items-center gap-0.5 font-mono mt-1">
                  <Barcode size={12} className="text-slate-400 shrink-0" />
                  <span>{row.original.barcode}</span>
                </div>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "cost_price",
        header: "Cost Price",
        cell: ({ row }) => {
          const isActive = row.original.is_active;
          return (
            <span
              className={cn(
                "font-semibold font-mono text-sm text-slate-600 block text-right",
                !isActive && "text-slate-400 opacity-60",
              )}
            >
              {formatCurrency(row.original.cost_price)}
            </span>
          );
        },
      },
      {
        accessorKey: "selling_price",
        header: "Selling Price",
        cell: ({ row }) => {
          const isActive = row.original.is_active;
          return (
            <span
              className={cn(
                "font-extrabold font-mono text-sm text-slate-800 block text-right",
                !isActive && "text-slate-400 line-through opacity-60",
              )}
            >
              {formatCurrency(row.original.selling_price)}
            </span>
          );
        },
      },
      {
        id: "profit",
        header: "Profit",
        cell: ({ row }) => {
          const profit = row.original.selling_price - row.original.cost_price;
          const isActive = row.original.is_active;
          return (
            <span
              className={cn(
                "font-bold font-mono text-sm block text-right",
                isActive
                  ? "text-emerald-600"
                  : "text-slate-400 line-through opacity-60",
              )}
            >
              {formatCurrency(profit)}
            </span>
          );
        },
      },
      {
        id: "margin",
        header: "Margin",
        cell: ({ row }) => {
          const profit = row.original.selling_price - row.original.cost_price;
          const margin =
            row.original.selling_price > 0
              ? (profit / row.original.selling_price) * 100
              : 0;
          const isActive = row.original.is_active;

          return (
            <div className="text-center font-sans">
              <span
                className={cn(
                  "inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-bold",
                  !isActive
                    ? "bg-slate-100 text-slate-400 border border-slate-200 opacity-60"
                    : margin > 20
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      : margin > 5
                        ? "bg-amber-50 text-amber-600 border border-amber-100"
                        : "bg-rose-50 text-rose-600 border border-rose-100",
                )}
              >
                {margin.toFixed(2)}%
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "is_active",
        header: "Status",
        cell: ({ row }) => {
          const isActive = row.original.is_active;
          return (
            <div className="font-sans text-center">
              <span
                className={cn(
                  "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold",
                  isActive
                    ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                    : "bg-slate-100 border border-slate-200 text-slate-600",
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    isActive ? "bg-emerald-500" : "bg-slate-400",
                  )}
                />
                {isActive ? "Active" : "Archived"}
              </span>
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          const pu = row.original;
          return (
            <div className="flex items-center justify-end gap-1.5 font-sans">
              <button
                type="button"
                onClick={() => onEdit(pu)}
                className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/10 transition shadow-sm cursor-pointer"
                title="Edit Unit"
              >
                <Edit2 size={13} />
              </button>
              <button
                type="button"
                onClick={() => onToggleActive(pu)}
                className={cn(
                  "p-1.5 rounded-lg border bg-white transition shadow-sm cursor-pointer",
                  pu.is_active
                    ? "border-slate-200 text-amber-600 hover:text-amber-700 hover:border-amber-200 hover:bg-amber-50/10"
                    : "border-slate-200 text-emerald-600 hover:text-emerald-700 hover:border-emerald-200 hover:bg-emerald-50/10",
                )}
                title={pu.is_active ? "Archive Unit" : "Restore Unit"}
              >
                {pu.is_active ? <Archive size={13} /> : <RotateCcw size={13} />}
              </button>
            </div>
          );
        },
      },
    ],
    [generalUnits, baseUnitSymbol, formatCurrency, onEdit, onToggleActive],
  );

  return (
    <div
      id="product-units-table-container"
      className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm font-sans"
    >
      {/* Table Header Section */}
      <div className="p-4 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
          Existing Selling Units
        </h4>
        <span className="text-[10px] text-slate-400 font-semibold">
          {productUnits.length} variants configured
        </span>
      </div>

      {/* Desktop view using our core DataTable */}
      <div className="hidden md:block">
        <DataTable
          data={paginatedUnits}
          columns={columns}
          isLoading={false}
          getRowId={(pu: ProductUnit) => pu.id}
          getRowClassName={(pu) =>
            !pu.is_active
              ? "bg-slate-50/60 text-slate-400/80 italic opacity-75"
              : ""
          }
        />
      </div>

      {/* Mobile viewport view: responsive card-based layout */}
      <div className="block md:hidden p-4 space-y-4">
        {paginatedUnits.map((pu) => {
          const unit = generalUnits.find((u) => u.id === pu.unit_id);
          const uomName = unit
            ? `${unit.name} (${unit.symbol})`
            : "Unknown Unit";
          const profit = pu.selling_price - pu.cost_price;
          const margin =
            pu.selling_price > 0 ? (profit / pu.selling_price) * 100 : 0;
          const unitSymbol = unit?.symbol || "unit";

          return (
            <div
              key={pu.id}
              className={cn(
                "bg-white border rounded-xl p-4 shadow-xs space-y-3 transition-all duration-150",
                pu.is_active
                  ? "border-slate-200"
                  : "border-slate-100 bg-slate-50/50 opacity-75",
              )}
            >
              {/* Header: Unit, SKU and Status */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={cn(
                      "h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-extrabold text-xs uppercase tracking-wide border border-blue-100/50 shrink-0",
                      !pu.is_active &&
                        "bg-slate-100 text-slate-400 border-slate-200",
                    )}
                  >
                    {unitSymbol}
                  </div>
                  <div className="min-w-0">
                    <h5
                      className={cn(
                        "font-bold text-slate-800 text-xs leading-snug truncate",
                        !pu.is_active && "text-slate-400 line-through",
                      )}
                    >
                      {uomName}
                    </h5>
                    <div className="flex flex-wrap items-center gap-1 text-[10px] text-slate-500 mt-0.5 font-mono">
                      <span>SKU: {pu.sku}</span>
                      {pu.barcode && (
                        <>
                          <span className="text-slate-300">•</span>
                          <span className="flex items-center gap-0.5 text-slate-400">
                            <Barcode size={10} />
                            {pu.barcode}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0",
                    pu.is_active
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      : "bg-slate-100 text-slate-600 border border-slate-200",
                  )}
                >
                  <span
                    className={cn(
                      "h-1 w-1 rounded-full",
                      pu.is_active ? "bg-emerald-500" : "bg-slate-400",
                    )}
                  />
                  {pu.is_active ? "Active" : "Archived"}
                </span>
              </div>

              {/* Data panel: Conversion Factor, Costs, Margin */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50/50 p-3 rounded-lg border border-slate-100/50 text-xs">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                    Conversion
                  </span>
                  <div className="flex items-center gap-1 font-semibold text-slate-700">
                    <span>1 {unitSymbol}</span>
                    <ArrowRight size={10} className="text-slate-400" />
                    <span className="text-blue-600 font-bold font-mono">
                      {pu.conversion_factor} {baseUnitSymbol}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                    Margin
                  </span>
                  <div>
                    <span
                      className={cn(
                        "inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-extrabold",
                        !pu.is_active
                          ? "bg-slate-100 text-slate-400 border border-slate-200 opacity-60"
                          : margin > 20
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            : margin > 5
                              ? "bg-amber-50 text-amber-600 border border-amber-100"
                              : "bg-rose-50 text-rose-600 border border-rose-100",
                      )}
                    >
                      {margin.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                    Cost Price
                  </span>
                  <span className="font-bold font-mono text-slate-600">
                    {formatCurrency(pu.cost_price)}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                    Selling Price
                  </span>
                  <span
                    className={cn(
                      "font-extrabold font-mono text-slate-800",
                      !pu.is_active && "text-slate-400 line-through",
                    )}
                  >
                    {formatCurrency(pu.selling_price)}
                  </span>
                </div>
              </div>

              {/* Mobile Actions: touch target aligned h-9 */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onEdit(pu)}
                  className="flex-1 h-9 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-800 flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer shadow-xs transition"
                >
                  <Edit2 size={13} />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => onToggleActive(pu)}
                  className={cn(
                    "flex-1 h-9 rounded-lg border flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer shadow-xs transition",
                    pu.is_active
                      ? "border-amber-200 bg-amber-50/20 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
                      : "border-emerald-200 bg-emerald-50/20 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800",
                  )}
                >
                  {pu.is_active ? (
                    <>
                      <Archive size={13} />
                      <span>Archive</span>
                    </>
                  ) : (
                    <>
                      <RotateCcw size={13} />
                      <span>Restore</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalItems > 10 && (
        <div className="p-4 border-t border-slate-100 bg-slate-50/20">
          <Pagination
            page={page}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={setPage}
            onPageSizeChange={(sz: number) => {
              setPageSize(sz);
              setPage(1);
            }}
            itemName="selling units"
          />
        </div>
      )}
    </div>
  );
};
