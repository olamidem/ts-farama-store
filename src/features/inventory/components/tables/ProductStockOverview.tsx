import { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { ProductStockOverviewItem } from "../../types/inventory";

interface ProductStockOverviewProps {
  items: ProductStockOverviewItem[];
  isLoading: boolean;
}

export const ProductStockOverview = ({ items, isLoading }: ProductStockOverviewProps) => {
  // Limit items shown in the dashboard overview to 5 items to match the split layout
  const limitedItems = useMemo(() => items.slice(0, 5), [items]);

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col justify-between h-full">
      <div>
        <h3 className="text-base font-bold text-slate-900 mb-6">
          Product Stock Overview
        </h3>

        {isLoading ? (
          <div className="space-y-4 animate-pulse py-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-9 bg-slate-50 rounded-xl" />
            ))}
          </div>
        ) : limitedItems.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-xs font-semibold">
            No Stock Levels Found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Product</th>
                  <th className="pb-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">SKU</th>
                  <th className="pb-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Unit</th>
                  <th className="pb-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Stock</th>
                  <th className="pb-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Reserved</th>
                  <th className="pb-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Available</th>
                  <th className="pb-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {limitedItems.map((item) => {
                  let badgeClass = "bg-slate-50 text-slate-500 border-slate-100";
                  if (item.status === "In Stock") {
                    badgeClass = "bg-emerald-50 text-emerald-600 border-emerald-100";
                  } else if (item.status === "Low Stock") {
                    badgeClass = "bg-amber-50 text-amber-600 border-amber-100";
                  } else if (item.status === "Out of Stock") {
                    badgeClass = "bg-rose-50 text-rose-600 border-rose-100";
                  }

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="py-3.5 pr-2 text-xs font-bold text-slate-800">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-lg bg-indigo-50/70 border border-indigo-100/30 flex items-center justify-center font-bold text-[10px] text-indigo-700 uppercase shrink-0">
                            {item.name.slice(0, 2)}
                          </div>
                          <span className="truncate max-w-[150px]" title={item.name}>{item.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 pr-2 text-xs font-mono font-bold text-slate-400">{item.sku || "N/A"}</td>
                      <td className="py-3.5 pr-2 text-xs font-semibold text-slate-500">{item.unit}</td>
                      <td className="py-3.5 pr-2 text-xs">
                        <div className="flex flex-col gap-1">
                          <span className="font-mono font-bold text-slate-800">{item.stock}</span>
                          <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                item.status === "In Stock" ? "bg-emerald-500" :
                                item.status === "Low Stock" ? "bg-amber-500" : "bg-rose-500"
                              }`}
                              style={{ width: `${Math.min(100, item.stock === 0 ? 0 : Math.max(15, (item.stock / Math.max(1, item.min_stock_alert || 5)) * 40))}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 pr-2 text-xs font-mono font-bold text-slate-400">{item.reserved}</td>
                      <td className="py-3.5 pr-2 text-xs font-mono font-bold text-slate-700">{item.available}</td>
                      <td className="py-3.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold border tracking-wider uppercase ${badgeClass}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-50 flex items-center justify-start mt-4">
        <Link
          to="/products"
          className="text-xs font-extrabold text-indigo-600 hover:text-indigo-800 transition flex items-center gap-1.5 hover:underline"
        >
          <span>View all products</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default ProductStockOverview;
