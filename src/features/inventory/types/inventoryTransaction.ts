export type InventoryTransactionType =
  | "PURCHASE"
  | "SALE"
  | "RETURN"
  | "ADJUSTMENT"
  | "DAMAGE"
  | "TRANSFER"
  | "OPENING STOCK";

export interface InventoryTransaction {
  id: string;
  product_id: string;
  product_unit_id: string;
  quantity: number;
  balance_after: number;
  transaction_type: InventoryTransactionType;
  reference: string;
  remarks: string | null;
  created_by: string | null;
  created_at: string;
}

export interface InventoryTransactionWithRelations extends InventoryTransaction {
  product: {
    id: string;
    name: string;
    sku: string;
    barcode?: string;
  } | null;
  product_unit: {
    id: string;
    sku: string;
    conversion_factor: number;
    unit: {
      name: string;
      symbol: string;
    } | null;
  } | null;
  profiles: {
    raw_user_meta_data?: {
      name?: string;
      full_name?: string;
    };
    email?: string;
  } | null;
}
