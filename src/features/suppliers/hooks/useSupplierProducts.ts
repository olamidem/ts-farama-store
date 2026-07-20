import { useQuery } from "@tanstack/react-query";
import { getSupplierPurchases } from "../services/supplier.service";

export interface SuppliedProduct {
  id: string;
  name: string;
  sku?: string;
  cost_price?: number;
  stock?: number;
  totalQuantityReceived: number;
  lastReceivedDate?: string;
}

interface ProductItemRecord {
  product_id?: string;
  unit_cost?: number;
  received_quantity?: number;
  product?: {
    id: string;
    name: string;
    sku?: string;
    cost_price?: number;
    stock?: number;
  };
}

interface HookPurchaseRecord {
  id: string;
  purchase_number?: string;
  purchase_date?: string;
  created_at: string;
  status: string;
  total_amount?: number;
  items?: ProductItemRecord[];
}

export const useSupplierProducts = (supplierId: string | undefined) => {
  return useQuery({
    queryKey: ["suppliers", "products", supplierId || "none"],
    queryFn: async () => {
      if (!supplierId) return [];

      const purchases = await getSupplierPurchases(supplierId);
      const productMap = new Map<string, SuppliedProduct>();

      (purchases as HookPurchaseRecord[]).forEach((purchase) => {
        if (purchase.items && Array.isArray(purchase.items)) {
          (purchase.items as ProductItemRecord[]).forEach((item) => {
            if (item.product) {
              const prod = item.product;
              const prodId = String(prod.id);
              const receivedQty = item.received_quantity || 0;
              const existing = productMap.get(prodId);

              if (existing) {
                existing.totalQuantityReceived += receivedQty;
                // Track latest received date
                if (
                  purchase.purchase_date &&
                  (!existing.lastReceivedDate ||
                    new Date(purchase.purchase_date) >
                      new Date(existing.lastReceivedDate))
                ) {
                  existing.lastReceivedDate = purchase.purchase_date;
                }
              } else {
                productMap.set(prodId, {
                  id: prodId,
                  name: prod.name,
                  sku: prod.sku || "",
                  cost_price: prod.cost_price || item.unit_cost || 0,
                  stock: prod.stock || 0,
                  totalQuantityReceived: receivedQty,
                  lastReceivedDate:
                    purchase.purchase_date || purchase.created_at,
                });
              }
            }
          });
        }
      });

      return Array.from(productMap.values());
    },
    enabled: !!supplierId,
  });
};
