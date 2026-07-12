import type { Product } from "../types/product";
import type { Category } from "../../categories/types/category";
import type { ValidatedImportRecord, ImportSummary } from "../types/import";
import { mapRowToProduct } from "./mapRowToProduct";


export const validateImportRecords = (
  rawRecords: Record<string, unknown>[],
  existingProducts: Product[],
  categories: Category[],
): {
  validatedRecords: ValidatedImportRecord[];
  summary: ImportSummary;
} => {
  const validatedRecords: ValidatedImportRecord[] = [];
  const existingBarcodes = new Set(
    existingProducts
      .map((p) => p.barcode?.trim().toLowerCase())
      .filter(Boolean),
  );

  const seenBarcodes = new Set<string>();
  rawRecords.forEach((raw, index) => {
    const rowNumber = index + 2;
    const mapped = mapRowToProduct(raw);
    const errors: string[] = [];

    //---------------------------------------
    // Name
    //---------------------------------------

    const name = mapped.name?.trim() ?? "";
    if (!name) {
      errors.push("Product name is required.");
    }

    //---------------------------------------
    // Selling Price
    //---------------------------------------

    const selling_price = Number(mapped.selling_price ?? 0);
    if (Number.isNaN(selling_price) || selling_price <= 0) {
      errors.push("Selling price must be greater than zero.");
    }

    //---------------------------------------
    // Cost Price
    //---------------------------------------

    const cost_price = Number(mapped.cost_price ?? 0);
    if (Number.isNaN(cost_price) || cost_price < 0) {
      errors.push("Cost price cannot be negative.");
    }

    //---------------------------------------
    // Stock
    //---------------------------------------

    const stock = Number(mapped.stock ?? 0);
    if (Number.isNaN(stock) || stock < 0) {
      errors.push("Stock cannot be negative.");
    }

    //---------------------------------------
    // Minimum Stock Alert
    //---------------------------------------

    const min_stock_alert = Number(mapped.min_stock_alert ?? 0);
    if (Number.isNaN(min_stock_alert) || min_stock_alert < 0) {
      errors.push("Minimum stock alert cannot be negative.");
    }

    //---------------------------------------
    // Category
    //---------------------------------------

    let category_id = "";
    let category_name = "";
    const categoryIdentifier = mapped.category_identifier?.trim() ?? "";
    if (!categoryIdentifier) {
      errors.push("Category is required.");
    } else {
      const matchedCategory = categories.find(
        (category) =>
          category.id.toLowerCase() === categoryIdentifier.toLowerCase() ||
          category.name.toLowerCase() === categoryIdentifier.toLowerCase(),
      );
      if (!matchedCategory) {
        errors.push(`Category "${categoryIdentifier}" does not exist.`);
      } else {
        category_id = matchedCategory.id;
        category_name = matchedCategory.name;
      }
    }

    //---------------------------------------
    // Barcode
    //---------------------------------------

    const barcode = mapped.barcode?.trim() ?? "";
    if (barcode) {
      const normalizedBarcode = barcode.toLowerCase();
      if (existingBarcodes.has(normalizedBarcode)) {
        errors.push(`Barcode "${barcode}" already exists in the database.`);
      }
      if (seenBarcodes.has(normalizedBarcode)) {
        errors.push(`Duplicate barcode "${barcode}" found in this import.`);
      }
      seenBarcodes.add(normalizedBarcode);
    }

    //---------------------------------------
    // Push Record
    //---------------------------------------

    validatedRecords.push({
      rowNumber,
      raw,
      name,
      barcode,
      selling_price,
      cost_price,
      stock,
      category_id,
      category_name,
      min_stock_alert,
      isValid: errors.length === 0,
      errors,
    });
  });

  const total = validatedRecords.length;
  const valid = validatedRecords.filter((record) => record.isValid).length;
  const failed = total - valid;
  return {
    validatedRecords,
    summary: {
      total,
      valid,
      failed,
    },
  };
};
