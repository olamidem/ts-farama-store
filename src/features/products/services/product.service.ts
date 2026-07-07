import { supabase } from "../../../api/supabase";
import type { Product } from "../types/product.types";

export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};