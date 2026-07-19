import type { ProductUnit } from "../../products/product-units/types/productUnit";
import type { Product } from "../../products/types/product";

export interface PurchaseItem {
  id: string;
  purchase_id: string;
  product_id: string;
  product_unit_id: string;
  quantity: number;
  unit_cost: number;
  total_cost: number;
  received_quantity: number;
  product?: Product;
  product_unit?: ProductUnit;
}

export interface CreatePurchaseItemInput {
  product_id: string;
  product_unit_id: string;
  quantity: number;
  unit_cost: number;
}

export interface ReceivePurchaseItemInput {
  purchase_item_id: string;
  received_quantity: number;
}

export interface ReceivePurchaseInput {
  purchaseId: string;
  receivedItems: ReceivePurchaseItemInput[];
}

export type UpdatePurchaseItemInput = Partial<CreatePurchaseItemInput>;
