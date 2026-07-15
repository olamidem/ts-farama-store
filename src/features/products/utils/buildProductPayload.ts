import { formatSentenceCase } from "../../../utils/formatSentenceCase";
import type { CreateProductInput } from "../types/product";
import { generateBarcode } from "./generateBarcode";

export const buildProductPayload = (
  product: CreateProductInput,
): CreateProductInput => ({
  ...product,
  name: formatSentenceCase(product.name),
  barcode: product.barcode?.trim() || generateBarcode(),
});