import { Package, Layers, AlertTriangle, PackageX } from "lucide-react";

interface ProductStatCardsProps {
  stats?: {
    total: number;
    active: number;
    lowStock: number;
    outOfStock: number;
  };
  isLoading: boolean;
}

const ProductStatCards = ({ stats, isLoading }: ProductStatCardsProps) => {
  const total = stats?.total ?? 0;
  const active = stats?.active ?? 0;
  const lowStock = stats?.lowStock ?? 0;
  const outOfStock = stats?.outOfStock ?? 0;

  const activePercent = total > 0 ? ((active / total) * 100).toFixed(1) : "0.0";

  const cardData = [
    {
      title: "Total Products",
      value: isLoading ? "..." : total.toLocaleString(),
      subtext: "All products",
      icon: <Package size={22} className="text-emerald-600" />,
      iconBg: "bg-emerald-50 border border-emerald-100/80",
    },
    {
      title: "Active Products",
      value: isLoading ? "..." : active.toLocaleString(),
      subtext: `${activePercent}% of total`,
      icon: <Layers size={22} className="text-blue-600" />,
      iconBg: "bg-blue-50 border border-blue-100/80",
    },
    {
      title: "Low Stock",
      value: isLoading ? "..." : lowStock.toLocaleString(),
      subtext: "Need attention",
      icon: <AlertTriangle size={22} className="text-amber-600" />,
      iconBg: "bg-amber-50 border border-amber-100/80",
    },
    {
      title: "Out of Stock",
      value: isLoading ? "..." : outOfStock.toLocaleString(),
      subtext: "Unavailable",
      icon: <PackageX size={22} className="text-purple-600" />,
      iconBg: "bg-purple-50 border border-purple-100/80",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {cardData.map((card, i) => (
        <div
          key={i}
          className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-md"
        >
          {/* Icon frame */}
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${card.iconBg}`}>
            {card.icon}
          </div>

          {/* Content */}
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {card.title}
            </span>
            <span className="text-2xl font-bold text-slate-900 mt-1">
              {card.value}
            </span>
            <span className="text-xs text-slate-500 mt-1">
              {card.subtext}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductStatCards;
