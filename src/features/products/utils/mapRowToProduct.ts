import type { ParsedImportRecord } from "../types/importFile";

const normalizeKey = (key: string): string => {
  return key.toLowerCase().replace(/[\s_-]/g, "");
};

export const mapRowToProduct = (
  row: Record<string, unknown>,
): ParsedImportRecord => {
  const result: ParsedImportRecord = {
    name: "",
    barcode: "",
    sku: "",
    selling_price: 0,
    cost_price: 0,
    stock: 0,
    category_identifier: "",
    min_stock_alert: 0,
  };

  for (const key of Object.keys(row)) {
    const normalizedKey = normalizeKey(key);
    const value = row[key];

    if (
      normalizedKey === "name" ||
      normalizedKey === "productname" ||
      normalizedKey === "product"
    ) {
      result.name = String(value ?? "").trim();
    } else if (
      normalizedKey === "barcode" ||
      normalizedKey === "code" ||
      normalizedKey === "upc"
    ) {
      result.barcode = String(value ?? "").trim();
    } else if (normalizedKey === "sku") {
      result.sku = String(value ?? "").trim();
    } else if (
      normalizedKey === "sellingprice" ||
      normalizedKey === "price" ||
      normalizedKey === "rate"
    ) {
      result.selling_price = Number(value);
    } else if (normalizedKey === "costprice" || normalizedKey === "cost") {
      result.cost_price = Number(value);
    } else if (
      normalizedKey === "stock" ||
      normalizedKey === "qty" ||
      normalizedKey === "quantity" ||
      normalizedKey === "currentstock"
    ) {
      result.stock = Number(value);
    } else if (
      normalizedKey === "category" ||
      normalizedKey === "categoryname" ||
      normalizedKey === "categoryid"
    ) {
      result.category_identifier = String(value ?? "").trim();
    } else if (
      normalizedKey === "minstockalert" ||
      normalizedKey === "alertlimit" ||
      normalizedKey === "alertqty"
    ) {
      result.min_stock_alert = Number(value);
    }
  }

  return result;
};
