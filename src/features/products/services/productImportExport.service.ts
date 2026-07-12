import { supabase } from "../../../api/supabase";
import type { CreateProductInput } from "../types/product";

export const createProducts = async (
  products: CreateProductInput[],
): Promise<void> => {
  const { error } = await supabase.from("products").insert(products);

  if (error) {
    throw new Error(error.message);
  }
};
