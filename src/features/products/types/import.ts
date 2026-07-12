export interface ValidatedImportRecord {
  rowNumber: number;
  raw: Record<string, unknown>;
  name: string;
  barcode: string;
  selling_price: number;
  cost_price: number;
  stock: number;
  category_id: string;
  category_name: string;
  min_stock_alert: number;
  isValid: boolean;
  errors: string[];
}

export interface ImportSummary {
  total: number;
  valid: number;
  failed: number;
}
