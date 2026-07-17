export interface ProductUnit {
  id: string;
  product_id: string;
  unit_id: string;
  sku: string; 
  conversion_factor: number;
  selling_price: number;
  cost_price: number;
  barcode?: string;
  is_default: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface CreateProductUnitInput {
  product_id: string;
  unit_id: string;
  sku: string; 
  conversion_factor: number;
  selling_price: number;
  cost_price: number;
  barcode?: string;
  is_default?: boolean;
  sort_order?: number;
}

export type UpdateProductUnitInput = Partial<CreateProductUnitInput>;

export interface ProductUnitWithRelations extends ProductUnit {
  unit_name: string;
  unit_symbol: string;
}