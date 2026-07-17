import { useState } from "react";
import {
  Copy,
  Check,
  Tag,
  Landmark,
  TrendingUp,
  Package,
  Layers,
} from "lucide-react";
import { toast } from "sonner";
import type { Product } from "../../types/product";
import { useProductUnits } from "../../product-units/hooks/useProductUnits";
import { useUnits } from "../../../units/hooks/useUnits";

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

  // Queries for alternative pack pricing
  const { data: productUnits = [] } = useProductUnits(product.id);
  const { data: generalUnits = [] } = useUnits();

  // Price calculations
  const sellingPrice = product.selling_price || 0;
  const costPrice = product.cost_price || 0;
  const profit = sellingPrice - costPrice;
  const profitMargin = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;
  const stock = product.stock || 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(value);
  };

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

  const baseUnit = generalUnits.find((gu) => gu.id === product.base_unit_id);
  const baseUnitDisplay = baseUnit
    ? `${baseUnit.name} (${baseUnit.symbol})`
    : "Piece (pcs)";
  const variantCount = productUnits.length;
  const stockAlertLimit = product.min_stock_alert || 0;
  const estRetailValue = sellingPrice * stock;
  const estCostValue = costPrice * stock;
  const isLowStock = stock <= stockAlertLimit;

  return (
    <div
      id="product-details-primary-card"
      className="flex flex-col gap-6 p-6 rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      {/* Top Section with Image, Main Info and Calculated Overview Panel */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sub-Group: Avatar and Identification Info */}
        <div className="flex flex-col md:flex-row gap-6 flex-1 min-w-0">
          {/* Visual Avatar Block */}
          <div className="shrink-0 flex items-center justify-center">
            <div className="relative h-48 w-48 rounded-2xl border border-slate-100 bg-slate-50 p-2 flex items-center justify-center shadow-inner overflow-hidden">
              <div
                className={`w-full h-full rounded-xl bg-linear-to-br ${gradientClass} flex flex-col items-center justify-center font-bold text-6xl select-none shadow-sm`}
              >
                {firstLetter}
                <span className="text-sm tracking-widest font-bold opacity-70 mt-1.5 uppercase">
                  {product.sku ? product.sku.slice(0, 4) : "PROD"}
                </span>
              </div>
            </div>
          </div>

          {/* Info Block */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Name and Status badge */}
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none truncate">
                {product.name}
              </h2>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-base font-bold leading-none ${
                  product.is_active
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-slate-50 text-slate-600 border border-slate-200"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    product.is_active ? "bg-emerald-500" : "bg-slate-400"
                  }`}
                />
                {product.is_active ? "Active" : "Inactive"}
              </span>
            </div>

            {/* Category & Subcategory pills */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-base font-bold text-indigo-700">
                {categoryName}
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-base font-bold text-slate-600">
                {subcategoryName}
              </span>
            </div>

            <div className="h-px bg-slate-100 my-2" />

            {/* SKU and Barcode grids */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="block text-sm font-bold text-slate-500 tracking-wider uppercase">
                  SKU
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-semibold text-lg text-slate-800 font-mono">
                    {product.sku || "N/A"}
                  </span>
                  {product.sku && (
                    <button
                      onClick={() => handleCopy(product.sku, "sku")}
                      className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                      title="Copy SKU"
                    >
                      {copiedSku ? (
                        <Check size={16} className="text-emerald-500" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div>
                <span className="block text-sm font-bold text-slate-500 tracking-wider uppercase">
                  Barcode
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-semibold text-lg text-slate-800 font-mono">
                    {product.barcode || "6151234567890"}
                  </span>
                  <button
                    onClick={() =>
                      handleCopy(product.barcode || "6151234567890", "barcode")
                    }
                    className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                    title="Copy Barcode"
                  >
                    {copiedBarcode ? (
                      <Check size={16} className="text-emerald-500" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5 pt-1">
              <span className="block text-sm font-bold text-slate-500 tracking-wider uppercase">
                Description
              </span>
              <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                {product.description || "No description provided."}
              </p>
            </div>
          </div>
        </div>

        {/* Right Sub-Group: Computed Smart Overview Panel */}
        <div className="lg:w-96 w-full shrink-0 bg-slate-50/80 border border-slate-100 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2 mb-3">
              Computed Quick Stats
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-500">Base Unit:</span>
                <span className="font-bold text-slate-800">
                  {baseUnitDisplay}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-500">
                  Selling Units Count:
                </span>
                <span className="font-bold text-slate-800">
                  {variantCount} Configured
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-500">
                  Min Alert Threshold:
                </span>
                <span
                  className={`font-mono font-bold ${isLowStock ? "text-rose-600" : "text-slate-700"}`}
                >
                  {stockAlertLimit} units
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-500">
                  Est. Assets Retail Value:
                </span>
                <span className="font-mono font-bold text-emerald-700">
                  {formatCurrency(estRetailValue)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-500">
                  Est. Assets Cost Cost:
                </span>
                <span className="font-mono font-bold text-blue-700">
                  {formatCurrency(estCostValue)}
                </span>
              </div>
            </div>
          </div>

          {isLowStock && (
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 text-xs font-extrabold text-center animate-pulse">
              ⚠️ Alert: Current Stock is below threshold limit!
            </div>
          )}
        </div>
      </div>

      {/* Pricing, Profit, and Stock Sub-grid (Dashboard style) */}
      <div className="mt-2 border-t border-slate-100 pt-6">
        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 px-1">
          Base Unit Financials & Inventory
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Cost Price */}
          <div className="bg-slate-50/60 hover:bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-3 transition">
            <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 shrink-0">
              <Landmark size={18} />
            </div>
            <div>
              <span className="block text-sm font-bold text-slate-500 uppercase tracking-wide">
                Cost Price
              </span>
              <span className="text-lg font-extrabold text-slate-800 font-mono block mt-0.5">
                {formatCurrency(costPrice)}
              </span>
            </div>
          </div>

          {/* Selling Price */}
          <div className="bg-slate-50/60 hover:bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-3 transition">
            <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
              <Tag size={18} />
            </div>
            <div>
              <span className="block text-sm font-bold text-slate-500 uppercase tracking-wide">
                Selling Price
              </span>
              <span className="text-lg font-extrabold text-slate-800 font-mono block mt-0.5">
                {formatCurrency(sellingPrice)}
              </span>
            </div>
          </div>

          {/* Profit */}
          <div className="bg-slate-50/60 hover:bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-3 transition">
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600 shrink-0">
              <TrendingUp size={18} />
            </div>
            <div>
              <span className="block text-sm font-bold text-slate-500 uppercase tracking-wide">
                Profit
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-lg font-extrabold text-slate-800 font-mono">
                  {formatCurrency(profit)}
                </span>
                <span className="text-[13px] font-bold text-amber-600">
                  ({profitMargin.toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>

          {/* Current Stock */}
          <div className="bg-slate-50/60 hover:bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-3 transition">
            <div className="p-2.5 rounded-lg bg-violet-50 text-violet-600 shrink-0">
              <Package size={18} />
            </div>
            <div>
              <span className="block text-sm font-bold text-slate-500 uppercase tracking-wide">
                Current Stock
              </span>
              <span className="text-lg font-extrabold text-slate-800 block mt-0.5">
                {stock} units
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Alternative Pack Pricing */}
      {productUnits.length > 0 && (
        <div className="mt-2 border-t border-slate-100 pt-6">
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 px-1 flex items-center gap-1.5">
            <Layers size={15} className="text-blue-500" />
            Alternative Pack Pricing
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {productUnits.map((pu) => {
              const u = generalUnits.find((gu) => gu.id === pu.unit_id);
              const baseUnit = generalUnits.find(
                (gu) => gu.id === product.base_unit_id,
              );
              const baseUnitSymbol = baseUnit?.symbol || "pcs";
              const packStock = Math.floor(
                (product.stock || 0) / pu.conversion_factor,
              );

              return (
                <div
                  key={pu.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/70 border border-slate-100 transition text-base"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-700 block text-base">
                      {u?.name || "Pack Unit"} ({u?.symbol || "pk"})
                    </span>
                    <span className="text-sm text-slate-500 font-medium block">
                      1 {u?.symbol || "unit"} = {pu.conversion_factor}{" "}
                      {baseUnitSymbol}
                    </span>
                  </div>
                  <div className="text-right space-y-0.5">
                    <span className="font-extrabold text-slate-800 font-mono block text-base">
                      {formatCurrency(pu.selling_price)}
                    </span>
                    <span className="text-sm text-emerald-600 font-bold block">
                      Stock Eq: {packStock} {u?.symbol || "pk"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
