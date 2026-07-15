import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "../types/product";

interface ProductDetailsPrimaryCardProps {
  product: Product;
  categoryName?: string;
  subcategoryName?: string;
}

export const ProductDetailsPrimaryCard = ({
  product,
  categoryName = "General",
  subcategoryName = "Soft Drinks",
}: ProductDetailsPrimaryCardProps) => {
  const [copiedSku, setCopiedSku] = useState(false);
  const [copiedBarcode, setCopiedBarcode] = useState(false);

  const firstLetter = product.name
    ? product.name.trim().charAt(0).toUpperCase()
    : "P";

  // Generate a premium distinct color based on product name hash
  const getDisplayColor = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
      "from-emerald-500 to-teal-600 text-emerald-100",
      "from-blue-500 to-indigo-600 text-blue-100",
      "from-violet-500 to-purple-600 text-violet-100",
      "from-amber-500 to-orange-600 text-amber-100",
      "from-rose-500 to-pink-600 text-rose-100",
      "from-sky-500 to-cyan-600 text-sky-100",
    ];
    return colors[Math.abs(hash) % colors.length];
  };

  const gradientClass = getDisplayColor(product.name);

  const handleCopy = (text: string, type: "sku" | "barcode") => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success(`${type === "sku" ? "SKU" : "Barcode"} copied to clipboard`);
    if (type === "sku") {
      setCopiedSku(true);
      setTimeout(() => setCopiedSku(false), 2000);
    } else {
      setCopiedBarcode(true);
      setTimeout(() => setCopiedBarcode(false), 2000);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Visual Avatar Block */}
      <div className="flex-shrink-0 flex items-center justify-center">
        <div className="relative h-44 w-44 rounded-2xl border border-slate-100 bg-slate-50 p-2 flex items-center justify-center shadow-inner overflow-hidden">
          <div
            className={`w-full h-full rounded-xl bg-gradient-to-br ${gradientClass} flex flex-col items-center justify-center font-bold text-5xl select-none shadow-sm`}
          >
            {firstLetter}
            <span className="text-[10px] tracking-widest font-bold opacity-70 mt-1 uppercase">
              {product.sku ? product.sku.slice(0, 4) : "PROD"}
            </span>
          </div>
        </div>
      </div>

      {/* Info Block */}
      <div className="flex-1 min-w-0 space-y-4">
        {/* Name and Status badge */}
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-none truncate">
            {product.name}
          </h2>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold leading-none ${
              product.is_active
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-slate-50 text-slate-600 border border-slate-200"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                product.is_active ? "bg-emerald-500" : "bg-slate-400"
              }`}
            />
            {product.is_active ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Category & Subcategory pills */}
        <div className="flex flex-wrap gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700">
            {categoryName}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600">
            {subcategoryName}
          </span>
        </div>

        <div className="h-px bg-slate-100 my-2" />

        {/* SKU and Barcode grids */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              SKU
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-semibold text-sm text-slate-800 font-mono">
                {product.sku || "N/A"}
              </span>
              {product.sku && (
                <button
                  onClick={() => handleCopy(product.sku, "sku")}
                  className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
                  title="Copy SKU"
                >
                  {copiedSku ? (
                    <Check size={14} className="text-emerald-500" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              )}
            </div>
          </div>

          <div>
            <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              Barcode
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-semibold text-sm text-slate-800 font-mono">
                {product.barcode || "6151234567890"}
              </span>
              <button
                onClick={() =>
                  handleCopy(product.barcode || "6151234567890", "barcode")
                }
                className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
                title="Copy Barcode"
              >
                {copiedBarcode ? (
                  <Check size={14} className="text-emerald-500" />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1 pt-1">
          <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            Description
          </span>
          <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
            {product.description || "No description provided."}
          </p>
        </div>
      </div>
    </div>
  );
};
