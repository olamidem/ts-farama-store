import { ShoppingCart, DollarSign, Clock, Package } from "lucide-react";
import type { SupplierWithStats } from "../types/supplier";

interface SupplierStatsProps {
  supplier: SupplierWithStats;
}

export default function SupplierStats({ supplier }: SupplierStatsProps) {
  // Format currency (PHP as shown in the mockup ₱ or standard locale)
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(value);
  };

  const stats = [
    {
      label: "Total Purchases",
      value: supplier.totalPurchases,
      subtext: "All time purchases",
      icon: ShoppingCart,
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      label: "Total Spend",
      value: formatCurrency(supplier.totalSpend),
      subtext: "All time",
      icon: DollarSign,
      iconBg: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Pending Purchases",
      value: supplier.pendingPurchases,
      subtext: "Awaiting delivery",
      icon: Clock,
      iconBg: "bg-amber-50 text-amber-600",
    },
    {
      label: "Products Supplied",
      value: supplier.productsSupplied,
      subtext: "Unique products",
      icon: Package,
      iconBg: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="rounded-2xl border border-slate-100 bg-white p-5 flex items-center gap-4 shadow-2xs hover:shadow-xs transition duration-200"
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${stat.iconBg}`}
            >
              <Icon className="h-5.5 w-5.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {stat.label}
              </p>
              <p className="text-xl font-black text-slate-800 tracking-tight mt-1 truncate">
                {stat.value}
              </p>
              <p className="text-[10px] font-medium text-slate-400 mt-0.5">
                {stat.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
