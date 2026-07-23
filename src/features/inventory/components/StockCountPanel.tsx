import { useState, useMemo } from "react";
import { Search, Info } from "lucide-react";
import { toast } from "sonner";
import type {
  ProductStockOverviewItem,
  StockAdjustmentInput,
  InventorySettings,
} from "../types/inventory";


interface StockCountPanelProps {
  stockOverview: ProductStockOverviewItem[];
  isLoading: boolean;
  settings: InventorySettings;
  onCommitAdjustment: (payload: StockAdjustmentInput) => Promise<void>;
  onComplete: () => void;
}

export const StockCountPanel = ({
  stockOverview,
  isLoading,
  settings,
  onCommitAdjustment,
  onComplete,
}: StockCountPanelProps) => {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [isCommitting, setIsCommitting] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");

  const handleCountChange = (productId: string, val: number) => {
    setCounts((prev) => ({
      ...prev,
      [productId]: Math.max(0, val),
    }));
  };

  const filteredItems = useMemo(() => {
    return stockOverview.filter(
      (item) =>
        item.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(filterQuery.toLowerCase()),
    );
  }, [stockOverview, filterQuery]);

  // Count variances
  const itemsWithVariance = useMemo(() => {
    return stockOverview.filter((item) => {
      const counted =
        counts[item.id] !== undefined ? counts[item.id] : item.stock;
      return counted !== item.stock;
    });
  }, [stockOverview, counts]);

  const handleCommit = async () => {
    if (itemsWithVariance.length === 0) {
      toast.info(
        "No variances found. Physical stock count matches system balances.",
      );
      return;
    }

    setIsCommitting(true);
    const toastId = toast.loading(
      `Committing stock take adjustments for ${itemsWithVariance.length} products...`,
    );
    try {
      const refCode = `${settings.refPrefix}-COUNT-${Math.floor(1000 + Math.random() * 9000)}`;

      // Perform sequential writes
      for (const item of itemsWithVariance) {
        const countedVal =
          counts[item.id] !== undefined ? counts[item.id] : item.stock;
        const variance = countedVal - item.stock;
        const defaultUnitId = item.default_product_unit_id;

        if (!defaultUnitId) {
          throw new Error(
            `Product ${item.name} has no configured product unit.`,
          );
        }

        await onCommitAdjustment({
          product_id: item.id,
          product_unit_id: defaultUnitId,
          quantity: variance,
          transaction_type: "ADJUSTMENT",
          reference: refCode,
          remarks: `Physical stock take adjustment. Counted: ${countedVal} pcs (System: ${item.stock} pcs).`,
        });
      }

      toast.dismiss(toastId);
      toast.success(
        "Physical stock count committed successfully! Inventory synced.",
      );
      setCounts({}); // trigger re-initialization
      onComplete();
    } catch (err) {
      const error = err as Error;
      toast.dismiss(toastId);
      toast.error(error.message || "Failed to commit physical count.");
    } finally {
      setIsCommitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-12 flex flex-col items-center justify-center space-y-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
        <p className="text-xs text-slate-400 font-semibold">
          Loading stock table...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      {/* Overview stats of variance */}
      <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex gap-3">
          <div className="rounded-xl bg-amber-500 text-white p-2.5 h-10 w-10 flex items-center justify-center shrink-0">
            <Info size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Physical Count Summary
            </h4>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {itemsWithVariance.length === 0
                ? "Physical count perfectly aligns with system numbers. Enter values in table below."
                : `Detected stock variance for ${itemsWithVariance.length} product(s).`}
            </p>
          </div>
        </div>

        <button
          onClick={handleCommit}
          disabled={itemsWithVariance.length === 0 || isCommitting}
          className="px-5 py-2.5 bg-indigo-600 text-white hover:bg-indigo-700 font-bold text-xs rounded-xl transition shadow-xs cursor-pointer disabled:opacity-50"
        >
          {isCommitting ? "Syncing..." : "Commit Count & Update Stock"}
        </button>
      </div>

      {/* Filter and Table */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search products by SKU or Name..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-xl pl-9 pr-3 h-10 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
          />
        </div>

        <div className="overflow-x-auto border border-slate-100 rounded-2xl bg-white shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Product Details
                </th>
                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  SKU
                </th>
                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
                  System Stock
                </th>
                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center w-40">
                  Counted Stock
                </th>
                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">
                  Variance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {filteredItems.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center text-slate-400 font-medium"
                  >
                    No matching products found.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => {
                  const counted =
                    counts[item.id] !== undefined
                      ? counts[item.id]
                      : item.stock;
                  const variance = counted - item.stock;

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/50 transition"
                    >
                      <td className="p-4 font-bold text-slate-800">
                        {item.name}
                      </td>
                      <td className="p-4 font-mono font-semibold text-slate-400">
                        {item.sku}
                      </td>
                      <td className="p-4 text-center font-mono font-bold text-slate-600">
                        {item.stock}
                      </td>
                      <td className="p-4 text-center">
                        <input
                          type="number"
                          min={0}
                          value={counted}
                          onChange={(e) =>
                            handleCountChange(item.id, Number(e.target.value))
                          }
                          className="w-24 text-center border border-slate-200 rounded-lg px-2 py-1 font-mono font-bold text-slate-700 bg-white focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="p-4 text-right font-mono font-bold">
                        {variance > 0 ? (
                          <span className="text-emerald-600">+{variance}</span>
                        ) : variance < 0 ? (
                          <span className="text-rose-600">{variance}</span>
                        ) : (
                          <span className="text-slate-400">0</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockCountPanel;
