import type { ParsedImportRecord } from "./importFile";
import type { Product } from "./product";

export type ImportAction = "create" | "update" | "skip" ;
export type DuplicateStrategy = "skip" | "update";

export interface ValidatedImportRecord {
  rowNumber: number;
  raw: ParsedImportRecord;
  name: string;
  barcode: string;
  sku: string;
  selling_price: number;
  cost_price: number;
  stock: number;
  category_identifier: string;
  category_id: string;
  category_name: string;
  min_stock_alert: number;
  duplicateProduct: Product | null;
  isValid: boolean;
  errors: string[];
 action:  ImportAction;
}

export interface ImportSummary {
  total: number;
  valid: number;
  failed: number;
  newProducts:number;
  duplicateProducts: number
}
