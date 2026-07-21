import { useState, useMemo } from "react";
import { Info } from "lucide-react";
import { cn } from "../../../utils/cn";
import type { ProductStockOverviewItem } from "../types/inventory";
import type { InventoryTransactionWithRelations } from "../types/inventoryTransaction";

interface ProductLedgerPanelProps {
  productsList: { id: string; name: string }[];
  transactions: InventoryTransactionWithRelations[];
  stockOverview: ProductStockOverviewItem[];
}

export const ProductLedgerPanel = ({
  productsList,
  transactions,
  stockOverview,
}: ProductLedgerPanelProps) => {
  const [selectedProductId, setSelectedProductId] = useState("");

  const selectedProductDetails = useMemo(() => {
    return stockOverview.find((s) => s.id === selectedProductId);
  }, [selectedProductId, stockOverview]);

  // filter and sort transactions chronologically (oldest to newest) for running ledger
  const sortedLedgerTx = useMemo(() => {
    if (!selectedProductId) return [];
    return transactions
      .filter((tx) => tx.product_id === selectedProductId)
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      );
  }, [selectedProductId, transactions]);

  return (
    <div className="space-y-6 text-left">
      {/* Product Select Bar */}
      <div className="max-w-md space-y-1.5">
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Filter Ledger by Product
        </label>
        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M7%209l3%203%203-3%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[right_0.5rem_center] bg-[length:1.25rem_1.25rem] bg-no-repeat pr-8"
        >
          <option value="">-- Choose a Product --</option>
          {productsList.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {!selectedProductId ? (
        <div className="py-16 text-center border-2 border-dashed border-slate-100 rounded-3xl text-slate-400 font-semibold text-xs space-y-2">
          <Info className="mx-auto text-slate-300" size={32} />
          <p>
            Please select a product above to audit its comprehensive ledger.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Stats card */}
          {selectedProductDetails && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-700">
              <div>
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  Product Name
                </span>
                <span className="font-extrabold text-xs text-slate-800">
                  {selectedProductDetails.name}
                </span>
              </div>
              <div>
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  SKU Code
                </span>
                <span className="font-mono text-xs font-bold text-slate-600">
                  {selectedProductDetails.sku}
                </span>
              </div>
              <div>
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  Current Physical Stock
                </span>
                <span className="font-mono text-xs font-extrabold text-slate-800">
                  {selectedProductDetails.stock} {selectedProductDetails.unit}
                </span>
              </div>
              <div>
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  Ledger Actions
                </span>
                <span className="font-mono text-xs font-bold text-slate-500">
                  {sortedLedgerTx.length} records found
                </span>
              </div>
            </div>
          )}

          {/* Ledger table */}
          <div className="overflow-x-auto border border-slate-100 rounded-2xl bg-white shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Date & Time
                  </th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Type
                  </th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Ref Code
                  </th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">
                    Quantity Change
                  </th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">
                    Running Balance
                  </th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs">
                {sortedLedgerTx.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-8 text-center text-slate-400 font-medium"
                    >
                      No chronological ledger records exist for this product.
                    </td>
                  </tr>
                ) : (
                  sortedLedgerTx.map((tx) => {
                    const isPositive = tx.quantity > 0;
                    return (
                      <tr
                        key={tx.id}
                        className="hover:bg-slate-50/50 transition"
                      >
                        <td className="p-4 font-semibold text-slate-500">
                          {new Date(tx.created_at).toLocaleString()}
                        </td>
                        <td className="p-4">
                          <span
                            className={cn(
                              "inline-flex items-center px-2 py-0.5 rounded-sm text-[9px] font-extrabold border uppercase",
                              tx.transaction_type === "PURCHASE"
                                ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                                : tx.transaction_type === "SALE"
                                  ? "bg-rose-50 border-rose-100 text-rose-700"
                                  : tx.transaction_type === "ADJUSTMENT"
                                    ? "bg-amber-50 border-amber-100 text-amber-700"
                                    : tx.transaction_type === "OPENING STOCK"
                                      ? "bg-indigo-50 border-indigo-100 text-indigo-700"
                                      : "bg-slate-100 border-slate-200 text-slate-600",
                            )}
                          >
                            {tx.transaction_type}
                          </span>
                        </td>
                        <td className="p-4 font-mono font-bold text-slate-600">
                          {tx.reference}
                        </td>
                        <td
                          className={cn(
                            "p-4 text-right font-mono font-extrabold",
                            isPositive ? "text-emerald-600" : "text-rose-600",
                          )}
                        >
                          {isPositive ? "+" : ""}
                          {tx.quantity}
                        </td>
                        <td className="p-4 text-right font-mono font-bold text-slate-800">
                          {tx.balance_after}
                        </td>
                        <td
                          className="p-4 max-w-xs truncate text-slate-500 italic"
                          title={tx.remarks || ""}
                        >
                          {tx.remarks || "No remarks logged."}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductLedgerPanel;
