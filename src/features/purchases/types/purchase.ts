import type { PurchaseStatus } from "../constant/purchase.constants";
import type { PurchaseItem, CreatePurchaseItemInput } from "./purchaseItem";
import type { Supplier } from "./supplier";

export interface Warehouse {
  id: string;
  name: string;
}

export interface Purchase {
  id: string;
  purchase_number: string;
  supplier_id: string;
  status: PurchaseStatus;
  total_amount: number;
  purchase_date: string;
  expected_delivery_date?: string;
  received_percentage?: number;
  remarks?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  // Relations
  supplier?: Supplier;
  // creator?: PurchaseCreator;
  items?: PurchaseItem[];
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
  remarks?: string;
  items: CreatePurchaseItemInput[];
}

export type UpdatePurchaseInput = Partial<CreatePurchaseInput> & {
  status?: PurchaseStatus;
};
