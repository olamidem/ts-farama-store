import { useMemo } from "react";
import { calculateBulkPrice, type BulkUpdateMethod, type BulkUpdateOperation, type BulkUpdateType } from "../../../utils/calculateBulkPrice";
import type { Product } from "../types/product";

interface UseBulkPricePreviewParams {
  products: Product[];
  amount: number;
  updateType: BulkUpdateType;
  method: BulkUpdateMethod;
  operation: BulkUpdateOperation;
}

export const useBulkPricePreview = ({
  products,
  amount,
  updateType,
  method,
  operation,
}: UseBulkPricePreviewParams) => {
  return useMemo(() => {
    return products.map((product) => {
      const sellingPrice =
        updateType === "selling" || updateType === "both"
          ? calculateBulkPrice({
              currentPrice: product.selling_price,
              amount,
              method,
              operation,
            })
          : product.selling_price;

      const costPrice =
        updateType === "cost" || updateType === "both"
          ? calculateBulkPrice({
              currentPrice: product.cost_price,
              amount,
              method,
              operation,
            })
          : product.cost_price;

      return {
        ...product,
        oldSellingPrice: product.selling_price,
        newSellingPrice: sellingPrice,

        oldCostPrice: product.cost_price,
        newCostPrice: costPrice,
      };
    });
  }, [products, amount, updateType, method, operation]);
};
