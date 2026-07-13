import type { CreateProductInput } from "../types/product";

export const buildProductPayload = (
  product: CreateProductInput,
): CreateProductInput => ({
  ...product,
  barcode:
    product.barcode?.trim() ||
    `P${Date.now()}${Math.floor(Math.random() * 1000)}`,
});