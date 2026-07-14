import type { Product } from "../types/product";
import type { Category } from "../../categories/types/category";
import type {
  ValidatedImportRecord,
  ImportSummary,
  ImportAction,
} from "../types/import";
import type { ParsedImportRecord } from "../types/importFile";

export const validateImportRecords = (
  rawRecords: ParsedImportRecord[],
  existingProducts: Product[],
  categories: Category[],
): {
  validatedRecords: ValidatedImportRecord[];
  summary: ImportSummary;
} => {
  const validatedRecords: ValidatedImportRecord[] = [];

  const existingBarcodes = new Set(
    existingProducts
      .map((product) => product.barcode?.trim().toLowerCase())
      .filter(Boolean),
  );

  const seenBarcodes = new Set<string>();

  rawRecords.forEach((raw, index) => {
    const rowNumber = index + 2;
    const errors: string[] = [];

    //---------------------------------------
    // Values
    //---------------------------------------

    const name = raw.name.trim();
    const barcode = raw.barcode.trim();
    const sku = raw.sku.trim();

    const selling_price = Number(raw.selling_price);
    const cost_price = Number(raw.cost_price);
    const stock = Number(raw.stock);
    const min_stock_alert = Number(raw.min_stock_alert);

    //---------------------------------------
    // Name
    //---------------------------------------

    if (!name) {
      errors.push("Product name is required.");
    }

    //---------------------------------------
    // Selling Price
    //---------------------------------------

    if (Number.isNaN(selling_price) || selling_price <= 0) {
      errors.push("Selling price must be greater than zero.");
    }

    //---------------------------------------
    // Cost Price
    //---------------------------------------

    if (Number.isNaN(cost_price) || cost_price < 0) {
      errors.push("Cost price cannot be negative.");
    }

    //---------------------------------------
    // Stock
    //---------------------------------------

    if (Number.isNaN(stock) || stock < 0) {
      errors.push("Stock cannot be negative.");
    }

    //---------------------------------------
    // Minimum Stock Alert
    //---------------------------------------

    if (Number.isNaN(min_stock_alert) || min_stock_alert < 0) {
      errors.push("Minimum stock alert cannot be negative.");
    }

    //---------------------------------------
    // Category
    //---------------------------------------

    let category_id = "";
    let category_name = "";

    const category_identifier = raw.category_identifier.trim();

    if (!category_identifier) {
      errors.push("Category is required.");
    } else {
      const matchedCategory = categories.find(
        (category) =>
          category.id.toLowerCase() === category_identifier.toLowerCase() ||
          category.name.toLowerCase() === category_identifier.toLowerCase(),
      );

      if (!matchedCategory) {
        errors.push(`Category "${category_identifier}" does not exist.`);
      } else {
        category_id = matchedCategory.id;
        category_name = matchedCategory.name;
      }
    }

    //---------------------------------------
    // Barcode Validation
    //---------------------------------------

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
    // Existing Product
    //---------------------------------------

    const duplicateProduct =
      existingProducts.find(
        (product) =>
          product.name.trim().toLowerCase() === name.toLowerCase() &&
          product.category_id === category_id,
      ) ?? null;

    //---------------------------------------
    // Decide Action
    //---------------------------------------

    let action: ImportAction = "create";

    if (errors.length === 0 && duplicateProduct) {
      action = "skip";
    }

    //---------------------------------------
    // Build Record
    //---------------------------------------

    validatedRecords.push({
      rowNumber,
      raw,

      name,
      barcode,
      sku,

      selling_price,
      cost_price,
      stock,

      category_identifier,
      category_id,
      category_name,

      min_stock_alert,

      duplicateProduct,

      isValid: errors.length === 0,
      errors,

      action,
    });
  });

  //---------------------------------------
  // Summary
  //---------------------------------------

  const total = validatedRecords.length;

  const valid = validatedRecords.filter((record) => record.isValid).length;

  const failed = total - valid;

  const newProducts = validatedRecords.filter(
    (record) => record.isValid && record.action === "create",
  ).length;

  const duplicateProducts = validatedRecords.filter(
    (record) => record.isValid && record.action === "skip",
  ).length;

  return {
    validatedRecords,
    summary: {
      total,
      valid,
      failed,
      newProducts,
      duplicateProducts,
    },
  };
};
