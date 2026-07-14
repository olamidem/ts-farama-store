export interface ParsedImportRecord {
  name: string;
  barcode: string;
  selling_price: number;
  cost_price: number;
  stock: number;
  sku: string;
  category_identifier: string;
  min_stock_alert: number;
}