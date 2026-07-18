export interface PurchaseItem {
  id: string;
  purchase_id: string;
  product_id: string;
  product_unit_id: string;
  quantity: number;
  unit_cost: number;
  total_cost: number;
  received_quantity: number;
}

export interface CreatePurchaseItemInput {
  product_id: string;
  product_unit_id: string;
  quantity: number;
  unit_cost: number;
}
