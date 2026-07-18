import type { CreatePurchaseItemInput, CreatePurchaseItemInput, PurchaseItem } from "./purchaseItem";

export interface Purchase {
  id: string;
  purchase_number: string;
  supplier_id: string;
  warehouse_id?: string;
  status: PurchaseStatus;
  total_amount: number;
  purchase_date: string;
  expected_delivery_date?: string;
  received_percentage?: number;
  remarks?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  supplier?: Supplier;
  items?: PurchaseItem[];
  creator?: PurchaseCreator;
}

export interface PurchaseCreator {
  id: string;
  name: string;
  email?: string;
}

export interface CreatePurchaseInput {
  supplier_id: string;
  purchase_date: string;
  expected_delivery_date?: string;
  warehouse_id?: string;
  remarks?: string;
  items: CreatePurchaseItemInput[];
}

export interface UpdatePurchaseInput {
  supplier_id?: string;
  status?: PurchaseStatus;
  purchase_date?: string;
  expected_delivery_date?: string;
  warehouse_id?: string;
  remarks?: string;
}
