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

interface StockTransferFormPanelProps {
  productsList: { id: string; name: string }[];
  stockOverview: ProductStockOverviewItem[];
  settings: InventorySettings;
  onSubmit: (payload: StockAdjustmentInput) => Promise<void>;
  isPending: boolean;
}

export const StockTransferFormPanel = ({
  productsList,
  stockOverview,
  settings,
  onSubmit,
  isPending,
}: StockTransferFormPanelProps) => {
  const [productId, setProductId] = useState("");
  const [selectedUnitId, setSelectedUnitId] = useState("");
  const [direction, setDirection] = useState<"INWARD" | "OUTWARD">("OUTWARD");
  const [source, setSource] = useState("Main Store");
  const [destination, setDestination] = useState("Outlet Depot A");
  const [quantity, setQuantity] = useState(1);
  
  const [reference, setReference] = useState(() => {
    return `${settings.refPrefix}-TRF-${Math.floor(1000 + Math.random() * 9000)}`;
  });
  const [remarks, setRemarks] = useState("");

  const { data: productUnits = [] } = useProductUnits(productId);

  // Derived current unit ID
  const unitId = selectedUnitId || productUnits[0]?.id || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId || !unitId || !source || !destination) {
      toast.error("Please fill in all mandatory fields.");
      return;
    }

    try {
      const finalQty = direction === "INWARD" ? Math.abs(quantity) : -Math.abs(quantity);
      await onSubmit({
        product_id: productId,
        product_unit_id: unitId,
        quantity: finalQty,
        transaction_type: "TRANSFER",
        reference,
        remarks: `[Transfer: ${source} ➔ ${destination}] ${remarks}`,
      });

      toast.success("Stock transfer transaction logged successfully.");
      setProductId("");
      setSelectedUnitId("");
      setRemarks("");
      setQuantity(1);
      setReference(`${settings.refPrefix}-TRF-${Math.floor(1000 + Math.random() * 9000)}`);
    } catch {
      // handled by mutator
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4 text-left">
      {/* Product select */}
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
            return (
              <option key={p.id} value={p.id}>
                {p.name} {currentItem ? `(Stock: ${currentItem.stock})` : ""}
              </option>
            );
          })}
        </select>
      </div>

      {/* Unit select */}
      <div className="space-y-1.5">
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Product Unit *
        </label>
        <select
          value={unitId}
          onChange={(e) => setSelectedUnitId(e.target.value)}
          required
          disabled={!productId || productUnits.length === 0}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition cursor-pointer"
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

      {/* Direction & Locations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Transfer Flow Type
          </label>
          <div className="flex border border-slate-200 rounded-xl p-1 bg-white">
            <button
              type="button"
              onClick={() => setDirection("INWARD")}
              className={cn(
                "flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer",
                direction === "INWARD" ? "bg-indigo-600 text-white" : "text-slate-500"
              )}
            >
              Inward (Add Stock)
            </button>
            <button
              type="button"
              onClick={() => setDirection("OUTWARD")}
              className={cn(
                "flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer",
                direction === "OUTWARD" ? "bg-indigo-600 text-white" : "text-slate-500"
              )}
            >
              Outward (Deduct)
            </button>
          </div>
        </div>

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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Source Channel / Location
          </label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
            placeholder="e.g. Main Storehouse"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Destination Location
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
            placeholder="e.g. Main Retail Counter"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition"
          />
        </div>
      </div>

      {/* Reference Code */}
      <div className="space-y-1.5">
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
          <span>Transfer Reference Code *</span>
          <button
            type="button"
            onClick={() =>
              setReference(
                `${settings.refPrefix}-TRF-${Math.floor(1000 + Math.random() * 9000)}`
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

      {/* Remarks */}
      <div className="space-y-1.5">
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Remarks / Explanatory Notes
        </label>
        <textarea
          rows={3}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Reason for transfer movement..."
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition resize-none placeholder:text-slate-400"
        />
      </div>

      <button
        type="submit"
        disabled={isPending || !productId || !unitId}
        className="w-full py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-sm hover:shadow-indigo-500/10 cursor-pointer disabled:opacity-50"
      >
        Apply Transfer Balance
      </button>
    </form>
  );
};
