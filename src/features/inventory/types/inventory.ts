import type { InventoryTransactionType } from "./inventoryTransaction";

export interface InventorySummary {
  totalProducts: number;
  lowStockItems: number;
  totalStockAllUnits: number;
  totalInventoryValue: number;
}

export interface StockAdjustmentInput {
  product_id: string;
  product_unit_id: string;
  quantity: number; // positive for addition, negative for deduction
  transaction_type: InventoryTransactionType;
  reference: string;
  remarks?: string;
}

export interface ProductStockOverviewItem {
  id: string;
  name: string;
  sku: string;
  unit: string;
  stock: number;
  reserved: number;
  available: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  min_stock_alert: number;
  default_product_unit_id?: string;
}

export interface InventorySettings {
  defaultMinAlert: number;
  refPrefix: string;
  operatorName: string;
}

