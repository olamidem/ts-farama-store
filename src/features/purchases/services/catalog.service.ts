import { supabase } from "../../../api/supabase";
import type {
  CatalogProductUnit,
  CatalogUnit,
} from "../types/catalogProductUnit";

export async function getCatalogProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("id,name,sku,cost_price")
    .eq("is_active", true)
    .order("name");

  if (error) throw error;

  return data;
}

export async function getCatalogProductUnits(): Promise<CatalogProductUnit[]> {
  const { data, error } = await supabase.from("product_units").select(`
      id,
      product_id,
      conversion_factor,
      unit:units(
        id,
        name,
        symbol
      )
    `);

  if (error) throw error;

  return (
    data?.map((item: { id: string; product_id: string; conversion_factor: number; unit: CatalogUnit | CatalogUnit[] | null }) => ({
      ...item,
      unit: Array.isArray(item.unit)
        ? ((item.unit[0] as CatalogUnit) ?? null)
        : ((item.unit as CatalogUnit) ?? null),
    })) ?? []
  );
}
