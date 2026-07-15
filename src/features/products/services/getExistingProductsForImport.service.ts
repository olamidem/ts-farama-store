import { supabase } from "../../../api/supabase";
import type { Product } from "../types/product";

export async function getExistingProductsForImport(
  names: string[],
  barcodes: string[],
): Promise<Product[]> {
  if (names.length === 0 && barcodes.length === 0) {
    return [];
  }
  const combined: Product[] = [];
  const idsSeen = new Set<string>();
  
  if (names.length > 0) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .in("name", names)
      .eq("is_active", true);

    if (error) {
      throw error;
    }

    const products = data ?? [];
    for (const p of products) {
      if (!idsSeen.has(p.id)) {
        idsSeen.add(p.id);
        combined.push(p as Product);
      }
    }
  }

  const validBarcodes = barcodes.filter(Boolean);
  if (validBarcodes.length > 0) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .in("barcode", validBarcodes)
      .eq("is_active", true);

    if (error) {
      throw error;
    }

    const products = data ?? [];
    for (const p of products) {
      if (!idsSeen.has(p.id)) {
        idsSeen.add(p.id);
        combined.push(p as Product);
      }
    }
  }

  return combined;
}