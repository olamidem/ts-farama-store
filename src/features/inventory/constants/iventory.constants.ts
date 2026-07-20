export const INVENTORY_TRANSACTION_TYPE = {
  RECEIVE: "RECEIVE",
  SALE: "SALE",
  ADJUSTMENT: "ADJUSTMENT",
  RETURN: "RETURN",
} as const;

export type InventoryTransactionType =
  (typeof INVENTORY_TRANSACTION_TYPE)[keyof typeof INVENTORY_TRANSACTION_TYPE];

export const INVENTORY_TRANSACTION_OPTIONS = [
  { label: "Receive", value: INVENTORY_TRANSACTION_TYPE.RECEIVE },
  { label: "Sale", value: INVENTORY_TRANSACTION_TYPE.SALE },
  { label: "Adjustment", value: INVENTORY_TRANSACTION_TYPE.ADJUSTMENT },
  { label: "Return", value: INVENTORY_TRANSACTION_TYPE.RETURN },
];
