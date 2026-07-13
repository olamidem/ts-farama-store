export interface Product {
  id: string;
  name: string;
  sku: string;
  barcode?: string;
  selling_price: number;
  cost_price: number;
  stock: number;
  category_id: string;
  min_stock_alert: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateProductInput {
  name: string;
  sku: string;
  barcode?: string;
  selling_price: number;
  cost_price: number;
  stock: number;
  category_id: string;
  min_stock_alert: number;
}

export type UpdateProductInput = Partial<CreateProductInput>;
