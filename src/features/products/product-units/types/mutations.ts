import type { UpdateProductUnitInput } from "./productUnit";

export interface ProductUnitContext {
  id: string;
  productId: string;
}

export interface UpdateProductUnitVariables extends ProductUnitContext {
  data: UpdateProductUnitInput;
}
