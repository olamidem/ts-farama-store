import { ArrowRight } from "lucide-react";
import type { BulkUpdateType } from "../../../utils/calculateBulkPrice";
import { formatCurrency } from "../../../utils/format";
import type { Product } from "../types/product";

interface PreviewProduct extends Product {
  oldSellingPrice: number;
  newSellingPrice: number;
  oldCostPrice: number;
  newCostPrice: number;
}

interface BulkUpdatePreviewProps {
  products: PreviewProduct[];
  updateType: BulkUpdateType;
  operation: "increase" | "decrease";
}

const BulkUpdatePreview = ({ products, updateType, operation }: BulkUpdatePreviewProps) => {
     const newPriceColor =  operation === "increase" ? "text-emerald-600" : "text-red-600";
  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-bold uppercase tracking-wide text-slate-400">
        Live Preview (Up to 4 items)
      </label>

      <div className="max-h-48 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50">
        {products.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No products selected.
          </div>
        ) : (
          products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="border-b border-slate-200 p-3 last:border-b-0"
            >
              <p className="truncate font-semibold text-slate-700">
                {product.name}
              </p>

              <div className="mt-2 space-y-1 text-xs">
                {(updateType === "selling" || updateType === "both") && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Retail:</span>
                    <span>
                      <span className="line-through text-slate-400">
                        {formatCurrency(product.oldSellingPrice)}
                      </span>
                      <span className="mx-1">➜</span>
                      <span className={`font-bold ${newPriceColor}`}>
                        {formatCurrency(product.newSellingPrice)}
                      </span>
                    </span>
                  </div>
                )}

                {(updateType === "cost" || updateType === "both") && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Wholesale:</span>
                    <span>
                      <span className="line-through text-slate-400">
                        {formatCurrency(product.oldCostPrice)}
                      </span>
                      <span className="mx-1">
                        <ArrowRight
                          size={12}
                          className="inline mx-1 text-slate-400"
                        />
                      </span>
                      <span className={`font-bold ${newPriceColor}`}>
                        {formatCurrency(product.newCostPrice)}
                      </span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BulkUpdatePreview;
