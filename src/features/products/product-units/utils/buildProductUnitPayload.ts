import type { CreateProductUnitInput } from "../types/productUnit";

export const buildProductUnitPayload = (
  data: CreateProductUnitInput,
): CreateProductUnitInput => ({
  ...data,
  barcode: data.barcode?.trim() || undefined,
});