import { ArrowLeft, Pencil, Barcode, Trash2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface ProductDetailsHeaderProps {
  onEdit: () => void;
  onArchive: () => void;
  onPrintBarcode: () => void;
}

export const ProductDetailsHeader = ({
  onEdit,
  onArchive,
  onPrintBarcode,
}: ProductDetailsHeaderProps) => {
  return (
    <div className="space-y-4">
      {/* Breadcrumb row */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <Link to="/products" className="hover:text-slate-800 transition">
          Products
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-800 font-semibold">Product Details</span>
      </div>

      {/* Main header actions row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Back button */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition shadow-sm"
        >
          <ArrowLeft size={16} />
          <span>Back to Products</span>
        </Link>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 h-10 px-4 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition shadow-sm"
          >
            <Pencil size={15} className="text-slate-500" />
            <span>Edit Product</span>
          </button>

          <button
            onClick={onPrintBarcode}
            className="flex items-center gap-1.5 h-10 px-4 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition shadow-sm"
          >
            <Barcode size={15} className="text-slate-500" />
            <span>Print Barcode Label</span>
          </button>

          <button
            onClick={onArchive}
            className="flex items-center gap-1.5 h-10 px-4 rounded-xl border border-rose-200 bg-rose-50/10 text-sm font-bold text-rose-600 hover:bg-rose-50 transition shadow-sm"
          >
            <Trash2 size={15} />
            <span>Archive Product</span>
          </button>
        </div>
      </div>
    </div>
  );
};
