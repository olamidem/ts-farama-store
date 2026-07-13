import { supabase } from "../../../api/supabase";
import type { CreateProductInput } from "../types/product";
import { buildProductPayload } from "../utils/buildProductPayload";

export const createProducts = async (
  products: CreateProductInput[],
): Promise<void> => {
  
  const payload = products.map(buildProductPayload);
  const { error } = await supabase.from("products").insert(payload);

  if (error) {
    throw new Error(error.message);
  }
};
