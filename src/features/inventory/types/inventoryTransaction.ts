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
  product_unit_id: string;
  quantity: number;
  balance_after: number;
  transaction_type: "PURCHASE" | "SALE" | "ADJUSTMENT" | "RETURN" | "TRANSFER";
  reference: string | null;
  remarks: string | null;
  created_at: string;
  created_by: string | null;
  product?: {
    id: string;
    name: string;
    sku: string;
  };

  product_unit?: {
    id: string;
    conversion_factor: number;

    unit?: {
      id: string;
      name: string;
      abbreviation: string;
    };
  };
}

export interface RecordInventoryTransactionInput {
  product_id: string;
  product_unit_id: string;
  transaction_type: InventoryTransactionType;
  quantity: number;
  reason: string;
  remarks?: string;
}
