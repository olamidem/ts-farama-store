import { Tag, Landmark, TrendingUp, Package } from "lucide-react";
import type { Product } from "../../types/product";
import { formatCurrency } from "../../../../utils/formatCurrenty";

interface ProductDetailsPricingCardProps {
  product: Product;
}

export const ProductDetailsPricingCard = ({
  product,
}: ProductDetailsPricingCardProps) => {
  const sellingPrice = product.selling_price || 0;
  const costPrice = product.cost_price || 0;
  const profit = sellingPrice - costPrice;
  const profitMargin = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;

  return (
    <div className="flex flex-col h-full justify-between gap-4 p-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="space-y-4">
        {/* Selling Price Row */}
        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition duration-150">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Tag size={18} />
            </div>
            <div>
              <span className="block text-sm font-bold text-slate-500">
                Selling Price
              </span>
            </div>
          </div>
          <span className="text-lg font-bold text-slate-800 font-mono">
            {formatCurrency(sellingPrice)}
          </span>
        </div>

        {/* Cost Price Row */}
        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition duration-150">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Landmark size={18} />
            </div>
            <div>
              <span className="block text-sm font-bold text-slate-500">
                Cost Price
              </span>
            </div>
          </div>
          <span className="text-lg font-bold text-slate-800 font-mono">
            {formatCurrency(costPrice)}
          </span>
        </div>

        {/* Profit Row */}
        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition duration-150">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <TrendingUp size={18} />
            </div>
            <div>
              <span className="block text-sm font-bold text-slate-500">
                Profit
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="block text-lg font-bold text-slate-800 font-mono">
              {formatCurrency(profit)}
            </span>
            <span className="text-xs font-bold text-amber-600">
              ({profitMargin.toFixed(2)}%)
            </span>
          </div>
        </div>

        {/* Current Stock Row */}
        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition duration-150">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Package size={18} />
            </div>
            <div>
              <span className="block text-sm font-bold text-slate-500">
                Current Stock
              </span>
            </div>
          </div>
          <span className="text-lg font-bold text-slate-800">
            {product.stock || 0} units
          </span>
        </div>
      </div>
    </div>
  );
};
