export type BulkUpdateType = "selling" | "cost" | "both";
export type BulkUpdateMethod = "percentage" | "fixed";
export type BulkUpdateOperation = "increase" | "decrease";

interface CalculateBulkPriceParams {
  currentPrice: number;
  amount: number;
  method: BulkUpdateMethod;
  operation: BulkUpdateOperation;
}

export function calculateBulkPrice({
  currentPrice,
  amount,
  method,
  operation,
}: CalculateBulkPriceParams): number {
  if (amount <= 0) {
    return currentPrice;
  }

  let updatedPrice: number;

  if (method === "percentage") {
    const change = (currentPrice * amount) / 100;

    updatedPrice =
      operation === "increase" ? currentPrice + change : currentPrice - change;
  } else {
    updatedPrice =
      operation === "increase" ? currentPrice + amount : currentPrice - amount;
  }

  // Prevent negative prices
  updatedPrice = Math.max(updatedPrice, 0);

  // Round to 2 decimal places
  return Number(updatedPrice.toFixed(2));
}
