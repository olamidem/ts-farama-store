import type { PurchaseItem } from "../types/purchaseItem";

/**
 * Calculates the total monetary value of all purchase items.
 */
export function calculatePurchaseTotal(
  items: Pick<PurchaseItem, "quantity" | "unit_cost">[],
): number {
  return items.reduce(
    (total, item) => total + item.quantity * item.unit_cost,
    0,
  );
}

/**
 * Calculates the total quantity of all items in the purchase.
 */
export function calculateTotalQuantity(
  items: Pick<PurchaseItem, "quantity">[],
): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Calculates how many units have been received.
 */
export function calculateReceivedQuantity(
  items: Pick<PurchaseItem, "received_quantity">[],
): number {
  return items.reduce((total, item) => total + item.received_quantity, 0);
}

/**
 * Calculates remaining quantity yet to be received.
 */
export function calculateRemainingQuantity(
  items: Pick<PurchaseItem, "quantity" | "received_quantity">[],
): number {
  return items.reduce(
    (total, item) => total + (item.quantity - item.received_quantity),
    0,
  );
}

/**
 * Calculates overall percentage received.
 */
export function calculateReceivedPercentage(
  items: Pick<PurchaseItem, "quantity" | "received_quantity">[],
): number {
  const totalQuantity = calculateTotalQuantity(items);
  if (totalQuantity === 0) return 0;
  const receivedQuantity = calculateReceivedQuantity(items);
  return Math.round((receivedQuantity / totalQuantity) * 100);
}
