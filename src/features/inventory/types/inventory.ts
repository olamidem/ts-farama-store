import type { InventoryTransactionType } from "./inventoryTransaction";

export interface InventoryTransaction {
  id: string;
  product_id: string;
  product_unit_id: string;
  transaction_type: InventoryTransactionType;
  quantity: number;
  balance_after: number;
  reference: string;
  remarks: string | null;
  created_by: string | null;
  created_at: string;

  product?: {
    id: string;
    name: string;
    sku: string;
  };
}

export interface CreateInventoryTransactionInput {
  product_id: string;
  product_unit_id: string;
  transaction_type: InventoryTransactionType;
  quantity: number;
  balance_after: number;
  reference: string;
  remarks?: string;
  created_by?: string;
}
