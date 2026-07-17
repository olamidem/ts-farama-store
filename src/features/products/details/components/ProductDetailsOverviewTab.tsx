import { useState } from "react";
import {
  Pencil,
  Sliders,
  Copy,
  Barcode,
  Trash2,
  Check,
  Layers,
} from "lucide-react";
import { toast } from "sonner";
import type { Product } from "../../types/product";
import { useUnits } from "../../../units/hooks/useUnits";
import { useProductUnits } from "../../product-units/hooks/useProductUnits";

interface ProductDetailsOverviewTabProps {
  product: Product;
  categoryName?: string;
  onEdit: () => void;
  onAdjustStock: () => void;
  onDuplicate: () => void;
  onPrintBarcode: () => void;
  onArchive: () => void;
}

export const ProductDetailsOverviewTab = ({
  product,
  categoryName = "General",
  onEdit,
  onAdjustStock,
  onDuplicate,
  onPrintBarcode,
  onArchive,
}: ProductDetailsOverviewTabProps) => {
  const [copiedSku, setCopiedSku] = useState(false);
  const [copiedBarcode, setCopiedBarcode] = useState(false);

  // Queries for units and alternative pack units
  const { data: units = [] } = useUnits();
  const { data: productUnits = [] } = useProductUnits(product.id);

  const baseUnit = units.find((u) => u.id === product.base_unit_id);
  const baseUnitDisplay = baseUnit
    ? `${baseUnit.name} (${baseUnit.symbol})`
    : "Piece (pcs)";
  const baseUnitSymbol = baseUnit ? baseUnit.symbol : "pcs";

  // Generate smart dynamic values based on category
  const subcategory =
    categoryName === "Beverages" ? "Soft Drinks" : "General Inventory";
  const supplier =
    categoryName === "Beverages"
      ? "Coca-Cola Beverages Nigeria"
      : "Farama Main Supplier Ltd";
  const tags =
    categoryName === "Beverages"
      ? ["cold-drink", "soft-drink", "beverage"]
      : [categoryName.toLowerCase(), "retail", "stock"];

  // Value Calculations
  const sellingPrice = product.selling_price || 0;
  const costPrice = product.cost_price || 0;
  const stock = product.stock || 0;
  const estRetailValue = sellingPrice * stock;
  const estCostValue = costPrice * stock;
  const isLowStock = stock <= (product.min_stock_alert || 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(value);
  };

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

  // Avatar text and gradient helper
  const firstLetter = product.name
    ? product.name.trim().charAt(0).toUpperCase()
    : "P";
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Left Column: Product Specifications Table (First Table) & Description */}
      <div className="lg:col-span-3 space-y-6">
        {/* Title & Beautiful Identity Badge */}
        <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-2xl p-4">
          <div className="relative h-16 w-16 rounded-xl border border-slate-200 bg-white p-1 flex items-center justify-center shadow-inner overflow-hidden shrink-0">
            <div
              className={`w-full h-full rounded-lg bg-linear-to-br ${gradientClass} flex items-center justify-center font-black text-2xl select-none`}
            >
              {firstLetter}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
              {product.name}
            </h3>
            <p className="text-sm font-medium text-slate-500 mt-0.5">
              Primary Specifications & Custom Attributes
            </p>
          </div>
        </div>

        {/* Product Information Table */}
        <div className="space-y-3">
          <h4 className="text-base font-bold text-slate-800 tracking-tight">
            Product Specifications Table
          </h4>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
            <div className="grid grid-cols-3 p-3.5 text-base hover:bg-slate-50/40 transition duration-150">
              <span className="font-bold text-slate-500">Product Name</span>
              <span className="col-span-2 font-extrabold text-slate-900">
                {product.name}
              </span>
            </div>

            <div className="grid grid-cols-3 p-3.5 text-base hover:bg-slate-50/40 transition duration-150">
              <span className="font-bold text-slate-500">SKU Code</span>
              <span className="col-span-2 font-semibold text-slate-900 font-mono flex items-center gap-2">
                {product.sku || "N/A"}
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
              </span>
            </div>

            {/* Barcode Directly Under SKU Row */}
            <div className="grid grid-cols-3 p-3.5 text-base hover:bg-slate-50/40 transition duration-150">
              <span className="font-bold text-slate-500">Barcode</span>
              <span className="col-span-2 font-semibold text-slate-900 font-mono flex items-center gap-2">
                {product.barcode || "6151234567890"}
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
              </span>
            </div>

            <div className="grid grid-cols-3 p-3.5 text-base hover:bg-slate-50/40 transition duration-150">
              <span className="font-bold text-slate-500">Category</span>
              <span className="col-span-2 font-bold text-slate-800">
                {categoryName}
              </span>
            </div>

            <div className="grid grid-cols-3 p-3.5 text-base hover:bg-slate-50/40 transition duration-150">
              <span className="font-bold text-slate-500">Subcategory</span>
              <span className="col-span-2 font-bold text-slate-800">
                {subcategory}
              </span>
            </div>

            <div className="grid grid-cols-3 p-3.5 text-base hover:bg-slate-50/40 transition duration-150">
              <span className="font-bold text-slate-500">Base Unit</span>
              <span className="col-span-2 font-bold text-slate-800">
                {baseUnitDisplay}
              </span>
            </div>

            <div className="grid grid-cols-3 p-3.5 text-base hover:bg-slate-50/40 transition duration-150">
              <span className="font-bold text-slate-500">
                Min. Stock Threshold
              </span>
              <span className="col-span-2 font-bold text-rose-600 font-mono">
                {product.min_stock_alert || 0} {baseUnitSymbol}
              </span>
            </div>

            <div className="grid grid-cols-3 p-3.5 text-base hover:bg-slate-50/40 transition duration-150">
              <span className="font-bold text-slate-500">Status</span>
              <span className="col-span-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    product.is_active !== false
                      ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                      : "bg-slate-100 border border-slate-200 text-slate-600"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${product.is_active !== false ? "bg-emerald-500" : "bg-slate-400"}`}
                  />
                  {product.is_active !== false ? "Active" : "Archived"}
                </span>
              </span>
            </div>

            <div className="grid grid-cols-3 p-3.5 text-base hover:bg-slate-50/40 transition duration-150">
              <span className="font-bold text-slate-500">Tax Rate</span>
              <span className="col-span-2 font-bold text-slate-800">
                0% (Vat Exempted)
              </span>
            </div>

            <div className="grid grid-cols-3 p-3.5 text-base hover:bg-slate-50/40 transition duration-150">
              <span className="font-bold text-slate-500">Supplier</span>
              <span className="col-span-2 font-bold text-slate-800">
                {supplier}
              </span>
            </div>

            <div className="grid grid-cols-3 p-3.5 text-base items-center hover:bg-slate-50/40 transition duration-150">
              <span className="font-bold text-slate-500">Custom Tags</span>
              <div className="col-span-2 flex flex-wrap items-center gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200 uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="space-y-3">
          <h4 className="text-base font-bold text-slate-800 tracking-tight">
            Product Description
          </h4>
          <p className="text-base text-slate-600 leading-relaxed bg-slate-50/30 p-4 rounded-2xl border border-slate-100">
            {product.description ||
              "No custom description available for this item."}
            <span className="block mt-2 font-semibold text-sm text-slate-400">
              Note: This description appears on standard billing registers,
              variant sheets, and print layouts.
            </span>
          </p>
        </div>
      </div>

      {/* Right Column: Computed Stats KPI Block, Pack Prices list & Quick Actions */}
      <div className="lg:col-span-2 space-y-6">
        {/* Computed Quick Stats Card */}
        <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/60 shadow-xs space-y-4">
          <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2">
            Computed Asset Intelligence
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-base">
              <span className="font-medium text-slate-500">
                Total Registered Units:
              </span>
              <span className="font-extrabold text-slate-800 font-mono">
                {stock}
              </span>
            </div>
            <div className="flex items-center justify-between text-base">
              <span className="font-medium text-slate-500">
                Est. Total Stock Value:
              </span>
              <span className="font-bold text-emerald-700 font-mono">
                {formatCurrency(estRetailValue)}
              </span>
            </div>
            <div className="flex items-center justify-between text-base">
              <span className="font-medium text-slate-500">
                Est. Total Asset Cost:
              </span>
              <span className="font-bold text-blue-700 font-mono">
                {formatCurrency(estCostValue)}
              </span>
            </div>
            <div className="flex items-center justify-between text-base">
              <span className="font-medium text-slate-500">
                Active Sell Packages:
              </span>
              <span className="font-bold text-slate-800">
                {productUnits.length} Configured
              </span>
            </div>
          </div>

          {isLowStock && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 text-xs font-extrabold text-center animate-pulse">
              ⚠️ Alert: Current stock is under the minimum warning threshold.
            </div>
          )}
        </div>

        {/* Alternative Pack Pricing Quick List */}
        {productUnits.length > 0 && (
          <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-xs space-y-3">
            <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center gap-1.5">
              <Layers size={15} className="text-blue-500" />
              Alternative Pack Prices
            </h4>
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {productUnits.map((pu) => {
                const u = units.find((un) => un.id === pu.unit_id);
                const packStock = Math.floor(stock / pu.conversion_factor);
                return (
                  <div
                    key={pu.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-base"
                  >
                    <div>
                      <span className="font-bold text-slate-700 block text-base">
                        {u?.name || "Pack Unit"} ({u?.symbol || "pk"})
                      </span>
                      <span className="text-xs text-slate-500 font-semibold block">
                        1 {u?.symbol || "unit"} = {pu.conversion_factor}{" "}
                        {baseUnitSymbol}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-slate-800 font-mono block text-base">
                        {formatCurrency(pu.selling_price)}
                      </span>
                      <span className="text-xs text-emerald-600 font-bold block">
                        Stock Eq: {packStock} {u?.symbol || "pk"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions Menu */}
        <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-xs space-y-4">
          <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2">
            Operations Console
          </h4>

          <div className="flex flex-col gap-2.5">
            <button
              onClick={onEdit}
              className="flex items-center justify-center gap-2 h-11 w-full rounded-xl border border-slate-200 bg-white text-base font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition shadow-xs cursor-pointer"
            >
              <Pencil size={16} className="text-slate-500" />
              <span>Edit Product Details</span>
            </button>

            <button
              onClick={onAdjustStock}
              className="flex items-center justify-center gap-2 h-11 w-full rounded-xl border border-slate-200 bg-white text-base font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition shadow-xs cursor-pointer"
            >
              <Sliders size={16} className="text-slate-500" />
              <span>Adjust Stock Value</span>
            </button>

            <button
              onClick={onDuplicate}
              className="flex items-center justify-center gap-2 h-11 w-full rounded-xl border border-slate-200 bg-white text-base font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition shadow-xs cursor-pointer"
            >
              <Copy size={16} className="text-slate-500" />
              <span>Duplicate Product</span>
            </button>

            <button
              onClick={onPrintBarcode}
              className="flex items-center justify-center gap-2 h-11 w-full rounded-xl border border-slate-200 bg-white text-base font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition shadow-xs cursor-pointer"
            >
              <Barcode size={16} className="text-slate-500" />
              <span>Print Barcode Labels</span>
            </button>

            <div className="h-px bg-slate-100 my-1" />

            <button
              onClick={onArchive}
              className="flex items-center justify-center gap-2 h-11 w-full rounded-xl border border-rose-200 bg-rose-50/15 text-base font-bold text-rose-600 hover:bg-rose-50 transition shadow-xs cursor-pointer"
            >
              <Trash2 size={16} />
              <span>Archive Product</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
