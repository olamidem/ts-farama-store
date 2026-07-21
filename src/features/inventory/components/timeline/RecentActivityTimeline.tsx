import { useMemo } from "react";
import { ArrowRight, ShoppingCart, RotateCcw, AlertTriangle, ArrowRightLeft, PackagePlus, Package } from "lucide-react";
import type { InventoryTransactionWithRelations } from "../../types/inventoryTransaction";

interface RecentActivityTimelineProps {
  transactions: InventoryTransactionWithRelations[];
  isLoading: boolean;
}

export const RecentActivityTimeline = ({ transactions, isLoading }: RecentActivityTimelineProps) => {
  // Show last 5 transactions
  const timelineItems = useMemo(() => transactions.slice(0, 5), [transactions]);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "PURCHASE":
        return { 
          icon: PackagePlus, 
          color: "text-emerald-500 bg-emerald-50 border-emerald-100",
          dotColor: "bg-emerald-500"
        };
      case "SALE":
        return { 
          icon: ShoppingCart, 
          color: "text-rose-500 bg-rose-50 border-rose-100",
          dotColor: "bg-rose-500"
        };
      case "RETURN":
        return { 
          icon: RotateCcw, 
          color: "text-blue-500 bg-blue-50 border-blue-100",
          dotColor: "bg-blue-500"
        };
      case "ADJUSTMENT":
        return { 
          icon: Package, 
          color: "text-amber-500 bg-amber-50 border-amber-100",
          dotColor: "bg-amber-500"
        };
      case "DAMAGE":
        return { 
          icon: AlertTriangle, 
          color: "text-orange-500 bg-orange-50 border-orange-100",
          dotColor: "bg-orange-500"
        };
      case "TRANSFER":
        return { 
          icon: ArrowRightLeft, 
          color: "text-purple-500 bg-purple-50 border-purple-100",
          dotColor: "bg-purple-500"
        };
      default:
        return { 
          icon: PackagePlus, 
          color: "text-indigo-500 bg-indigo-50 border-indigo-100",
          dotColor: "bg-indigo-500"
        };
    }
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    
    // Check if yesterday or today
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
    } else if (diffDays <= 2) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    }
  };

  const formatType = (type: string) => {
    if (type === "OPENING STOCK") return "Opening Stock";
    return type.charAt(0) + type.slice(1).toLowerCase();
  };

  const getUnitDisplay = (item: InventoryTransactionWithRelations) => {
    const pu = item.product_unit;
    if (!pu) return "Piece";
    
    const u = pu.unit;
    if (!u) return "Piece";
    
    const name = u.name;
    const symbol = u.symbol;
    const factor = pu.conversion_factor || 1;
    
    // 1. If symbol already contains spaces or digits (like "24 pcs", "50 kg" in mock data), use it directly!
    if (symbol && (/\d/.test(symbol) || symbol.includes(" "))) {
      return `${name} (${symbol})`;
    }
    
    // 2. If it's real data from database (symbol is "pcs", "kg", "ctn", etc.)
    if (symbol) {
      if (factor > 1) {
        const baseSymbol = symbol === "kg" || symbol === "g" ? symbol : "pcs";
        return `${name} (${factor} ${baseSymbol})`;
      }
      return `${name} (${symbol})`;
    }
    
    return name;
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col justify-between h-full space-y-4">
      <div>
        <h3 className="text-base font-bold text-slate-900 mb-6">
          Recent Activity Timeline
        </h3>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-4 animate-pulse">
                <div className="h-9 w-9 rounded-full bg-slate-100 shrink-0" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-3.5 bg-slate-100 rounded w-1/3" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : timelineItems.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            No transaction records available.
          </div>
        ) : (
          <div className="relative pl-0 space-y-6">
            {/* Vertical timeline line on the far left */}
            <div className="absolute left-[15.5px] top-3 bottom-3 w-[1px] bg-slate-100" />

            {timelineItems.map((item) => {
              const { icon: Icon, color, dotColor } = getTransactionIcon(item.transaction_type);
              const isPositive = item.quantity > 0;
              const sign = isPositive ? "+" : "";
              const qtyClass = isPositive ? "text-emerald-500 font-bold" : "text-rose-500 font-bold";

              return (
                <div key={item.id} className="relative flex items-center justify-between">
                  {/* Small colored dot exactly on the vertical line */}
                  <div className={`absolute left-[12px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-white ring-1 ring-white ${dotColor}`} />

                  {/* Icon badge + Text content */}
                  <div className="flex items-center gap-3.5 flex-1 min-w-0 pl-10">
                    <div className={`rounded-full p-2 border shrink-0 flex items-center justify-center h-10 w-10 bg-white ${color}`}>
                      <Icon size={14} />
                    </div>

                    <div className="space-y-0.5 truncate">
                      <p className="text-xs font-bold text-slate-800 leading-tight">
                        {formatType(item.transaction_type)}
                      </p>
                      <p className="text-[11px] text-slate-400 font-semibold leading-tight truncate">
                        {item.product?.name || "Unknown Product"} - {getUnitDisplay(item)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity and Time on far right */}
                  <div className="text-right shrink-0 pl-4">
                    <span className={`font-mono text-xs block ${qtyClass}`}>
                      {sign}{item.quantity}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
                      {formatTime(item.created_at)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-50 flex items-center justify-start">
        <button
          onClick={() => {
            // Scroll to transaction table
            const tableElement = document.getElementById("inventory-transactions-table");
            if (tableElement) {
              tableElement.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="text-xs font-extrabold text-indigo-600 hover:text-indigo-800 transition flex items-center gap-1.5 hover:underline cursor-pointer bg-transparent border-0"
        >
          <span>View all activity</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default RecentActivityTimeline;
