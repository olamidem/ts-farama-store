export interface Product {
  id: string;
  name: string;
  barcode?: string;
  selling_price: number;
  cost_price: number;
  stock: number;
  category_id: string;
  min_stock_alert: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // category?: Category;
}

// export interface ProductWithCategory extends Product {
//   category?: Category;
// }

export type CreateProductInput = Omit<
  Product,
  "id" | "created_at" | "updated_at"
>;

export type UpdateProductInput = Partial<CreateProductInput>;
