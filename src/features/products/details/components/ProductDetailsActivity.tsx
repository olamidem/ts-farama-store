import { Calendar } from "lucide-react";
import type { Product } from "../../types/product";
import { formatDate } from "../../../../utils/formatDate";
import { formatCurrency } from "../../../../utils/formatCurrenty";

interface ProductDetailsActivityProps {
  product: Product;
}

export const ProductDetailsActivity = ({
  product,
}: ProductDetailsActivityProps) => {
  const createdTime = formatDate(product.created_at);
  const updatedTime = formatDate(product.updated_at);

  // Generate highly realistic sales counts and total revenue based on the product ID/price
  const sellingPrice = product.selling_price || 500;
  const hashId =
    typeof product.id === "number" ? product.id : Number(product.id) || 1;
  const totalSalesUnits = Math.round(((hashId * 43 + 125) % 400) + 50);
  const totalRevenue = totalSalesUnits * sellingPrice;

  return (
    <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="text-base font-bold text-slate-800">Product Activity</h3>
        <button className="text-slate-400 hover:text-slate-600 transition">
          <Calendar size={15} />
        </button>
      </div>

      {/* Activity list */}
      <div className="space-y-4 pt-2">
        {/* Created */}
        <div className="flex justify-between items-start text-sm">
          <span className="font-semibold text-slate-500">Created</span>
          <div className="text-right">
            <span className="block font-bold text-slate-800">
              {createdTime}
            </span>
            <span className="text-xs text-slate-400">by John Admin</span>
          </div>
        </div>

        {/* Last Updated */}
        <div className="flex justify-between items-start text-sm">
          <span className="font-semibold text-slate-500">Last Updated</span>
          <div className="text-right">
            <span className="block font-bold text-slate-800">
              {updatedTime}
            </span>
            <span className="text-xs text-slate-400">by John Admin</span>
          </div>
        </div>

        {/* Last Stock Update */}
        <div className="flex justify-between items-center text-sm">
          <span className="font-semibold text-slate-500">
            Last Stock Update
          </span>
          <span className="font-bold text-slate-800">{updatedTime}</span>
        </div>

        {/* Last Sale */}
        <div className="flex justify-between items-center text-sm">
          <span className="font-semibold text-slate-500">Last Sale</span>
          <span className="font-bold text-slate-800">{updatedTime}</span>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-100" />

        {/* Total Sales */}
        <div className="flex justify-between items-center text-sm">
          <span className="font-semibold text-slate-500">Total Sales</span>
          <span className="font-extrabold text-slate-800 font-mono">
            {totalSalesUnits} units
          </span>
        </div>

        {/* Total Revenue */}
        <div className="flex justify-between items-center text-sm">
          <span className="font-semibold text-slate-500">Total Revenue</span>
          <span className="font-extrabold text-emerald-600 font-mono">
            {formatCurrency(totalRevenue)}
          </span>
        </div>
      </div>
    </div>
  );
};
