import type { PurchaseItem } from "../types/purchaseItem";

export const calculateRemainingQuantity = (
  item: Pick<PurchaseItem, "quantity" | "received_quantity">,
): number => {
  return Math.max(0, item.quantity - item.received_quantity);
};
