import type { Product } from "../types/product";

interface PreviewProduct extends Product {
  oldSellingPrice: number;
  newSellingPrice: number;
  oldCostPrice: number;
  newCostPrice: number;
}

interface BulkUpdatePreviewProps {
  products: PreviewProduct[];
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

const BulkUpdatePreview = ({ products }: BulkUpdatePreviewProps) => {
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
                {/* Selling Price */}
                <div className="flex justify-between">
                  <span className="text-slate-500">Selling</span>

                  <span>
                    <span className="text-slate-400 line-through">
                      ₦{formatPrice(product.oldSellingPrice)}
                    </span>

                    <span className="mx-2">→</span>

                    <span className="font-bold text-slate-900">
                      ₦{formatPrice(product.newSellingPrice)}
                    </span>
                  </span>
                </div>

                {/* Cost Price */}
                <div className="flex justify-between">
                  <span className="text-slate-500">Cost</span>

                  <span>
                    <span className="text-slate-400 line-through">
                      ₦{formatPrice(product.oldCostPrice)}
                    </span>

                    <span className="mx-2">→</span>

                    <span className="font-bold text-slate-900">
                      ₦{formatPrice(product.newCostPrice)}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BulkUpdatePreview;
