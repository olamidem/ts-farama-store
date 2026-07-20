import { ArrowLeft, Pencil, Barcode, Trash2, ShoppingCart } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface ProductDetailsHeaderProps {
  productId: string;
  onEdit: () => void;
  onArchive: () => void;
  onPrintBarcode: () => void;
}

export const ProductDetailsHeader = ({
  productId,
  onEdit,
  onArchive,
  onPrintBarcode,
}: ProductDetailsHeaderProps) => {
  return (
    <div className="space-y-4">
      {/* Breadcrumb row */}
      <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
        <Link to="/products" className="hover:text-slate-800 transition">
          Products
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-800 font-bold">Product Details</span>
      </div>

      {/* Main header actions row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Back button */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-slate-200 bg-white text-base font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition shadow-sm"
        >
          <ArrowLeft size={16} />
          <span>Back to Products</span>
        </Link>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/purchases"
            search={{ productId } as Record<string, string>}
            className="flex items-center gap-1.5 h-10 px-4 rounded-xl border border-transparent bg-emerald-600 text-base font-bold text-white hover:bg-emerald-700 transition shadow-sm"
          >
            <ShoppingCart size={15} />
            <span>Reorder / Purchase</span>
          </Link>

          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 h-10 px-4 rounded-xl border border-slate-200 bg-white text-base font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition shadow-sm"
          >
            <Pencil size={15} className="text-slate-500" />
            <span>Edit Product</span>
          </button>

          <button
            onClick={onPrintBarcode}
            className="flex items-center gap-1.5 h-10 px-4 rounded-xl border border-slate-200 bg-white text-base font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition shadow-sm"
          >
            <Barcode size={15} className="text-slate-500" />
            <span>Print Barcode Label</span>
          </button>

          <button
            onClick={onArchive}
            className="flex items-center gap-1.5 h-10 px-4 rounded-xl border border-rose-200 bg-rose-50/10 text-base font-bold text-rose-600 hover:bg-rose-50 transition shadow-sm"
          >
            <Trash2 size={15} />
            <span>Archive Product</span>
          </button>
        </div>
      </div>
    </div>
  );
};

