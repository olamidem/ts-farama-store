import { supabase } from "../../../api/supabase";
import type { Product } from "../types/product";

export async function getExistingProductsForImport(
  names: string[],
): Promise<Product[]> {
  // Nothing to search
  if (names.length === 0) {
    return [];
  }
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .in("name", names)
    .eq("is_active", true);

  if (error) {
    throw error;
  }

  return (data ?? []) as Product[];
}