export interface Product {
  id: string;
  name: string;
  sku: string;
  barcode?: string;
  description?: string;
  selling_price: number;
  cost_price: number;
  stock: number;
  category_id: string;
  base_unit_id: string;
  min_stock_alert: number;
  created_at: string;
  updated_at: string;
}

export interface CreateProductInput {
  name: string;
  sku: string;
  barcode?: string;
  description?: string;
  selling_price: number;
  cost_price: number;
  stock: number;
  category_id: string;
  base_unit_id: string;
  min_stock_alert: number;
}

export type UpdateProductInput = Partial<CreateProductInput>;

export interface ProductSummary {
  id: string;
  name: string;
  description?: string;
}
