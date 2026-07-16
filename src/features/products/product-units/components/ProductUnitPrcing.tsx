import type { Control } from "react-hook-form";
import type { ProductUnitFormData } from "../validation/productUnit.schema";
import { FormNumberInput } from "../../../../components/forms";

interface ProductUnitPricingProps {
  control: Control<ProductUnitFormData>;
  profit: number;
  margin: number;
}

const ProductUnitPricing = ({
  control,
  profit,
  margin,
}: ProductUnitPricingProps) => {
  const isProfit = profit >= 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-5">
      <h3 className="text-sm font-semibold text-slate-700">Pricing</h3>

      <div className="grid grid-cols-2 gap-4">
        <FormNumberInput
          control={control}
          name="cost_price"
          label="Cost Price"
          min={0}
          placeholder="0.00"
        />

        <FormNumberInput
          control={control}
          name="selling_price"
          label="Selling Price"
          min={0}
          placeholder="0.00"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div
          className={`rounded-lg border p-4 ${
            isProfit
              ? "border-emerald-200 bg-emerald-50"
              : "border-red-200 bg-red-50"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Profit
          </p>

          <p
            className={`mt-2 text-2xl font-bold ${
              isProfit ? "text-emerald-600" : "text-red-600"
            }`}
          >
            ₦{profit.toLocaleString()}
          </p>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Margin
          </p>
          <p className="mt-2 text-2xl font-bold text-blue-600">
            {margin.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductUnitPricing;
