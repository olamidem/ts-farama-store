import type { CreateProductInput } from "../types/product";

export const buildProductPayload = (
  product: CreateProductInput,
): CreateProductInput => ({
  ...product,
});