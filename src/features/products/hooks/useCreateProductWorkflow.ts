import type { CreateProductInput, Product } from "../types/product";
import { checkDuplicateProduct } from "../services/checkDuplicateProduct.service";
import { createProduct } from "../services/product.service";

export type CreateProductResult =
  | {
      success: true;
      product: Product;
    }
  | {
      success: false;
      reason: "duplicate";
      duplicate: Product;
    };

export async function createProductWorkflow(
  input: CreateProductInput,
): Promise<CreateProductResult> {
  const duplicate = await checkDuplicateProduct({
    name: input.name,
    categoryId: input.category_id,
  });

  if (duplicate) {
    return {
      success: false,
      reason: "duplicate",
      duplicate,
    };
  }
  const product = await createProduct(input);
  return {
    success: true,
    product,
  };
}
