import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { cn } from "../../../utils/cn";
import { useProductUnits } from "../../products/product-units/hooks/useProductUnits";
import type { ProductStockOverviewItem, StockAdjustmentInput, InventorySettings } from "../types/inventory";

interface ProductUnitItem {
  id: string;
  conversion_factor: number;
  unit?: {
    name: string;
    symbol: string;
  } | null;
}

interface StockAdjustmentFormPanelProps {
  productsList: { id: string; name: string }[];
  stockOverview: ProductStockOverviewItem[];
  settings: InventorySettings;
  onSubmit: (payload: StockAdjustmentInput) => Promise<void>;
  isPending: boolean;
}

export const StockAdjustmentFormPanel = ({
  productsList,
  stockOverview,
  settings,
  onSubmit,
  isPending,
}: StockAdjustmentFormPanelProps) => {
  const [productId, setProductId] = useState("");
  const [selectedUnitId, setSelectedUnitId] = useState("");
  const [type, setType] = useState<"ADJUSTMENT" | "DAMAGE">("ADJUSTMENT");
  const [direction, setDirection] = useState<"+" | "-">("+");
  const [quantity, setQuantity] = useState(1);
  
  const year = new Date().getFullYear();

  const [reference, setReference] = useState(() => {
    const randomRef = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${settings.refPrefix}-ADJ-${year}-${randomRef}`;
  });
  const [remarks, setRemarks] = useState("");

  const { data: productUnits = [], isLoading: isLoadingUnits } = useProductUnits(productId);

  // Derived current unit ID
  const unitId = selectedUnitId || productUnits[0]?.id || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId || !unitId || !reference) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const finalQty = direction === "+" ? Math.abs(quantity) : -Math.abs(quantity);
      await onSubmit({
        product_id: productId,
        product_unit_id: unitId,
        quantity: finalQty,
        transaction_type: type,
        reference,
        remarks,
      });

      toast.success("Stock adjustment updated successfully.");
      setProductId("");
      setSelectedUnitId("");
      setRemarks("");
      setQuantity(1);
      // Regen reference
      const code = type === "DAMAGE" ? "DMG" : "ADJ";
      setReference(`${settings.refPrefix}-${code}-${Math.floor(1000 + Math.random() * 9000)}`);
    } catch {
      // toast is automatically handled by react query mutation
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4 text-left">
      {/* Product Select */}
      <div className="space-y-1.5">
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Select Product *
        </label>
        <select
          value={productId}
          onChange={(e) => {
            setProductId(e.target.value);
            setSelectedUnitId("");
          }}
          required
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition cursor-pointer"
        >
          <option value="">-- Choose a Product --</option>
          {productsList.map((p) => {
            const currentItem = stockOverview.find((s) => s.id === p.id);
            const qtyText = currentItem ? `(Current Stock: ${currentItem.stock})` : "";
            return (
              <option key={p.id} value={p.id}>
                {p.name} {qtyText}
              </option>
            );
          })}
        </select>
      </div>

      {/* Unit Select */}
      <div className="space-y-1.5">
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
          <span>Select Unit *</span>
          {isLoadingUnits && (
            <span className="text-[9px] text-indigo-600 animate-pulse lowercase font-semibold">
              fetching units...
            </span>
          )}
        </label>
        <select
          value={unitId}
          onChange={(e) => setSelectedUnitId(e.target.value)}
          required
          disabled={!productId || productUnits.length === 0}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition disabled:opacity-60 cursor-pointer"
        >
          {productUnits.length === 0 ? (
            <option value="">-- Select Product first --</option>
          ) : (
            productUnits.map((pu: ProductUnitItem) => (
              <option key={pu.id} value={pu.id}>
                {pu.unit?.name || "Base"} ({pu.unit?.symbol || "pcs"}) - Factor:{" "}
                {pu.conversion_factor}x
              </option>
            ))
          )}
        </select>
      </div>

      {/* Type & Direction */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Adjustment Type
          </label>
          <select
            value={type}
            onChange={(e) => {
              const newType = e.target.value as "ADJUSTMENT" | "DAMAGE";
              setType(newType);
              if (newType === "DAMAGE") {
                setDirection("-");
              }
              const code = newType === "DAMAGE" ? "DMG" : "ADJ";
              setReference(`${settings.refPrefix}-${code}-${Math.floor(1000 + Math.random() * 9000)}`);
            }}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition cursor-pointer"
          >
            <option value="ADJUSTMENT">ADJUSTMENT (Manual Edit)</option>
            <option value="DAMAGE">DAMAGE (Waste / Expiry)</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Direction
          </label>
          <div className="flex border border-slate-200 rounded-xl overflow-hidden p-1 bg-white">
            <button
              type="button"
              disabled={type === "DAMAGE"}
              onClick={() => setDirection("+")}
              className={cn(
                "flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer",
                direction === "+"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-500 hover:bg-slate-50"
              )}
            >
              Increase (+)
            </button>
            <button
              type="button"
              disabled={type === "DAMAGE"}
              onClick={() => setDirection("-")}
              className={cn(
                "flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer",
                direction === "-"
                  ? "bg-rose-600 text-white shadow-xs"
                  : "text-slate-500 hover:bg-slate-50"
              )}
            >
              Decrease (-)
            </button>
          </div>
        </div>
      </div>

      {/* Quantity & Reference */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Quantity
          </label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-mono font-bold text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span>Reference Code</span>
            <button
              type="button"
              onClick={() =>
                setReference(
                  `${settings.refPrefix}-${type === "DAMAGE" ? "DMG" : "ADJ"}-${Math.floor(
                    1000 + Math.random() * 9000
                  )}`
                )
              }
              className="text-indigo-600 hover:text-indigo-800 transition text-[9px] font-extrabold lowercase flex items-center gap-0.5"
            >
              <RefreshCw size={8} />
              <span>regen</span>
            </button>
          </label>
          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-mono font-bold text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition"
          />
        </div>
      </div>

      {/* Remarks */}
      <div className="space-y-1.5">
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Remarks / Explanatory Notes
        </label>
        <textarea
          rows={3}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="e.g. Damage check or physical count audit..."
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition resize-none placeholder:text-slate-400"
        />
      </div>

      <button
        type="submit"
        disabled={isPending || !productId || !unitId}
        className="w-full py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-sm hover:shadow-indigo-500/10 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            <span>Processing...</span>
          </>
        ) : (
          <span>Apply Adjustment Log</span>
        )}
      </button>
    </form>
  );
};
