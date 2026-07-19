export type InventoryTransactionType =
  | "PURCHASE"
  | "SALE"
  | "RETURN"
  | "ADJUSTMENT_IN"
  | "ADJUSTMENT_OUT"
  | "TRANSFER_IN"
  | "TRANSFER_OUT"
  | "DAMAGE"
  | "OPENING_STOCK";

export interface InventoryTransaction {
  id: string;
  product_id: string;
  product_unit_id?: string | null;
  transaction_type: InventoryTransactionType;
  quantity: number;
  balance_after: number;
  reference?: string | null;
  remarks?: string | null;
  created_by?: string | null;
  created_at: string;
}

export interface RecordInventoryTransactionInput {
  product_id: string;
  product_unit_id: string;
  transaction_type: InventoryTransactionType;
  quantity: number;
  reason: string;
  remarks?: string;
}
