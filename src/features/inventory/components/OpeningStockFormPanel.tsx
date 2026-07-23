import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
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

interface OpeningStockFormPanelProps {
  productsList: { id: string; name: string }[];
  stockOverview: ProductStockOverviewItem[];
  settings: InventorySettings;
  onSubmit: (payload: StockAdjustmentInput) => Promise<void>;
  isPending: boolean;
}

export const OpeningStockFormPanel = ({
  productsList,
  stockOverview,
  settings,
  onSubmit,
  isPending,
}: OpeningStockFormPanelProps) => {
  const [productId, setProductId] = useState("");
  const [selectedUnitId, setSelectedUnitId] = useState("");
  const [quantity, setQuantity] = useState(0);
  
  const [reference, setReference] = useState(() => {
    return `${settings.refPrefix}-OPEN-${Math.floor(1000 + Math.random() * 9000)}`;
  });
  const [remarks, setRemarks] = useState("");

  const { data: productUnits = [] } = useProductUnits(productId);

  // Derived current unit ID
  const unitId = selectedUnitId || productUnits[0]?.id || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId || !unitId || quantity <= 0) {
      toast.error("Please enter a valid product and positive opening quantity.");
      return;
    }

    try {
      await onSubmit({
        product_id: productId,
        product_unit_id: unitId,
        quantity,
        transaction_type: "OPENING STOCK",
        reference,
        remarks: remarks || "Initial opening stock entry on setup.",
      });

      toast.success("Opening stock recorded and initialized.");
      setProductId("");
      setSelectedUnitId("");
      setRemarks("");
      setQuantity(0);
      setReference(`${settings.refPrefix}-OPEN-${Math.floor(1000 + Math.random() * 9000)}`);
    } catch {
      // error is toasted automatically
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
                {p.name} {currentItem ? `(Current Stock: ${currentItem.stock})` : ""}
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

      {/* Quantity & Reference */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Opening Quantity *
          </label>
          <input
            type="number"
            min={1}
            value={quantity || ""}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
            placeholder="e.g. 100"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-mono font-bold text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span>Reference Document Code</span>
            <button
              type="button"
              onClick={() =>
                setReference(
                  `${settings.refPrefix}-OPEN-${Math.floor(
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
          Remarks / Notes
        </label>
        <textarea
          rows={3}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Describe initial stock audit, physical verification notes, etc..."
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition resize-none placeholder:text-slate-400"
        />
      </div>

      <button
        type="submit"
        disabled={isPending || !productId || !unitId || quantity <= 0}
        className="w-full py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-sm hover:shadow-indigo-500/10 cursor-pointer disabled:opacity-50"
      >
        Record Initial Opening Stock
      </button>
    </form>
  );
};
