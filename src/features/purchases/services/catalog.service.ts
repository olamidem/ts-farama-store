import { supabase } from "../../../api/supabase";

export async function getCatalogProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("id,name,sku,cost_price")
    .eq("is_active", true)
    .order("name");

  if (error) throw error;

  return data;
}

export async function getCatalogProductUnits() {
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

  return data;
}
