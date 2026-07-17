import { Boxes, Layers, TrendingUp, PackageCheck } from "lucide-react";
import { useProductUnits } from "../hooks/useProductUnits";
import { useUnits } from "../../../units/hooks/useUnits";
import type { Product } from "../../types/product";


interface ProductUnitsStatsProps {
  product: Product;
}

export default function ProductUnitsStats({ product }: ProductUnitsStatsProps) {
  const { data: productUnits = [] } = useProductUnits(product.id);
  const { data: units = [] } = useUnits();

  const totalUnits = productUnits.length;

  const largestPack =
    productUnits.length > 0
      ? productUnits.reduce((largest, current) =>
          current.conversion_factor > largest.conversion_factor
            ? current
            : largest,
        )
      : null;

  const averageMargin =
    productUnits.length > 0
      ? productUnits.reduce((sum, unit) => {
          const margin =
            unit.selling_price > 0
              ? ((unit.selling_price - unit.cost_price) / unit.selling_price) *
                100
              : 0;

          return sum + margin;
        }, 0) / productUnits.length
      : 0;

  const equivalentPackStock = largestPack
    ? Math.floor(product.stock / largestPack.conversion_factor)
    : 0;

  const largestPackName =
    units.find((u) => u.id === largestPack?.unit_id)?.name ?? "--";

  const cards = [
    {
      title: "Selling Units",
      value: totalUnits,
      icon: Boxes,
      color: "emerald",
    },
    {
      title: "Largest Pack",
      value: largestPack
        ? `${largestPackName} × ${largestPack.conversion_factor}`
        : "--",
      icon: Layers,
      color: "blue",
    },
    {
      title: "Average Margin",
      value: `${averageMargin.toFixed(1)}%`,
      icon: TrendingUp,
      color: "amber",
    },
    {
      title: "Pack Stock",
      value: largestPack ? `${equivalentPackStock} ${largestPackName}` : "--",
      icon: PackageCheck,
      color: "violet",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {card.title}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  {card.value}
                </h3>
              </div>

              <div
                className={`h-11 w-11 rounded-xl flex items-center justify-center
                ${
                  card.color === "emerald"
                    ? "bg-emerald-50 text-emerald-600"
                    : card.color === "blue"
                      ? "bg-blue-50 text-blue-600"
                      : card.color === "amber"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-violet-50 text-violet-600"
                }`}
              >
                <Icon size={20} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
